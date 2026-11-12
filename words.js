// 20 слов: только предметы, без живых существ. Арабское слово с огласовками, чтение по-русски, перевод.
// Перед выпуском показать знающему человеку.
const S = 'stroke-linecap="round" stroke-linejoin="round"';
const ink = '#4A3A35';
window.WORDS = [
  { id: 'sun', ar: 'شَمْس', read: 'шамс', ru: 'солнце', svg: `<g ${S}><g stroke="#F4A93B" stroke-width="7">${[0,45,90,135,180,225,270,315].map(a=>`<line x1="50" y1="14" x2="50" y2="22" transform="rotate(${a} 50 50)"/>`).join('')}</g><circle cx="50" cy="50" r="20" fill="#F7C14B"/><circle cx="43" cy="44" r="6" fill="#FBDB8A"/></g>` },
  { id: 'moon', ar: 'قَمَر', read: 'камар', ru: 'луна', svg: `<path d="M60 16a35 35 0 1 0 24 52A28 28 0 0 1 60 16z" fill="#F3CF6A"/><circle cx="40" cy="56" r="4" fill="#E2B64A"/><circle cx="52" cy="72" r="3" fill="#E2B64A"/>` },
  { id: 'star', ar: 'نَجْمَة', read: 'наджма', ru: 'звезда', svg: `<path d="M50 14l10 22 24 3-18 16 5 24-21-12-21 12 5-24-18-16 24-3z" fill="#F6C445" stroke="#F6C445" stroke-width="6" stroke-linejoin="round"/><path d="M50 30l5 11" stroke="#FCE3A0" stroke-width="5" stroke-linecap="round"/>` },
  { id: 'house', ar: 'بَيْت', read: 'бейт', ru: 'дом', svg: `<g ${S}><path d="M18 48L50 20l32 28" fill="#E9806E" stroke="#E9806E" stroke-width="8"/><rect x="26" y="46" width="48" height="36" rx="4" fill="#F6E1C3"/><rect x="44" y="60" width="13" height="22" rx="3" fill="#8C6A5D"/><rect x="31" y="54" width="10" height="10" rx="2" fill="#8FC8E8"/><rect x="61" y="54" width="10" height="10" rx="2" fill="#8FC8E8"/></g>` },
  { id: 'door', ar: 'بَاب', read: 'баб', ru: 'дверь', svg: `<path d="M30 86V40a20 20 0 0 1 40 0v46z" fill="#5FA59A"/><path d="M37 82V42a13 13 0 0 1 26 0v40z" fill="#78BDB1"/><circle cx="58" cy="62" r="3.5" fill="#F4C55A"/><rect x="24" y="84" width="52" height="5" rx="2.5" fill="#B99C86"/>` },
  { id: 'book', ar: 'كِتَاب', read: 'китаб', ru: 'книга', svg: `<g ${S}><path d="M50 30c-10-7-24-8-34-4v50c10-4 24-3 34 4z" fill="#FFFFFF" stroke="#6B9BD1" stroke-width="5"/><path d="M50 30c10-7 24-8 34-4v50c-10-4-24-3-34 4z" fill="#FFFFFF" stroke="#6B9BD1" stroke-width="5"/><path d="M24 40h17M24 50h17M24 60h12M59 40h17M59 50h17M59 60h12" stroke="#C9D8EA" stroke-width="4"/></g>` },
  { id: 'pen', ar: 'قَلَم', read: 'калам', ru: 'карандаш', svg: `<g transform="rotate(45 50 50)"><rect x="40" y="12" width="20" height="56" rx="3" fill="#F5B84A"/><rect x="40" y="12" width="20" height="9" rx="3" fill="#E98A86"/><rect x="40" y="20" width="20" height="5" fill="#C9C2BC"/><path d="M40 68h20L50 88z" fill="#F3D9B5"/><path d="M46 80h8l-4 8z" fill="${ink}"/><rect x="48" y="25" width="4" height="43" fill="#E9A23B"/></g>` },
  { id: 'water', ar: 'مَاء', read: 'маа', ru: 'вода', svg: `<path d="M50 14C40 32 26 46 26 62a24 24 0 0 0 48 0c0-16-14-30-24-48z" fill="#68B6E8"/><path d="M38 60a12 12 0 0 0 9 14" stroke="#BFE3F7" stroke-width="5" fill="none" stroke-linecap="round"/>` },
  { id: 'milk', ar: 'حَلِيب', read: 'халиб', ru: 'молоко', svg: `<path d="M36 14h28v10l8 12v46a6 6 0 0 1-6 6H34a6 6 0 0 1-6-6V36l8-12z" fill="#FFFFFF" stroke="#9FC1DE" stroke-width="5" stroke-linejoin="round"/><rect x="36" y="10" width="28" height="8" rx="3" fill="#6FA4D6"/><path d="M28 54h44v10H28z" fill="#CFE2F3"/>` },
  { id: 'dates', ar: 'تَمْر', read: 'тамр', ru: 'финики', svg: `<path d="M14 54h72a36 26 0 0 1-72 0z" fill="#E8B07C"/><path d="M14 54h72" stroke="#D2915A" stroke-width="5" stroke-linecap="round"/>${[[30,44,-20],[46,40,10],[62,44,-10],[38,50,30],[56,50,-30]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="11" ry="7" transform="rotate(${r} ${x} ${y})" fill="#8A4B2E"/><ellipse cx="${x-3}" cy="${y-2}" rx="4" ry="2" transform="rotate(${r} ${x} ${y})" fill="#B5704A"/>`).join('')}` },
  { id: 'apple', ar: 'تُفَّاحَة', read: 'туффаха', ru: 'яблоко', svg: `<path d="M50 32c-10-8-32-6-32 18 0 20 14 36 24 36 4 0 6-2 8-2s4 2 8 2c10 0 24-16 24-36 0-24-22-26-32-18z" fill="#E86A5E"/><path d="M50 32c0-8 2-14 6-18" stroke="#8C6A5D" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M56 22c6-8 16-8 20-6-4 8-12 10-20 6z" fill="#7CBF6B"/><ellipse cx="33" cy="48" rx="5" ry="8" fill="#F29A90"/>` },
  { id: 'tree', ar: 'شَجَرَة', read: 'шаджара', ru: 'дерево', svg: `<rect x="44" y="56" width="12" height="30" rx="3" fill="#A07259"/><circle cx="50" cy="38" r="24" fill="#7CBF6B"/><circle cx="32" cy="52" r="14" fill="#6AAE5B"/><circle cx="68" cy="52" r="14" fill="#6AAE5B"/><circle cx="42" cy="32" r="7" fill="#9AD488"/>` },
  { id: 'key', ar: 'مِفْتَاح', read: 'мифтах', ru: 'ключ', svg: `<g fill="none" stroke="#E7AE3E" stroke-width="9" ${S}><circle cx="32" cy="38" r="14"/><path d="M42 48l34 34M64 70l8-8M72 78l8-8"/></g><circle cx="32" cy="38" r="5" fill="#FBE3A6"/>` },
  { id: 'ball', ar: 'كُرَة', read: 'кура', ru: 'мяч', svg: `<circle cx="50" cy="52" r="32" fill="#F08A7E"/><g fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"><path d="M20 44c20 8 40 8 60 0"/><path d="M24 68c18-6 34-6 52 0"/></g><circle cx="38" cy="36" r="5" fill="#F8B6AE"/>` },
  { id: 'clock', ar: 'سَاعَة', read: 'саа', ru: 'часы', svg: `<circle cx="50" cy="52" r="32" fill="#FFFFFF" stroke="#E9806E" stroke-width="7"/><g stroke="${ink}" stroke-width="6" ${S}><path d="M50 52V34M50 52l12 8"/></g><circle cx="50" cy="52" r="4" fill="${ink}"/><g fill="#E9C9B8"><circle cx="50" cy="27" r="3"/><circle cx="75" cy="52" r="3"/><circle cx="50" cy="77" r="3"/><circle cx="25" cy="52" r="3"/></g>` },
  { id: 'chair', ar: 'كُرْسِيّ', read: 'курси', ru: 'стул', svg: `<g ${S}><path d="M30 56v30M70 56v30" stroke="#A07259" stroke-width="7"/><rect x="30" y="12" width="40" height="36" rx="8" fill="#C58F6C"/><rect x="37" y="19" width="26" height="22" rx="5" fill="#DDB08F"/><rect x="24" y="46" width="52" height="12" rx="5" fill="#A87553"/></g>` },
  { id: 'car', ar: 'سَيَّارَة', read: 'саййара', ru: 'машина', svg: `<path d="M14 66V54l10-4 10-14h28l12 14h10a6 6 0 0 1 6 6v10z" fill="#6FA4D6" stroke="#6FA4D6" stroke-width="4" stroke-linejoin="round"/><path d="M38 40h10v10H32zM52 40h9l8 10H52z" fill="#D4E8F7"/><circle cx="31" cy="68" r="9" fill="${ink}"/><circle cx="70" cy="68" r="9" fill="${ink}"/><circle cx="31" cy="68" r="3.5" fill="#E8E2DC"/><circle cx="70" cy="68" r="3.5" fill="#E8E2DC"/>` },
  { id: 'umbrella', ar: 'مِظَلَّة', read: 'мизалля', ru: 'зонт', svg: `<path d="M50 48v28a7 7 0 0 1-14 0" stroke="${ink}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M14 50a36 34 0 0 1 72 0c-4-5-8-5-12 0-4-5-8-5-12 0-4-5-8-5-12 0-4-5-8-5-12 0-4-5-8-5-12 0-4-5-8-5-12 0z" fill="#9C8BD0"/><path d="M50 16c-8 8-12 20-12 34M50 16c8 8 12 20 12 34" stroke="#B9ACE2" stroke-width="4" fill="none"/>` },
  { id: 'flower', ar: 'وَرْدَة', read: 'варда', ru: 'цветок', svg: `<path d="M50 52v34" stroke="#6AAE5B" stroke-width="6" stroke-linecap="round"/><path d="M50 74c-8-10-20-8-22-4 6 6 14 8 22 4z" fill="#7CBF6B"/>${[0,72,144,216,288].map(a=>`<ellipse cx="50" cy="24" rx="10" ry="14" transform="rotate(${a} 50 38)" fill="#F29AB0"/>`).join('')}<circle cx="50" cy="38" r="9" fill="#F7C14B"/>` },
  { id: 'cloud', ar: 'سَحَابَة', read: 'сахаба', ru: 'облако', svg: `<g fill="#BFDDF2"><circle cx="36" cy="54" r="16"/><circle cx="54" cy="44" r="20"/><circle cx="70" cy="56" r="13"/><rect x="22" y="54" width="60" height="16" rx="8"/></g><circle cx="50" cy="40" r="7" fill="#E3F1FA"/>` },
];
window.wordSVG = (w) => `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${w.svg}</svg>`;

