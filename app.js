// «Найди пару»: логика игры. Слова и картинки — words.js.
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const LEVELS = [
    { name: 'Малыш', pairs: 6, peek: 2000 },
    { name: 'Ученик', pairs: 10, peek: 3000 },
    { name: 'Знаток', pairs: 20, peek: 4500 },
  ];
  const BACKS = ['var(--b1)', 'var(--b2)', 'var(--b3)', 'var(--b4)'];
  const CONFETTI = ['#F7B8C6', '#B9DCC9', '#F8D58F', '#BFD3F2', '#D9577A'];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);

  // Хранилище: может быть недоступно (приватный режим) — игра работает и без него.
  const store = {
    get(k, d) { try { const v = localStorage.getItem('najdi-paru:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('najdi-paru:' + k, JSON.stringify(v)); } catch { /* без сохранения */ } },
  };

  let level = store.get('level', 0);
  let deck = [], open = [], found = 0, moves = 0, streak = 0;
  let startedAt = 0, timerId = 0, elapsed = 0, lock = true, toastTimer = 0;

  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmt = (ms) => { const s = Math.floor(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const show = (id) => { ['start', 'game', 'win'].forEach((s) => { $(s).hidden = s !== id; }); window.scrollTo(0, 0); };
  const pairWord = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'пара' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'пары' : 'пар');
  const moveWord = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'ход' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'хода' : 'ходов');

  /* ---------- Начало ---------- */
  function renderLevels() {
    document.querySelectorAll('.lvl').forEach((b) => b.setAttribute('aria-checked', String(+b.dataset.level === level)));
    const r = store.get('best-' + level, null);
    $('record').textContent = r ? `Твой рекорд: ${r.moves} ${moveWord(r.moves)}, ${fmt(r.time)}` : '';
  }
  document.querySelectorAll('.lvl').forEach((b) => b.addEventListener('click', () => {
    level = +b.dataset.level; store.set('level', level); renderLevels();
  }));
  $('play').addEventListener('click', () => startGame());
  $('back').addEventListener('click', () => { stopTimer(); hideToast(true); renderLevels(); show('start'); });

  /* ---------- Поле ---------- */
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
    const L = LEVELS[level];
    const words = shuffle(WORDS.slice()).slice(0, L.pairs);
    deck = shuffle(words.flatMap((w) => [w, w]));
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
    const w = deck[a.dataset.i];
    showToast(w);
    burstFrom(a); burstFrom(b);
    if (navigator.vibrate) { try { navigator.vibrate(18); } catch { /* нет вибрации */ } }
    if (streak >= 2) say(streak === 2 ? 'Две подряд!' : streak === 3 ? 'Три подряд!' : `${streak} подряд!`);
    if (found === deck.length / 2) setTimeout(win, reduced ? 300 : 1100);
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
    timerId = setInterval(() => { elapsed = Date.now() - startedAt; $('time').textContent = fmt(elapsed); }, 250);
  }
  function stopTimer() { clearInterval(timerId); timerId = 0; if (startedAt) elapsed = Date.now() - startedAt; }

  function say(text) {
    const s = $('streak'); s.textContent = text;
    s.classList.remove('show'); void s.offsetWidth; s.classList.add('show');
  }

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

  function win(demo) {
    stopTimer(); hideToast(true);
    const pairs = deck.length / 2;
    const stars = moves <= pairs * 1.5 ? 3 : moves <= pairs * 2.2 ? 2 : 1;
    $('stars').innerHTML = [1, 2, 3].map((n) => STAR(n <= stars)).join('');
    $('win-text').textContent = stars === 3 ? 'Все пары найдены, и почти без ошибок!' : stars === 2 ? 'Все пары найдены. Ещё раз, и будет три звезды!' : 'Все пары найдены. Чем больше играешь, тем лучше память.';
    $('r-moves').textContent = moves;
    $('r-time').textContent = fmt(elapsed);
    $('r-words').textContent = pairs;
    const best = store.get('best-' + level, null);
    const better = !demo && (!best || moves < best.moves || (moves === best.moves && elapsed < best.time));
    if (better) store.set('best-' + level, { moves, time: elapsed });
    $('new-record').hidden = !(better && best);
    $('next').hidden = level >= LEVELS.length - 1;
    const seen = [...new Map(deck.map((w) => [w.id, w])).values()];
    $('dict').innerHTML = seen.map((w) => `<li><span class="pic">${wordSVG(w)}</span><span class="ar" lang="ar">${w.ar}</span><small>${w.read} – ${w.ru}</small></li>`).join('');
    show('win');
    if (!reduced) { rain(); }
  }
  $('again').addEventListener('click', () => startGame());
  $('next').addEventListener('click', () => { level = Math.min(level + 1, LEVELS.length - 1); store.set('level', level); startGame(); });
  $('share').addEventListener('click', async () => {
    const data = { title: 'Найди пару', text: 'Игра для детей: запоминаем арабские слова', url: location.href.split('?')[0] };
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

  /* ---------- Старт ---------- */
  renderLevels();
  // Для проверки: ?demo=win сразу показывает экран победы.
  if (params.get('demo') === 'win') {
    const L = LEVELS[level];
    deck = WORDS.slice(0, L.pairs).flatMap((w) => [w, w]); moves = Math.round(L.pairs * 1.4); elapsed = 64000;
    win(true);
  }
})();
