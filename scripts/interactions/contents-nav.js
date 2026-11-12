/**
 * Interaction: contents-nav（PART 05 — 总目录 / Contents Navigation）
 * ------------------------------------------------------------------
 * 在固定 Header 的「目录」入口打开一个总目录面板：
 *   - Desktop：右侧抽屉式 panel（translateX 进出）
 *   - Mobile ：底部上滑 sheet（translateY 进出）
 *
 * Phase 17 精简：
 *   - 目录只展示 5 个大章节入口（SECTION_OPENERS），不做分组
 *   - 每条：编号 + 中文（更粗更大） + 英文辅助（更小更弱）
 *   - 当前章节高亮用页码 range 判断（用户在该章节任意页都高亮对应条）
 *
 * 强调：
 *   - 入口 / 头部 / 条目全部中文主导
 *   - 白底黑字、出版物感、留白清楚，不做 App 风菜单 / 重 UI 列表
 *   - 关闭：× 按钮 / 点击遮罩 / 点击某条目导航后 / Escape
 */
import { SITE_META, SECTION_OPENERS } from '../site-meta.js';

let panel = null;
let body = null;
let scrim = null;
let toggleBtn = null;
let closeBtn = null;
let deckRef = null;
let open = false;

export function initContentsNav(deck) {
  deckRef = deck;
  panel = document.getElementById('contents-panel');
  body = document.getElementById('contents-body');
  scrim = document.getElementById('contents-scrim');
  toggleBtn = document.getElementById('contents-toggle');
  closeBtn = document.getElementById('contents-close');
  if (!panel || !body || !toggleBtn) return;

  buildContents();

  toggleBtn.addEventListener('click', () => toggleOpen());
  if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
  if (scrim) scrim.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setOpen(false);
  });
}

export function isContentsOpen() { return open; }

function toggleOpen() { setOpen(!open); }

function setOpen(next) {
  if (next === open) return;
  open = next;
  panel.classList.toggle('is-open', open);
  if (scrim) scrim.classList.toggle('is-open', open);
  toggleBtn.setAttribute('aria-expanded', String(open));
  panel.setAttribute('aria-hidden', String(!open));
  // 锁定整页浏览：目录打开时不响应滚轮/触摸翻页（协调衔接）
  document.body.classList.toggle('is-contents-open', open);
}

/* —— Phase 17：只渲染 5 个大章节入口 —— */
function buildContents() {
  let html = '';
  SECTION_OPENERS.forEach((m) => {
    html += `
      <button class="contents-item" type="button" data-go="${m.p}">
        <span class="ci-num">${m.num}</span>
        <span class="ci-zh">${m.zh}</span>
        <span class="ci-en">${m.en}</span>
      </button>`;
  });
  body.innerHTML = html;

  body.querySelectorAll('.contents-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.getAttribute('data-go'), 10);
      if (deckRef && !Number.isNaN(p)) deckRef.goTo(p);
      setOpen(false);
    });
  });
}

/* —— 当前章节高亮 + Header 当前标签/页码更新 ——
   Phase 17：用 SECTION_OPENERS.range 判断
   —— 用户在章节任意一页（如 P05/P06/P07/P08/P09 等），
      都高亮该章节对应的目录条 —— */
export function setCurrentPage(index) {
  // Header 当前页标签 + 页码（仍用 SITE_META 的 zh 显示当前页的具体名称）
  const meta = SITE_META[index];
  const labelEl = document.getElementById('site-label');
  const numEl = document.getElementById('site-num');
  if (labelEl) labelEl.textContent = meta ? meta.zh : '';
  if (numEl) numEl.textContent = `${meta ? meta.num : String(index + 1).padStart(2, '0')} / ${SITE_META.length}`;

  // 目录当前章节高亮（用 range 范围判断"当前属于哪一章"）
  const currentChap = SECTION_OPENERS.find(
    (m) => index >= m.range[0] && index <= m.range[1]
  );
  if (body) {
    body.querySelectorAll('.contents-item').forEach((btn) => {
      const go = parseInt(btn.getAttribute('data-go'), 10);
      btn.classList.toggle('is-current', go === (currentChap && currentChap.p));
    });
  }
}