// Числа 1–10: картинка — столько же кружков.
const DOT_COLORS = ['#F29AB0', '#7CBF6B', '#F7C14B', '#6FA4D6', '#E9806E'];
const dots = (n) => {
  if (n > 10) {
    const out = [], r = 7, gap = 16, rows = Math.ceil(n / 5), y0 = 50 - ((rows - 1) * gap) / 2;
    for (let i = 0; i < n; i++) {
      const row = Math.floor(i / 5), col = i % 5, cnt = Math.min(5, n - row * 5);
      out.push(`<circle cx="${50 + (col - (cnt - 1) / 2) * gap}" cy="${y0 + row * gap}" r="${r}" fill="${i < 10 ? '#6FA4D6' : '#F29AB0'}"/>`);
    }
    return out.join('');
  }
  const rows = n <= 5 ? [n] : [Math.ceil(n / 2), Math.floor(n / 2)];
  const r = n <= 3 ? 13 : 8.6, gap = n <= 3 ? 30 : 18.6, out = [];
  rows.forEach((cnt, ri) => {
    const y = rows.length === 1 ? 50 : 39 + ri * 22;
    const x0 = 50 - ((cnt - 1) * gap) / 2;
    for (let i = 0; i < cnt; i++) out.push(`<circle cx="${x0 + i * gap}" cy="${y}" r="${r}" fill="${DOT_COLORS[(out.length) % DOT_COLORS.length]}"/>`);
  });
  return out.join('');
};
const NUMBERS = [
  ['وَاحِد', 'вахид', 'один'], ['اِثْنَان', 'иснан', 'два'], ['ثَلَاثَة', 'саляса', 'три'], ['أَرْبَعَة', 'арбаа', 'четыре'],
  ['خَمْسَة', 'хамса', 'пять'], ['سِتَّة', 'ситта', 'шесть'], ['سَبْعَة', 'сабаа', 'семь'], ['ثَمَانِيَة', 'самания', 'восемь'],
  ['تِسْعَة', 'тиса', 'девять'], ['عَشَرَة', 'ашара', 'десять'],
  ['أَحَدَ عَشَر', 'ахада ашар', 'одиннадцать'], ['اِثْنَا عَشَر', 'изна ашар', 'двенадцать'], ['ثَلَاثَةَ عَشَر', 'саляса ашар', 'тринадцать'],
  ['أَرْبَعَةَ عَشَر', 'арбаата ашар', 'четырнадцать'], ['خَمْسَةَ عَشَر', 'хамсата ашар', 'пятнадцать'], ['سِتَّةَ عَشَر', 'ситта ашар', 'шестнадцать'],
  ['سَبْعَةَ عَشَر', 'сабата ашар', 'семнадцать'], ['ثَمَانِيَةَ عَشَر', 'саманията ашар', 'восемнадцать'], ['تِسْعَةَ عَشَر', 'тисата ашар', 'девятнадцать'],
  ['عِشْرُون', 'ишруна', 'двадцать'],
].map(([ar, read, ru], i) => ({ id: 'n' + (i + 1), ar, read, ru, svg: dots(i + 1) }));

