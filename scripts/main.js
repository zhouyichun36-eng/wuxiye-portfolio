/* ==========================================================================
   main.js — 入口：装配页面、启动浏览引擎、管理页内交互生命周期
   ========================================================================== */
import { Deck } from './deck.js';
import { sections } from './sections/index.js';
import { applyTransition } from './interactions/page-transition.js';
import { enableMediaHover } from './interactions/media-hover.js';
import { enableArchiveSpread } from './interactions/archive-spread.js';
import { initContentsNav, setCurrentPage } from './interactions/contents-nav.js';
import { enableCustomCursor } from './interactions/custom-cursor.js';

const track = document.getElementById('deck-track');
const dotsNav = document.getElementById('deck-dots');
const siteHeader = document.getElementById('site-header');

/* —— 1. 渲染所有 section —— */
const sectionEls = sections.map((mod, i) => {
  const el = document.createElement('section');
  el.className = 'deck-section';
  el.id = `s-${mod.id}`;
  el.setAttribute('aria-label', mod.title || mod.id);
  el.innerHTML = mod.render();
  track.appendChild(el);
  return el;
});

/* —— 2. 进度圆点 —— */
const dots = sections.map((mod, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.setAttribute('aria-label', `第 ${i + 1} 页：${mod.title || mod.id}`);
  b.addEventListener('click', () => deck.goTo(i));
  dotsNav.appendChild(b);
  return b;
});

/* —— 3. 页内交互生命周期：进入挂载、离开卸载 —— */
let currentCleanup = null;

function activate(index, prevIndex) {
  sectionEls.forEach((el, i) => el.classList.toggle('is-active', i === index));
  dots.forEach((d, i) => d.classList.toggle('is-active', i === index));

  // 全局 Header：封面（P01）淡出隐藏，其余页显示
  if (siteHeader) siteHeader.classList.toggle('is-on-cover', index === 0);

  // 当前页标签 / 页码 / 目录高亮（contents-nav 统一处理）
  const mod = sections[index];
  setCurrentPage(index, mod.title);

  if (typeof currentCleanup === 'function') currentCleanup();
  currentCleanup = null;

  if (typeof mod.mount === 'function') {
    currentCleanup = mod.mount(sectionEls[index]);
  }
}

/* —— 4. 起始引擎 —— */
const deck = new Deck({
  track,
  sections: sectionEls,
  onChange: (index, prev) => {
    applyTransition(index, prev, sectionEls);
    activate(index, prev);
  },
});

activate(deck.index, deck.index);

/* —— 5. 全站轻交互（Phase 13 + 14） —— */
enableMediaHover();       // 统一图片 / 手机框 hover（Phase 13）
enableArchiveSpread();    // P14/P16/P19 展开（Phase 12）
enableCustomCursor();     // Desktop 光标 + Mobile touch indicator（Phase 14）
initContentsNav(deck);    // 总目录 / Contents（Phase 14）
// Phase 19：移除原「首次进入的一次性 scroll-hint 引导」，
// 封面右下方新增常驻的克制「向下滑动」提示（见 cover.js / sections.css 的 .cover-scroll-hint）。