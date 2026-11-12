// «Арабские слова»: меню, «Найди пару», «Что это?». Слова и картинки — words.js.
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const LEVELS = [
    { name: 'Малыш', pairs: 6, peek: 2000 },
    { name: 'Ученик', pairs: 10, peek: 3000 },
    { name: 'Знаток', pairs: 20, peek: 4500 },
  ];
  const QUIZ_ROUNDS = 10;
  const BACKS = ['var(--b1)', 'var(--b2)', 'var(--b3)', 'var(--b4)'];
  const CONFETTI = ['#F7B8C6', '#B9DCC9', '#F8D58F', '#BFD3F2', '#D9577A'];
  const SCREENS = ['home', 'pairs', 'game', 'quiz', 'win'];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);

  // Хранилище: может быть недоступно (приватный режим) — игра работает и без него.
  const store = {
    get(k, d) { try { const v = localStorage.getItem('najdi-paru:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('najdi-paru:' + k, JSON.stringify(v)); } catch { /* без сохранения */ } },
  };

  let set = SETS[store.get('set', 'items')] ? store.get('set', 'items') : 'items';
  let level = store.get('level', 0);
  let mode = 'pairs'; // какая игра сейчас: pairs | quiz
  let deck = [], open = [], found = 0, moves = 0, streak = 0;
  let startedAt = 0, timerId = 0, elapsed = 0, lock = true, toastTimer = 0;
  let rounds = [], round = 0, score = 0, firstTry = true;

  const words = () => SETS[set].words;
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = (ms) => { const s = Math.floor(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const plural = (n, one, few, many) => (n % 10 === 1 && n % 100 !== 11 ? one : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? few : many);
  const show = (id) => { SCREENS.forEach((s) => { $(s).hidden = s !== id; }); window.scrollTo(0, 0); };
  const maxLevel = () => LEVELS.reduce((m, L, i) => (L.pairs <= words().length ? i : m), 0);
  const bestKey = () => (set === 'items' ? `best-${level}` : `best-${set}-${level}`);

  /* ---------- Меню ---------- */
  function renderThemes() {
    document.querySelectorAll('.theme').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.set === set)));
  }
  document.querySelectorAll('.theme').forEach((b) => b.addEventListener('click', () => {
    set = b.dataset.set; store.set('set', set); renderThemes();
  }));
  $('go-pairs').addEventListener('click', () => { renderLevels(); show('pairs'); });
  $('go-quiz').addEventListener('click', () => startQuiz());
  document.querySelectorAll('[data-home]').forEach((b) => b.addEventListener('click', goHome));
  $('back').addEventListener('click', () => { stopTimer(); hideToast(true); renderLevels(); show('pairs'); });
  function goHome() { stopTimer(); hideToast(true); renderThemes(); show('home'); }

  /* ---------- Найди пару: уровень ---------- */
  function renderLevels() {
    const top = maxLevel();
    if (level > top) level = top;
    $('pairs-theme').textContent = SETS[set].name;
    document.querySelectorAll('.lvl').forEach((b) => {
      b.hidden = +b.dataset.level > top;
      b.setAttribute('aria-checked', String(+b.dataset.level === level));
    });
    const r = store.get(bestKey(), null);
    $('record').textContent = r ? `Твой рекорд: ${r.moves} ${plural(r.moves, 'ход', 'хода', 'ходов')}, ${fmt(r.time)}` : '';
  }
  document.querySelectorAll('.lvl').forEach((b) => b.addEventListener('click', () => {
    level = +b.dataset.level; store.set('level', level); renderLevels();
  }));
  $('play').addEventListener('click', () => startGame());

  /* ---------- Найди пару: поле ---------- */
  function layoutBoard() {
    const n = deck.length, wide = innerWidth >= 700;
    const cols = n <= 12 ? (wide ? 6 : 3) : n <= 20 ? (wide ? 5 : 4) : (wide ? 8 : 5);
    const rows = Math.ceil(n / cols);
    const board = $('board');
    const gap = n > 20 ? 6 : 10;
    // Поле влезает в экран по высоте: ширина карточки = высота ряда * 3/4.
    const top = board.getBoundingClientRect().top + scrollY;
    const availH = innerHeight - top - 20;
    const cardH = (availH - gap * (rows - 1)) / rows;
    const maxW = Math.max(260, cardH * 0.75 * cols + gap * (cols - 1));
    board.style.setProperty('--cols', cols);
    board.style.setProperty('--gap', gap + 'px');
    board.style.setProperty('--board-w', Math.min(maxW, wide ? 980 : innerWidth - 32) + 'px');
    const cardW = Math.min(maxW, innerWidth - 32) / cols;
    board.style.setProperty('--ar-size', Math.max(12, Math.min(26, cardW * 0.2)) + 'px');
  }

  function startGame() {
    mode = 'pairs';
    const L = LEVELS[Math.min(level, maxLevel())];
    const picked = shuffle(words().slice()).slice(0, L.pairs);
    deck = shuffle(picked.flatMap((w) => [w, w]));
    open = []; found = 0; moves = 0; streak = 0; elapsed = 0; startedAt = 0;
    stopTimer(); updateBar();
    const backs = shuffle(deck.map((_, i) => BACKS[i % BACKS.length]));
    $('board').innerHTML = deck.map((w, i) => `
      <button class="card" data-i="${i}" aria-label="Закрытая карточка" style="--b:${backs[i]}">
        <span class="inner">
          <span class="side back"></span>
          <span class="side face"><span class="pic">${wordSVG(w)}</span><span class="ar" lang="ar">${w.ar}</span></span>
        </span>
      </button>`).join('');
    show('game');
    layoutBoard();
    peek(L.peek);
  }

  // В начале все карточки открыты на пару секунд: «Запоминай!»
  function peek(ms) {
    const board = $('board'), cards = [...board.children];
    lock = true; board.classList.add('locked');
    cards.forEach((c, i) => setTimeout(() => c.classList.add('open'), reduced ? 0 : 40 * i));
    const bar = $('peekbar'), p = $('peek'); p.classList.add('on');
    const t0 = performance.now(), total = ms + (reduced ? 0 : 40 * cards.length);
    (function tick(now) {
      const k = Math.max(0, 1 - (now - t0) / total);
      bar.style.setProperty('--p', k);
      if (k > 0) requestAnimationFrame(tick);
    })(t0);
    setTimeout(() => {
      cards.forEach((c, i) => setTimeout(() => c.classList.remove('open'), reduced ? 0 : 25 * i));
      p.classList.remove('on');
      setTimeout(() => { lock = false; board.classList.remove('locked'); }, reduced ? 0 : 25 * cards.length + 320);
    }, total);
  }

  $('board').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card || lock || card.classList.contains('open') || card.classList.contains('done')) return;
    if (!startedAt) startTimer();
    card.classList.add('open');
    card.setAttribute('aria-label', deck[card.dataset.i].ru);
    open.push(card);
    if (open.length < 2) return;
    moves++; updateBar();
    const [a, b] = open; open = [];
    if (deck[a.dataset.i].id === deck[b.dataset.i].id) match(a, b); else miss(a, b);
  });

  function match(a, b) {
    found++; streak++;
    a.classList.add('done'); b.classList.add('done');
    updateBar();
    showToast(deck[a.dataset.i]);
    burstFrom(a); burstFrom(b); buzz();
    if (streak >= 2) say(streak === 2 ? 'Две подряд!' : streak === 3 ? 'Три подряд!' : `${streak} подряд!`);
    if (found === deck.length / 2) setTimeout(winPairs, reduced ? 300 : 1100);
  }

  function miss(a, b) {
    streak = 0; lock = true;
    setTimeout(() => { a.classList.add('miss'); b.classList.add('miss'); }, 380);
    setTimeout(() => {
      [a, b].forEach((c) => { c.classList.remove('open', 'miss'); c.setAttribute('aria-label', 'Закрытая карточка'); });
      lock = false;
    }, 1000);
  }

  function updateBar() {
    $('found').textContent = `${found}/${deck.length / 2 || LEVELS[level].pairs}`;
    $('moves').textContent = moves;
    $('time').textContent = fmt(elapsed);
  }
  function startTimer() {
    startedAt = Date.now();
    const out = mode === 'quiz' ? $('q-time') : $('time');
    timerId = setInterval(() => { elapsed = Date.now() - startedAt; out.textContent = fmt(elapsed); }, 250);
  }
  function stopTimer() { clearInterval(timerId); timerId = 0; if (startedAt) elapsed = Date.now() - startedAt; startedAt = 0; }
  function buzz() { if (navigator.vibrate) { try { navigator.vibrate(18); } catch { /* нет вибрации */ } } }

  function say(text) {
    const s = $('streak'); s.textContent = text;
    s.classList.remove('show'); void s.offsetWidth; s.classList.add('show');
  }

  /* ---------- Что это? ---------- */
  function startQuiz() {
    mode = 'quiz';
    const pool = words();
    rounds = shuffle(pool.slice()).slice(0, Math.min(QUIZ_ROUNDS, pool.length));
    round = 0; score = 0; elapsed = 0; startedAt = 0; streak = 0;
    stopTimer();
    $('q-score').textContent = '0'; $('q-time').textContent = '0:00';
    show('quiz');
    startTimer();
    renderRound();
  }

  function renderRound() {
    const w = rounds[round], pool = words();
    const others = shuffle(pool.filter((x) => x.id !== w.id)).slice(0, 2);
    const options = shuffle([w, ...others]);
    const askPic = round % 2 === 0; // чётные вопросы: картинка → слово; нечётные: слово → картинка
    firstTry = true; lock = false;
    $('q-step').textContent = `${round + 1}/${rounds.length}`;
    $('q-bar').style.setProperty('--p', round / rounds.length);
    const ask = $('q-ask');
    ask.className = 'q-ask ' + (askPic ? 'is-pic' : 'is-word');
    ask.innerHTML = askPic
      ? `<span class="pic">${wordSVG(w)}</span>`
      : `<span class="ar" lang="ar">${w.ar}</span><span class="read">${w.read}</span>`;
    $('q-task').textContent = askPic ? 'Как это по-арабски?' : 'Где это слово?';
    const box = $('q-options');
    box.className = 'q-options ' + (askPic ? 'words' : 'pics');
    box.innerHTML = options.map((o) => `<button class="opt" data-id="${o.id}">${askPic
      ? `<span class="ar" lang="ar">${o.ar}</span><small>${o.read}</small>`
      : `<span class="pic">${wordSVG(o)}</span><span class="sr">${o.ru}</span>`}</button>`).join('');
    if (!reduced) { ask.classList.remove('enter'); void ask.offsetWidth; ask.classList.add('enter'); }
  }

  $('q-options').addEventListener('click', (e) => {
    const btn = e.target.closest('.opt');
    if (!btn || lock || btn.disabled) return;
    const w = rounds[round];
    if (btn.dataset.id === w.id) {
      lock = true;
      btn.classList.add('right');
      if (firstTry) { score++; streak++; } else streak = 0;
      $('q-score').textContent = score;
      burstFrom(btn); buzz(); showToast(w);
      if (streak >= 3) say(`${streak} подряд!`);
      setTimeout(() => {
        round++;
        if (round < rounds.length) renderRound(); else { $('q-bar').style.setProperty('--p', 1); setTimeout(winQuiz, 300); }
      }, reduced ? 700 : 1400);
    } else {
      firstTry = false; streak = 0;
      btn.classList.add('wrong'); btn.disabled = true;
    }
  });

  /* ---------- Плашка слова ---------- */
  function showToast(w) {
    const t = $('toast');
    clearTimeout(toastTimer);
    t.classList.remove('out'); t.hidden = false;
    t.innerHTML = `<span class="pic">${wordSVG(w)}</span><span class="ar" lang="ar">${w.ar}</span><span class="tr"><b>${w.read}</b> – ${w.ru}</span>`;
    void t.offsetWidth;
    toastTimer = setTimeout(() => hideToast(), 1900);
  }
  function hideToast(now) {
    const t = $('toast'); clearTimeout(toastTimer);
    if (now || reduced) { t.hidden = true; return; }
    t.classList.add('out'); toastTimer = setTimeout(() => { t.hidden = true; }, 190);
  }

  /* ---------- Победа ---------- */
  const STAR = (on) => `<svg viewBox="0 0 24 24" class="${on ? 'on' : ''}"><path d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" fill="${on ? '#F6C445' : '#F3D4DC'}" stroke="${on ? '#F6C445' : '#F3D4DC'}" stroke-width="2" stroke-linejoin="round"/></svg>`;

  function showWin({ stars, text, big, bigLabel, list, record, canNext }) {
    stopTimer(); hideToast(true);
    $('stars').innerHTML = [1, 2, 3].map((n) => STAR(n <= stars)).join('');
    $('win-text').textContent = text;
    $('r-moves').textContent = big; $('r-moves-l').textContent = bigLabel;
    $('r-time').textContent = fmt(elapsed);
    $('r-words').textContent = list.length;
    $('new-record').hidden = !record;
    $('next').hidden = !canNext;
    $('dict').innerHTML = list.map((w) => `<li><span class="pic">${wordSVG(w)}</span><span class="ar" lang="ar">${w.ar}</span><small>${w.read} – ${w.ru}</small></li>`).join('');
    show('win');
    if (!reduced) rain();
  }

  function winPairs(demo) {
    stopTimer();
    const pairs = deck.length / 2;
    const stars = moves <= pairs * 1.5 ? 3 : moves <= pairs * 2.2 ? 2 : 1;
    const best = store.get(bestKey(), null);
    const better = !demo && (!best || moves < best.moves || (moves === best.moves && elapsed < best.time));
    if (better) store.set(bestKey(), { moves, time: elapsed });
    showWin({
      stars,
      text: stars === 3 ? 'Все пары найдены, и почти без ошибок!' : stars === 2 ? 'Все пары найдены. Ещё раз, и будет три звезды!' : 'Все пары найдены. Чем больше играешь, тем лучше память.',
      big: moves, bigLabel: plural(moves, 'ход', 'хода', 'ходов'),
      list: [...new Map(deck.map((w) => [w.id, w])).values()],
      record: better && !!best,
      canNext: level < maxLevel(),
    });
  }

  function winQuiz() {
    stopTimer();
    const n = rounds.length;
    const stars = score >= n * 0.9 ? 3 : score >= n * 0.6 ? 2 : 1;
    const key = 'quiz-' + set, best = store.get(key, -1);
    if (score > best) store.set(key, score);
    showWin({
      stars,
      text: stars === 3 ? 'Ты знаешь почти все слова!' : stars === 2 ? 'Хорошо! Сыграй ещё, и будет три звезды.' : 'Сыграй в «Найди пару», а потом возвращайся сюда.',
      big: `${score}/${n}`, bigLabel: 'верно',
      list: rounds,
      record: best >= 0 && score > best,
      canNext: false,
    });
  }

  $('again').addEventListener('click', () => (mode === 'quiz' ? startQuiz() : startGame()));
  $('next').addEventListener('click', () => { level = Math.min(level + 1, maxLevel()); store.set('level', level); startGame(); });
  $('share').addEventListener('click', async () => {
    const data = { title: 'Арабские слова', text: 'Игры для детей: запоминаем арабские слова', url: location.href.split('?')[0] };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); $('share').textContent = 'Ссылка скопирована'; }
    } catch { /* отменили */ }
  });

  /* ---------- Конфетти ---------- */
  const cv = $('confetti'), ctx = cv.getContext('2d');
  let parts = [], raf = 0;
  function fit() { const d = Math.min(devicePixelRatio || 1, 2); cv.width = innerWidth * d; cv.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
  fit();
  addEventListener('resize', () => { fit(); if (!$('game').hidden) layoutBoard(); });
  function add(x, y, vx, vy) {
    parts.push({ x, y, vx, vy, r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3, s: 5 + Math.random() * 6,
      c: CONFETTI[Math.floor(Math.random() * CONFETTI.length)], round: Math.random() < .4, life: 1 });
  }
  function burstFrom(el) {
    if (reduced) return;
    const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    for (let i = 0; i < 16; i++) { const a = Math.random() * Math.PI * 2, v = 2 + Math.random() * 4; add(x, y, Math.cos(a) * v, Math.sin(a) * v - 2); }
    loop();
  }
  function rain() {
    for (let i = 0; i < 140; i++) add(Math.random() * innerWidth, -20 - Math.random() * innerHeight * .6, (Math.random() - .5) * 2, 2 + Math.random() * 3);
    loop();
  }
  function loop() {
    if (raf) return;
    const step = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 30);
      for (const p of parts) {
        p.vy += .12; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        if (p.vy > 0 && p.y > innerHeight * .2) p.life -= .006;
        ctx.save(); ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4)); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 7); ctx.fill(); } else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      }
      if (parts.length) raf = requestAnimationFrame(step); else { raf = 0; ctx.clearRect(0, 0, innerWidth, innerHeight); }
    };
    raf = requestAnimationFrame(step);
  }

  /* ---------- Установка на экран телефона ---------- */
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => { /* без работы офлайн */ });
  }
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  let installEvent = null;
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvent = e; if (!standalone) $('install').hidden = false; });
  $('install').addEventListener('click', async () => {
    if (!installEvent) return;
    installEvent.prompt();
    try { await installEvent.userChoice; } catch { /* закрыли */ }
    installEvent = null; $('install').hidden = true;
  });
  addEventListener('appinstalled', () => { $('install').hidden = true; });
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (ios && !standalone) $('ios-hint').hidden = false;

  /* ---------- Старт ---------- */
  renderThemes();
  renderLevels();
  // Для проверки: ?demo=win — экран победы, ?demo=quiz — «Что это?», ?demo=pairs — выбор уровня.
  const demo = params.get('demo');
  if (demo === 'win') {
    const L = LEVELS[Math.min(level, maxLevel())];
    deck = words().slice(0, L.pairs).flatMap((w) => [w, w]); moves = Math.round(L.pairs * 1.4); elapsed = 64000;
    winPairs(true);
  } else if (demo === 'quiz') startQuiz();
  else if (demo === 'pairs') show('pairs');
})();