// Цвета: клякса краски.
const blob = (fill, stroke) => `<path d="M50 16c10 0 14 8 22 10s16 8 14 20-8 14-6 22-6 16-18 16-14-6-22-4-18-4-20-14 4-14 2-22 2-18 12-20 6-8 16-8z" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="3"` : ''}/><ellipse cx="38" cy="36" rx="7" ry="4" fill="#fff" opacity=".45" transform="rotate(-30 38 36)"/>`;
const COLORS = [
  ['red', 'أَحْمَر', 'ахмар', 'красный', '#E5534B'], ['blue', 'أَزْرَق', 'азрак', 'синий', '#3E7CC9'],
  ['green', 'أَخْضَر', 'ахдар', 'зелёный', '#5BAA55'], ['yellow', 'أَصْفَر', 'асфар', 'жёлтый', '#F6C93E'],
  ['white', 'أَبْيَض', 'абъяд', 'белый', '#FFFFFF', '#D8C3CA'], ['black', 'أَسْوَد', 'асвад', 'чёрный', '#33292D'],
  ['orange', 'بُرْتُقَالِيّ', 'буртукали', 'оранжевый', '#F18A3A'], ['brown', 'بُنِّيّ', 'бунни', 'коричневый', '#8A5A3C'],
  ['pink', 'وَرْدِيّ', 'варди', 'розовый', '#F29AB0'], ['gray', 'رَمَادِيّ', 'рамади', 'серый', '#9A9496'],
  ['gold', 'ذَهَبِيّ', 'захаби', 'золотой', '#E8B21E'], ['silver', 'فِضِّيّ', 'фидди', 'серебряный', '#C3CAD2'],
  ['purple', 'بَنَفْسَجِيّ', 'бафсаджи', 'фиолетовый', '#8E5BB5'], ['turquoise', 'فَيْرُوزِيّ', 'файрузи', 'бирюзовый', '#33B5B0'],
  ['navy', 'كُحْلِيّ', 'кухли', 'тёмно-синий', '#27407A'], ['skyblue', 'سَمَاوِيّ', 'самави', 'голубой', '#8CC8F0'],
  ['maroon', 'عُنَّابِيّ', 'уннаби', 'бордовый', '#8E2A3E'], ['beige', 'بِيج', 'бэж', 'бежевый', '#E8D3B0'],
  ['olive', 'زَيْتِيّ', 'зейти', 'оливковый', '#7A8A3A'], ['indigo', 'نِيلِيّ', 'нили', 'индиго', '#4B3F9A'],
].map(([id, ar, read, ru, fill, stroke]) => ({ id: 'c-' + id, ar, read, ru, svg: blob(fill, stroke) }));

// Овощи, транспорт, погода. Картинки рисованные, без живых существ.
const L = 'stroke-linecap="round" stroke-linejoin="round"';
const cloudShape = (fill, x = 0, y = 0, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})" fill="${fill}"><circle cx="36" cy="46" r="14"/><circle cx="52" cy="38" r="18"/><circle cx="68" cy="48" r="12"/><rect x="24" y="46" width="56" height="14" rx="7"/></g>`;
const flake = (x, y, k, c, sw = 5) => `<g transform="translate(${x} ${y}) scale(${k})" stroke="${c}" stroke-width="${sw / k}" fill="none" ${L}>${[0, 60, 120].map((a) => `<g transform="rotate(${a})"><path d="M0 -18V18"/><path d="M-6 -14L0 -9L6 -14M-6 14L0 9L6 14"/></g>`).join('')}</g>`;
const thermo = (c, level) => `<rect x="42" y="14" width="16" height="56" rx="8" fill="#fff" stroke="#C9B9BF" stroke-width="4"/><circle cx="50" cy="76" r="13" fill="${c}"/><rect x="46" y="${70 - level}" width="8" height="${level + 6}" rx="4" fill="${c}"/>`;
const carWord = window.WORDS.find((w) => w.id === 'car');
const sunWord = window.WORDS.find((w) => w.id === 'sun');

const VEG = [
  ['tomato', 'طَمَاطِم', 'таматым', 'помидор', `<circle cx="50" cy="56" r="28" fill="#E5534B"/><path d="M50 30l5 -8M38 32l12 4 12-4-6 8 8 4-14 0-14 0 8-4z" fill="#5BAA55" stroke="#5BAA55" stroke-width="3" ${L}/><ellipse cx="38" cy="50" rx="5" ry="8" fill="#F08A84"/>`],
  ['cucumber', 'خِيَار', 'хияр', 'огурец', `<rect x="20" y="38" width="64" height="26" rx="13" fill="#5BAA55" transform="rotate(-25 52 51)"/><g fill="#8FCB86" transform="rotate(-25 52 51)"><circle cx="34" cy="46" r="2.5"/><circle cx="48" cy="54" r="2.5"/><circle cx="60" cy="45" r="2.5"/><circle cx="72" cy="53" r="2.5"/></g>`],
  ['carrot', 'جَزَر', 'джазар', 'морковь', `<path d="M38 34c8-6 20-4 26 4L40 88c-4 2-8-2-6-6z" fill="#F18A3A"/><path d="M44 50h8M42 62h6M40 74h4" stroke="#D96F22" stroke-width="3" ${L}/><path d="M52 34c-4-10-2-18 4-22M56 34c2-10 8-14 16-14M58 36c8-4 16-2 20 4" stroke="#5BAA55" stroke-width="6" fill="none" ${L}/>`],
  ['potato', 'بَطَاطِس', 'бататис', 'картошка', `<path d="M22 54c0-16 14-26 30-26s28 10 28 24-12 26-30 26-28-10-28-24z" fill="#C99A63"/><g fill="#A87A47"><circle cx="40" cy="46" r="3"/><circle cx="60" cy="42" r="2.5"/><circle cx="64" cy="62" r="3"/><circle cx="44" cy="64" r="2.5"/></g>`],
  ['onion', 'بَصَل', 'басаль', 'лук', `<path d="M50 24c8 14 30 22 30 40a30 22 0 0 1-60 0c0-18 22-26 30-40z" fill="#C88B5A"/><path d="M50 30c-4 14-6 28-4 48M50 30c4 14 6 28 4 48M50 30c-12 14-18 26-18 40M50 30c12 14 18 26 18 40" stroke="#A86E40" stroke-width="2.5" fill="none"/><path d="M50 24V12M50 22l-6-8M50 22l6-8" stroke="#5BAA55" stroke-width="4" ${L}/>`],
  ['garlic', 'ثُوم', 'сум', 'чеснок', `<path d="M50 22c6 10 28 18 28 38 0 14-12 24-28 24S22 74 22 60c0-20 22-28 28-38z" fill="#FBF7F2" stroke="#D9CFC6" stroke-width="3"/><path d="M50 30v52M38 40c-6 12-6 28 2 40M62 40c6 12 6 28-2 40" stroke="#D9CFC6" stroke-width="3" fill="none"/><path d="M50 22V12" stroke="#B7C98F" stroke-width="5" ${L}/>`],
  ['pepper', 'فُلْفُل', 'фульфуль', 'перец', `<path d="M28 42c0-10 10-12 22-10 12-2 22 0 22 10 0 14-2 34-12 40-4 2-8-2-10-2s-6 4-10 2c-10-6-12-26-12-40z" fill="#E5534B"/><path d="M50 32v-8c0-4 4-8 8-8" stroke="#5BAA55" stroke-width="6" fill="none" ${L}/><path d="M50 40v34" stroke="#C93E37" stroke-width="3" ${L}/>`],
  ['eggplant', 'بَاذِنْجَان', 'базинджан', 'баклажан', `<path d="M58 30c14 4 22 22 14 40-6 14-26 20-38 10s-4-26 4-34c4-6 8-18 20-16z" fill="#7B4FA0"/><path d="M50 32c4-8 12-10 18-6 2 6-4 10-10 10z" fill="#5BAA55"/><path d="M62 26l6-12" stroke="#5BAA55" stroke-width="5" ${L}/><ellipse cx="44" cy="60" rx="4" ry="10" fill="#9C77BE" transform="rotate(30 44 60)"/>`],
  ['cabbage', 'كُرُنْب', 'курунб', 'капуста', `<circle cx="50" cy="54" r="30" fill="#8FCB86"/><circle cx="50" cy="54" r="20" fill="#B7E0AE"/><path d="M50 34v40M50 54c-10-6-16-14-18-22M50 54c10-6 16-14 18-22M50 64c-12-2-20 0-26 6M50 64c12-2 20 0 26 6" stroke="#6AAE5B" stroke-width="3" fill="none" ${L}/>`],
  ['corn', 'ذُرَة', 'зура', 'кукуруза', `<ellipse cx="50" cy="44" rx="14" ry="30" fill="#F6C93E"/><g fill="#E8B21E">${[22, 32, 42, 52, 62].map((y) => `<circle cx="44" cy="${y}" r="2.6"/><circle cx="52" cy="${y + 4}" r="2.6"/><circle cx="58" cy="${y}" r="2.2"/>`).join('')}</g><path d="M50 88c-16-6-24-22-22-40 8 8 14 20 22 40zM50 88c16-6 24-22 22-40-8 8-14 20-22 40z" fill="#5BAA55"/>`],
].map(([id, ar, read, ru, svg]) => ({ id: 'v-' + id, ar, read, ru, svg }));

const TRANSPORT = [
  { ...carWord, id: 't-car' },
  ['bus', 'حَافِلَة', 'хафиля', 'автобус', `<rect x="14" y="30" width="72" height="38" rx="8" fill="#F6C93E"/><g fill="#D4E8F7">${[20, 36, 52].map((x) => `<rect x="${x}" y="36" width="12" height="12" rx="2"/>`).join('')}<rect x="68" y="36" width="12" height="20" rx="2"/></g><rect x="14" y="54" width="72" height="5" fill="#E8B21E"/><circle cx="30" cy="70" r="8" fill="${ink}"/><circle cx="70" cy="70" r="8" fill="${ink}"/>`],
  ['train', 'قِطَار', 'китар', 'поезд', `<rect x="18" y="40" width="44" height="28" rx="4" fill="#E9806E"/><rect x="56" y="26" width="26" height="42" rx="4" fill="#C9594A"/><rect x="62" y="32" width="14" height="12" rx="2" fill="#D4E8F7"/><rect x="26" y="26" width="8" height="14" fill="#8C6A5D"/><path d="M12 68h76" stroke="#8C6A5D" stroke-width="4" ${L}/><g fill="${ink}"><circle cx="30" cy="70" r="8"/><circle cx="50" cy="70" r="8"/><circle cx="70" cy="70" r="8"/></g>`],
  ['plane', 'طَائِرَة', 'таира', 'самолёт', `<path d="M14 54c0-6 6-8 12-8h46c8 0 14 4 14 8s-6 8-14 8H26c-6 0-12-2-12-8z" fill="#FFFFFF" stroke="#6FA4D6" stroke-width="3"/><path d="M44 48l12-24h8l-6 24zM44 60l12 20h8l-6-20zM16 50l-4-14h7l8 12z" fill="#6FA4D6"/><g fill="#BFD3F2"><circle cx="60" cy="54" r="2.5"/><circle cx="68" cy="54" r="2.5"/><circle cx="52" cy="54" r="2.5"/></g>`],
  ['ship', 'سَفِينَة', 'сафина', 'корабль', `<path d="M12 58h76l-10 18H22z" fill="#E9806E"/><rect x="30" y="40" width="36" height="18" rx="2" fill="#FFFFFF" stroke="#D8C3CA" stroke-width="2"/><rect x="50" y="26" width="10" height="14" fill="#6FA4D6"/><g fill="#BFD3F2"><circle cx="38" cy="49" r="3"/><circle cx="48" cy="49" r="3"/><circle cx="58" cy="49" r="3"/></g><path d="M10 84c6-4 12-4 18 0s12 4 18 0 12-4 18 0 12 4 18 0" stroke="#68B6E8" stroke-width="4" fill="none" ${L}/>`],
  ['bike', 'دَرَّاجَة', 'дарраджа', 'велосипед', `<g fill="none" stroke="${ink}" stroke-width="5" ${L}><circle cx="28" cy="62" r="15"/><circle cx="72" cy="62" r="15"/></g><path d="M28 62l14-24h22M42 38l12 24h-26M54 62l10-24M64 38l8 24M40 32h10" stroke="#E9806E" stroke-width="5" fill="none" ${L}/><path d="M60 30h10" stroke="${ink}" stroke-width="5" ${L}/>`],
  ['truck', 'شَاحِنَة', 'шахина', 'грузовик', `<rect x="12" y="30" width="48" height="36" rx="4" fill="#5BAA55"/><path d="M60 42h14l12 12v12H60z" fill="#6FA4D6"/><rect x="66" y="46" width="10" height="9" rx="2" fill="#D4E8F7"/><circle cx="28" cy="70" r="8" fill="${ink}"/><circle cx="72" cy="70" r="8" fill="${ink}"/>`],
  ['boat', 'قَارِب', 'карыб', 'лодка', `<path d="M16 62h68l-12 16H28z" fill="#A07259"/><path d="M50 20v42" stroke="${ink}" stroke-width="4" ${L}/><path d="M52 22l26 34H52z" fill="#F29AB0"/><path d="M48 30L28 56h20z" fill="#FFFFFF" stroke="#D8C3CA" stroke-width="2"/><path d="M10 84c6-4 12-4 18 0s12 4 18 0 12-4 18 0 12 4 18 0" stroke="#68B6E8" stroke-width="4" fill="none" ${L}/>`],
  ['rocket', 'صَارُوخ', 'сарух', 'ракета', `<path d="M50 12c14 10 18 30 14 52H36c-4-22 0-42 14-52z" fill="#FFFFFF" stroke="#D8C3CA" stroke-width="3"/><circle cx="50" cy="40" r="7" fill="#6FA4D6"/><path d="M36 52l-12 18h14zM64 52l12 18H62z" fill="#E5534B"/><path d="M42 66h16l-8 20z" fill="#F6C93E"/>`],
  ['helicopter', 'مِرْوَحِيَّة', 'мирвахийя', 'вертолёт', `<path d="M20 30h60M50 30v10" stroke="${ink}" stroke-width="5" ${L}/><path d="M26 56c0-10 8-16 20-16h8c12 0 18 8 18 16s-6 14-18 14H40c-8 0-14-6-14-14z" fill="#F6C93E"/><path d="M72 54h16l4-8" stroke="#E8B21E" stroke-width="6" fill="none" ${L}/><path d="M56 46h10c2 4 2 8 0 10H56z" fill="#D4E8F7"/><path d="M34 76h36M42 70v6M62 70v6" stroke="${ink}" stroke-width="4" ${L}/>`],
].map((x) => (Array.isArray(x) ? { id: 't-' + x[0], ar: x[1], read: x[2], ru: x[3], svg: x[4] } : x));

const WEATHER = [
  { ...sunWord, id: 'w-sun' },
  ['rain', 'مَطَر', 'матар', 'дождь', `${cloudShape('#9DB6CC', 0, -6)}<g stroke="#4F95D6" stroke-width="5" ${L}><path d="M34 66l-4 10M50 66l-4 10M66 66l-4 10M42 80l-3 7M58 80l-3 7"/></g>`],
  ['snow', 'ثَلْج', 'сальдж', 'снег', `${flake(50, 50, 1.9, '#7FB5E6', 6)}`],
  ['wind', 'رِيح', 'рих', 'ветер', `<g fill="none" stroke="#8FB7DA" stroke-width="6" ${L}><path d="M14 40h48a10 10 0 1 0-10-10"/><path d="M14 56h62a10 10 0 1 1-10 10"/><path d="M22 72h22"/></g>`],
  ['clouds', 'غَيْم', 'гайм', 'тучи', `${cloudShape('#C9D4DE', 26, 4, .66)}${cloudShape('#9DB6CC', -2, 16, .9)}`],
  ['lightning', 'بَرْق', 'барк', 'молния', `${cloudShape('#8A97A6', 0, -10)}<path d="M52 52L40 72h10l-6 18 18-24H52l6-14z" fill="#F6C93E" stroke="#F6C93E" stroke-width="2" ${L}/>`],
  ['rainbow', 'قَوْس قُزَح', 'каус кузах', 'радуга', `<g fill="none" stroke-width="6">${['#E5534B', '#F18A3A', '#F6C93E', '#5BAA55', '#4F95D6'].map((c, i) => `<path d="M${14 + i * 6} 72a${36 - i * 6} ${36 - i * 6} 0 0 1 ${72 - i * 12} 0" stroke="${c}" stroke-linecap="round"/>`).join('')}</g>`],
  ['fog', 'ضَبَاب', 'дабаб', 'туман', `<g stroke="#B5BFC9" stroke-width="7" fill="none" ${L}><path d="M18 34h50M30 48h52M16 62h56M28 76h44"/></g>`],
  ['heat', 'حَرّ', 'харр', 'жара', `${thermo('#E5534B', 44)}<g transform="translate(66 22) scale(.36) translate(-50 -50)">${sunWord.svg}</g>`],
  ['cold', 'بَرْد', 'бард', 'холод', `${thermo('#4F95D6', 10)}${flake(74, 28, .75, '#7FB5E6', 3.5)}`],
].map((x) => (Array.isArray(x) ? { id: 'w-' + x[0], ar: x[1], read: x[2], ru: x[3], svg: x[4] } : x));

// Животные (без глаз и рта, как все рисованные герои), мебель, одежда, фрукты.
const mk = (prefix) => (x) => (Array.isArray(x) ? { id: prefix + x[0], ar: x[1], read: x[2], ru: x[3], svg: x[4] } : x);
const chairWord = window.WORDS.find((w) => w.id === 'chair');
const appleWord = window.WORDS.find((w) => w.id === 'apple');
const legs = (xs, y1, y2, c, w = 6) => xs.map((x) => `<path d="M${x} ${y1}V${y2}" stroke="${c}" stroke-width="${w}" ${L}/>`).join('');

const ANIMALS = [
  ['cat', 'قِطّ', 'кытт', 'кошка', `<path d="M66 80c14-4 18-20 8-26" stroke="#E8964A" stroke-width="6" fill="none" ${L}/><ellipse cx="50" cy="66" rx="20" ry="18" fill="#F2A65A"/><circle cx="50" cy="40" r="15" fill="#F2A65A"/><path d="M37 34l-2-16 12 9zM63 34l2-16-12 9z" fill="#F2A65A"/><ellipse cx="50" cy="70" rx="9" ry="10" fill="#F7C38D"/>`],
  ['horse', 'حِصَان', 'хысан', 'лошадь', `${legs([34, 42, 62, 70], 60, 84, '#8C5A3C', 7)}<ellipse cx="52" cy="56" rx="26" ry="13" fill="#A0694A"/><path d="M68 52l8-22c2-6 10-8 14-2l2 10-8 4-6 14z" fill="#A0694A"/><path d="M72 28c-4 6-6 14-8 22" stroke="#6E4330" stroke-width="5" ${L}/><path d="M26 54c-8 2-10 12-8 20" stroke="#6E4330" stroke-width="5" fill="none" ${L}/>`],
  ['camel', 'جَمَل', 'джамаль', 'верблюд', `${legs([34, 42, 60, 68], 62, 86, '#C08D52', 6)}<path d="M24 64c0-10 6-14 12-14 2-10 8-16 12-16s8 6 10 14c4-2 10 0 12 6v10z" fill="#D9A86C"/><path d="M68 58l6-28c1-4 4-6 8-6h4c3 0 4 3 3 6l-2 4h-7l-5 26z" fill="#D9A86C"/>`],
  ['cow', 'بَقَرَة', 'бакара', 'корова', `${legs([32, 40, 60, 68], 60, 84, '#8C7A70', 7)}<rect x="22" y="42" width="54" height="26" rx="12" fill="#FFFFFF" stroke="#D8C3CA" stroke-width="2"/><path d="M34 46c6 0 8 6 4 10s-10 0-10-4 2-6 6-6zM56 56c6-2 10 2 8 6s-8 4-10 0z" fill="#4A3A35"/><rect x="70" y="34" width="18" height="20" rx="8" fill="#FFFFFF" stroke="#D8C3CA" stroke-width="2"/><path d="M72 34l-4-8M86 34l4-8" stroke="#C9B39A" stroke-width="4" ${L}/>`],
  ['sheep', 'خَرُوف', 'харуф', 'баран', `${legs([36, 44, 58, 66], 64, 84, '#4A3A35', 6)}<g fill="#F7F1EA" stroke="#E2D6CB" stroke-width="2">${[[34, 50], [46, 42], [60, 44], [70, 54], [60, 64], [44, 64], [32, 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12"/>`).join('')}</g><ellipse cx="78" cy="46" rx="9" ry="11" fill="#4A3A35"/>`],
  ['rabbit', 'أَرْنَب', 'арнаб', 'кролик', `<ellipse cx="48" cy="66" rx="22" ry="18" fill="#D2CBC6"/><circle cx="64" cy="46" r="13" fill="#D2CBC6"/><path d="M58 36c-4-10-4-22 0-24s6 12 6 22zM68 36c2-10 6-22 10-22s2 14-4 24z" fill="#D2CBC6"/><circle cx="26" cy="64" r="6" fill="#FFFFFF"/>`],
  ['fish', 'سَمَكَة', 'самака', 'рыба', `<path d="M16 50c12-18 44-22 60 0-16 22-48 18-60 0z" fill="#6FA4D6"/><path d="M74 50l14-14v28z" fill="#4F86C2"/><path d="M38 38c4 8 4 16 0 24M52 36c4 8 4 20 0 28" stroke="#A9C9EA" stroke-width="4" fill="none" ${L}/>`],
  ['bird', 'عُصْفُور', 'усфур', 'птица', `<path d="M60 74l-4 12M66 74l2 12" stroke="#C08D52" stroke-width="4" ${L}/><ellipse cx="54" cy="56" rx="24" ry="20" fill="#F29AB0"/><circle cx="72" cy="38" r="12" fill="#F29AB0"/><path d="M30 52c-10-4-16 0-18 4 8 2 14 2 20 0z" fill="#E07A95"/><path d="M42 54c8-6 22-4 24 6-8 6-20 4-24-6z" fill="#E07A95"/>`],
  ['elephant', 'فِيل', 'филь', 'слон', `${legs([32, 44, 58, 68], 62, 84, '#8E9AA6', 9)}<ellipse cx="48" cy="54" rx="28" ry="20" fill="#9AA6B2"/><circle cx="74" cy="44" r="14" fill="#9AA6B2"/><path d="M84 48c6 6 6 18 0 26" stroke="#9AA6B2" stroke-width="8" fill="none" ${L}/><path d="M62 34c-10 0-14 10-10 20 4 6 12 6 14 0z" fill="#B5BFC9"/>`],
  ['lion', 'أَسَد', 'асад', 'лев', `${legs([34, 42, 60, 68], 62, 84, '#D99A3A', 7)}<path d="M22 58c-8-2-12 6-10 12" stroke="#D99A3A" stroke-width="4" fill="none" ${L}/><circle cx="11" cy="72" r="4" fill="#B5651D"/><ellipse cx="48" cy="58" rx="26" ry="14" fill="#E8B04A"/><circle cx="72" cy="42" r="18" fill="#C97A2B"/><circle cx="74" cy="44" r="11" fill="#E8B04A"/>`],
].map(mk('a-'));

const FURNITURE = [
  ['bed', 'سَرِير', 'сарир', 'кровать', `<rect x="14" y="34" width="10" height="46" rx="3" fill="#A07259"/><rect x="18" y="56" width="68" height="16" rx="4" fill="#BFD3F2"/><rect x="24" y="48" width="18" height="10" rx="5" fill="#FFFFFF" stroke="#D8C3CA" stroke-width="2"/><rect x="40" y="52" width="46" height="8" rx="4" fill="#F29AB0"/>${legs([84], 70, 80, '#A07259', 7)}`],
  { ...chairWord, id: 'f-chair' },
  ['table', 'طَاوِلَة', 'тавиля', 'стол', `<rect x="14" y="38" width="72" height="10" rx="4" fill="#C58F6C"/>${legs([22, 78], 48, 84, '#A07259', 7)}<path d="M46 38l-2-12h12l-2 12z" fill="#6FA4D6"/><path d="M50 26c-2-6 2-10 6-12M50 26c0-6-4-8-8-8" stroke="#5BAA55" stroke-width="3" fill="none" ${L}/>`],
  ['wardrobe', 'خِزَانَة', 'хызана', 'шкаф', `<rect x="24" y="14" width="52" height="68" rx="5" fill="#C58F6C"/><path d="M50 18v60" stroke="#A07259" stroke-width="3"/><circle cx="45" cy="50" r="3" fill="#F6C93E"/><circle cx="55" cy="50" r="3" fill="#F6C93E"/>${legs([30, 70], 82, 88, '#A07259', 5)}`],
  ['sofa', 'أَرِيكَة', 'арика', 'диван', `<rect x="20" y="34" width="60" height="26" rx="8" fill="#6FA4D6"/><rect x="12" y="46" width="16" height="28" rx="6" fill="#4F86C2"/><rect x="72" y="46" width="16" height="28" rx="6" fill="#4F86C2"/><rect x="26" y="54" width="48" height="18" rx="5" fill="#8FB7DA"/>${legs([18, 82], 74, 82, '#8C6A5D', 5)}`],
  ['lamp', 'مِصْبَاح', 'мисбах', 'лампа', `<circle cx="50" cy="40" r="22" fill="#FCE3A0" opacity=".5"/><path d="M34 22h32l8 26H26z" fill="#F7C14B"/><path d="M50 48v28" stroke="#8C6A5D" stroke-width="5" ${L}/><rect x="36" y="76" width="28" height="8" rx="4" fill="#8C6A5D"/>`],
  ['mirror', 'مِرْآة', 'миръа', 'зеркало', `<ellipse cx="50" cy="42" rx="22" ry="28" fill="#D9C3A5"/><ellipse cx="50" cy="42" rx="16" ry="22" fill="#DCEFFA"/><path d="M42 30l8-6M42 40l14-10" stroke="#FFFFFF" stroke-width="3" ${L}/><path d="M50 70v12M38 86h24" stroke="#A07259" stroke-width="5" ${L}/>`],
  ['shelf', 'رَفّ', 'рафф', 'полка', `<path d="M16 46h68M16 76h68" stroke="#A07259" stroke-width="6" ${L}/>${[['#E9806E', 22, 18], ['#6FA4D6', 32, 22], ['#F7C14B', 42, 16], ['#7CBF6B', 52, 20]].map(([c, x, h]) => `<rect x="${x}" y="${43 - h}" width="9" height="${h}" rx="2" fill="${c}"/>`).join('')}<rect x="60" y="60" width="16" height="13" rx="3" fill="#F29AB0"/><circle cx="30" cy="66" r="7" fill="#B9DCC9"/>`],
  ['rug', 'سَجَّادَة', 'саджжада', 'ковёр', `<rect x="22" y="16" width="56" height="68" rx="4" fill="#C9594A"/><rect x="28" y="22" width="44" height="56" rx="2" fill="none" stroke="#F6C93E" stroke-width="3"/><path d="M36 70V44a14 14 0 0 1 28 0v26z" fill="#E9806E" stroke="#F6C93E" stroke-width="3"/><path d="M26 84v6M34 84v6M42 84v6M50 84v6M58 84v6M66 84v6M74 84v6M26 10v6M34 10v6M42 10v6M50 10v6M58 10v6M66 10v6M74 10v6" stroke="#F6C93E" stroke-width="2.5" ${L}/>`],
  ['pillow', 'وِسَادَة', 'висада', 'подушка', `<path d="M18 30c10 4 54 4 64 0-4 14-4 26 0 40-10-4-54-4-64 0 4-14 4-26 0-40z" fill="#F29AB0"/><path d="M30 42c12 2 28 2 40 0M30 58c12-2 28-2 40 0" stroke="#F7C1CF" stroke-width="3" fill="none" ${L}/>`],
].map(mk('f-'));

const CLOTHES = [
  ['shirt', 'قَمِيص', 'камис', 'рубашка', `<path d="M36 18l14 8 14-8 20 12-8 16-8-4v42H32V42l-8 4-8-16z" fill="#6FA4D6"/><path d="M42 20l8 14 8-14" fill="#FFFFFF"/><g fill="#FFFFFF"><circle cx="50" cy="46" r="2.5"/><circle cx="50" cy="58" r="2.5"/><circle cx="50" cy="70" r="2.5"/></g>`],
  ['dress', 'فُسْتَان', 'фустан', 'платье', `<path d="M38 14h24l-2 10 6 20H34l6-20z" fill="#F29AB0"/><path d="M34 44h32l14 42H20z" fill="#F29AB0"/><path d="M34 44h32" stroke="#E07A95" stroke-width="4"/>`],
  ['shoes', 'حِذَاء', 'хыза', 'обувь', `<path d="M16 64V44c0-4 4-6 8-4l16 8c10 4 24 6 36 8 6 2 8 6 8 10v2z" fill="#E9806E"/><rect x="14" y="66" width="72" height="10" rx="5" fill="#FFFFFF" stroke="#D8C3CA" stroke-width="2"/><path d="M34 48l6 6M42 52l6 6" stroke="#FFFFFF" stroke-width="3" ${L}/>`],
  ['sock', 'جَوْرَب', 'джаураб', 'носок', `<path d="M36 14h24v44l16 12c6 4 4 16-6 16H48c-8 0-12-6-12-12z" fill="#F7C14B"/><rect x="36" y="14" width="24" height="10" fill="#E9806E"/><path d="M36 36h24M36 46h24" stroke="#E9806E" stroke-width="4"/>`],
  ['hat', 'قُبَّعَة', 'куббаа', 'шапка', `<path d="M20 66c0-24 12-40 30-40s30 16 30 40z" fill="#7CBF6B"/><rect x="16" y="62" width="68" height="14" rx="7" fill="#5BAA55"/><circle cx="50" cy="22" r="9" fill="#F29AB0"/><path d="M36 40v20M50 34v26M64 40v20" stroke="#6AAE5B" stroke-width="3" ${L}/>`],
  ['pants', 'سِرْوَال', 'сирваль', 'штаны', `<path d="M28 14h44l6 72H58L50 38l-8 48H22z" fill="#4F86C2"/><rect x="28" y="14" width="44" height="8" fill="#3E6FA8"/>`],
  ['coat', 'مِعْطَف', 'мытаф', 'пальто', `<path d="M38 14l12 10 12-10 20 10 2 62H16l2-62z" fill="#A07259"/><path d="M50 24v62" stroke="#8C5A3C" stroke-width="3"/><g fill="#F6C93E"><circle cx="56" cy="40" r="3"/><circle cx="56" cy="54" r="3"/><circle cx="56" cy="68" r="3"/></g><path d="M26 56h12M62 56h12" stroke="#8C5A3C" stroke-width="3" ${L}/>`],
  ['hijab', 'حِجَاب', 'хиджаб', 'хиджаб', `<path d="M50 12c-20 0-30 18-30 36 0 14-6 30-8 40h76c-2-10-8-26-8-40 0-18-10-36-30-36z" fill="#B9A3D6"/><ellipse cx="50" cy="44" rx="14" ry="18" fill="#FCEFF2"/><path d="M36 60c6 8 22 8 28 0" stroke="#9C86C2" stroke-width="3" fill="none" ${L}/>`],
  ['scarf', 'وِشَاح', 'вишах', 'шарф', `<path d="M24 30c8 10 44 10 52 0v14c-8 10-44 10-52 0z" fill="#E5534B"/><path d="M58 44l6 36H50z" fill="#E5534B"/><path d="M50 80v6M54 80v6M58 80v6M62 80v6" stroke="#C93E37" stroke-width="3" ${L}/><path d="M30 34v10M44 38v10M58 38v10M70 34v10" stroke="#F08A84" stroke-width="3" ${L}/>`],
  ['mitten', 'قُفَّاز', 'куффаз', 'варежка', `<path d="M34 76V40c0-14 8-22 18-22s16 8 16 20v14l8-6c6-4 12 2 8 8L68 70v6z" fill="#F29AB0"/><rect x="32" y="74" width="38" height="12" rx="4" fill="#E07A95"/><path d="M44 36v10M52 32v10" stroke="#F7C1CF" stroke-width="3" ${L}/>`],
].map(mk('k-'));

const FRUITS = [
  { ...appleWord, id: 'p-apple' },
  ['banana', 'مَوْز', 'мауз', 'банан', `<path d="M22 40c4 26 26 42 56 34 4-2 4-6 0-6-24 2-40-10-46-30-2-4-10-4-10 2z" fill="#F6C93E"/><path d="M26 38l-4-8" stroke="#8C6A5D" stroke-width="5" ${L}/><path d="M34 46c8 14 22 22 38 22" stroke="#E8B21E" stroke-width="3" fill="none" ${L}/>`],
  ['orange', 'بُرْتُقَال', 'буртукаль', 'апельсин', `<circle cx="50" cy="54" r="28" fill="#F18A3A"/><path d="M50 26c4-8 12-10 18-8-2 8-10 10-18 8z" fill="#5BAA55"/><g fill="#F6A866"><circle cx="40" cy="44" r="2"/><circle cx="58" cy="50" r="2"/><circle cx="46" cy="64" r="2"/></g>`],
  ['grapes', 'عِنَب', 'инаб', 'виноград', `<path d="M50 24v-8M50 22c6-8 16-8 20-4-6 6-14 6-20 4z" stroke="#5BAA55" stroke-width="4" fill="#5BAA55" ${L}/><g fill="#8E5BB5">${[[40, 32], [52, 32], [64, 34], [34, 44], [46, 44], [58, 44], [40, 56], [52, 56], [46, 68], [58, 66], [52, 78]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7.5"/>`).join('')}</g>`],
  ['strawberry', 'فَرَاوِلَة', 'фаравиля', 'клубника', `<path d="M24 38c0-8 52-8 52 0 0 20-14 44-26 48-12-4-26-28-26-48z" fill="#E5534B"/><path d="M30 34l8-12 6 8 6-10 6 10 6-8 8 12c-12 4-28 4-40 0z" fill="#5BAA55"/><g fill="#FCE3A0">${[[38, 48], [50, 46], [62, 48], [44, 60], [56, 60], [50, 72]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="2.4"/>`).join('')}</g>`],
  ['watermelon', 'بِطِّيخ', 'биттых', 'арбуз', `<path d="M12 40h76a38 38 0 0 1-76 0z" fill="#5BAA55"/><path d="M18 40h64a32 32 0 0 1-64 0z" fill="#FFFFFF"/><path d="M22 40h56a28 28 0 0 1-56 0z" fill="#F07B7B"/><g fill="#33292D">${[[36, 50], [50, 56], [64, 50], [43, 62], [57, 62]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="3"/>`).join('')}</g>`],
  ['pomegranate', 'رُمَّان', 'румман', 'гранат', `<circle cx="50" cy="56" r="28" fill="#C9394A"/><path d="M42 30l-2-10 6 4 4-6 4 6 6-4-2 10z" fill="#A82E3D"/><ellipse cx="40" cy="48" rx="5" ry="8" fill="#E06272" transform="rotate(20 40 48)"/>`],
  ['lemon', 'لَيْمُون', 'леймун', 'лимон', `<path d="M14 52c6-4 8-18 36-20s32 16 36 20c-4 4-8 20-36 20S20 56 14 52z" fill="#F6D84A"/><path d="M60 32c4-8 12-10 18-6-4 6-10 8-18 6z" fill="#5BAA55"/><ellipse cx="38" cy="46" rx="8" ry="3" fill="#FBEA9A"/>`],
  ['fig', 'تِين', 'тин', 'инжир', `<path d="M50 22c6 0 8 8 14 16 10 12 14 20 14 30 0 12-12 18-28 18s-28-6-28-18c0-10 4-18 14-30 6-8 8-16 14-16z" fill="#8E5BB5"/><path d="M50 22v-8" stroke="#5BAA55" stroke-width="5" ${L}/><path d="M36 60c4 10 12 14 22 12" stroke="#B48ED2" stroke-width="4" fill="none" ${L}/>`],
  ['olives', 'زَيْتُون', 'зейтун', 'оливки', `<path d="M14 26c20 10 40 26 62 54" stroke="#8C6A5D" stroke-width="4" fill="none" ${L}/><g fill="#8FB873"><ellipse cx="30" cy="22" rx="12" ry="5" transform="rotate(-20 30 22)"/><ellipse cx="62" cy="40" rx="12" ry="5" transform="rotate(20 62 40)"/><ellipse cx="72" cy="66" rx="12" ry="5" transform="rotate(-30 72 66)"/></g><ellipse cx="40" cy="48" rx="9" ry="12" fill="#5E7A3A"/><ellipse cx="56" cy="62" rx="9" ry="12" fill="#33292D"/><ellipse cx="37" cy="44" rx="2.5" ry="4" fill="#8FB873"/>`],
].map(mk('p-'));

window.SETS = {
  items: { name: 'Предметы', words: window.WORDS },
  numbers: { name: 'Числа', words: NUMBERS },
  colors: { name: 'Цвета', words: COLORS },
  veg: { name: 'Овощи', words: [...VEG, ...((window.EXTRA && window.EXTRA.veg) || [])] },
  transport: { name: 'Транспорт', words: [...TRANSPORT, ...((window.EXTRA && window.EXTRA.transport) || [])] },
  weather: { name: 'Погода', words: [...WEATHER, ...((window.EXTRA && window.EXTRA.weather) || [])] },
  animals: { name: 'Животные', words: [...ANIMALS, ...((window.EXTRA && window.EXTRA.animals) || [])] },
  furniture: { name: 'Мебель', words: [...FURNITURE, ...((window.EXTRA && window.EXTRA.furniture) || [])] },
  clothes: { name: 'Одежда', words: [...CLOTHES, ...((window.EXTRA && window.EXTRA.clothes) || [])] },
  fruits: { name: 'Фрукты', words: [...FRUITS, ...((window.EXTRA && window.EXTRA.fruits) || [])] },
};
