/* ==========================================================================
   deck.js — 整页浏览引擎（presentation-style navigation）
   --------------------------------------------------------------------------
   职责：
   - 滚轮 / 触控板 / 键盘（↑↓ PageUp/PageDown Space Home End）/ 触摸滑动切换
   - hash 深链接（#/2 直达第 3 页），刷新、分享链接可定位
   - 页内交互共存：
       · 带 data-deck-lock 的元素内部，滚轮/触摸不触发翻页（留给 creative coding）
       · 带 .section-scroll 的元素内部，滚动未到底/顶时不触发翻页
   - 生命周期：切页时回调 onChange，供各 section 挂载/卸载交互
   不改变任何页面内容，只负责“在哪一页”。
   ========================================================================== */

/* ————————————————————————————————————————————
   Content Scroll First（PART 04–11）
   - 页内还有内容可看 → 绝不翻页
   - 到达页内边界后，需要「再一次」明确滚动/滑动才翻页
   - 用累积 delta（而非单次事件）判断明确意图，防止 Trackpad 惯性误触
   ———————————————————————————————————————————— */
const COOLDOWN_MS = 900;        // 翻页冷却：>= --dur-deck(850ms)，挡住一次手势的惯性尾部
const WHEEL_THRESHOLD = 120;    // 累积滚动量阈值(px)：120px 才算「明确向下/向上意图」
const SWIPE_THRESHOLD = 70;     // 触摸滑动最小位移(px)

export class Deck {
  /**
   * @param {Object}   opts
   * @param {HTMLElement} opts.track      平移轨道元素
   * @param {HTMLElement[]} opts.sections 各页 <section> 元素（按顺序）
   * @param {Function} opts.onChange      (index, prevIndex) => void
   */
  constructor({ track, sections, onChange }) {
    this.track = track;
    this.sections = sections;
    this.onChange = onChange || (() => {});
    this.index = 0;
    this.locked = false;          // 动画冷却锁
    this.wheelAcc = 0;            // 累积滚动量（双手势意图）
    this.wheelDir = 0;            // 当前手势方向（反向则重置累积）
    this.wheelAt = 0;             // 上次滚动时间戳（手势超时重置）
    this.boundaryArmed = false;   // 页内到达边界后的"再次确认"标记
    this.touchStartY = null;
    this.touchStartX = null;

    this.#bind();
    this.#goTo(this.#indexFromHash(), { instant: true, silent: true });
  }

  get count() { return this.sections.length; }

  next() { this.#goTo(this.index + 1); }
  prev() { this.#goTo(this.index - 1); }
  goTo(i) { this.#goTo(i); }

  /* ------------------------------ 内部 ------------------------------ */

  #goTo(i, { instant = false, silent = false } = {}) {
    const clamped = Math.max(0, Math.min(i, this.count - 1));
    if (clamped === this.index && !instant) return;
    if (this.locked && !instant) return;

    const prev = this.index;
    this.index = clamped;
    this.#resetGesture();       // 翻页后清空滚动意图，隔离惯性尾部

    if (instant) this.track.classList.add('no-transition');
    this.track.style.transform = `translateY(${-this.index * 100}dvh)`;
    if (instant) {
      // 强制 reflow 后恢复过渡
      void this.track.offsetHeight;
      this.track.classList.remove('no-transition');
    }

    // 冷却锁：动画期间忽略新的翻页输入
    this.locked = true;
    window.setTimeout(() => { this.locked = false; }, instant ? 0 : COOLDOWN_MS);

    history.replaceState(null, '', `#/${this.index + 1}`);
    if (!silent) this.onChange(this.index, prev);
    else this.onChange(this.index, this.index);
  }

  #indexFromHash() {
    const m = location.hash.match(/^#\/(\d+)$/);
    if (!m) return 0;
    return Math.max(0, Math.min(parseInt(m[1], 10) - 1, this.count - 1));
  }

  /* 事件是否发生在“页内交互/滚动区域”里 */
  #isInLockedZone(target) {
    return !!target.closest('[data-deck-lock]');
  }

  /* 总目录（Contents）打开时锁定整页翻页（协调衔接，contents-nav 切换 body.is-contents-open） */
  #chromeLocked() {
    return document.body.classList.contains('is-contents-open');
  }

  /* 事件是否发生在可滚动区域，且该方向还能继续滚动 → 让给页内滚动 */
  #scrollableCanMove(target, dir) {
    const el = target.closest('.section-scroll');
    if (!el) return false;
    if (dir > 0) return el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    return el.scrollTop > 1;
  }

  /* 事件是否落在某个可滚动容器内（无论是否到达边界） */
  #insideScrollable(target) {
    return !!target.closest('.section-scroll');
  }

  #resetGesture() {
    this.wheelAcc = 0;
    this.wheelDir = 0;
    this.wheelAt = 0;
    this.boundaryArmed = false;
  }

  #bind() {
    /* —— 滚轮 / 触控板 ——
       Content Scroll First：
       · 页内还有内容可滚 → 让给页面，不翻页（绝不提前跳）
       · 页内滚动已到边界 → 记录一次（boundaryArmed），
         要求用户「再一次」明确滚动才翻页（保护正在读最后文字的用户）
       · 用累积 delta + 阈值判断明确意图，而非单次事件；
       · 方向改变 / 手势超时 会重置累积，避免 Trackpad 惯性连续翻多页。 */
    window.addEventListener('wheel', (e) => {
      if (this.locked) return;
      if (this.#chromeLocked()) return;
      if (this.#isInLockedZone(e.target)) return;

      const dir = Math.sign(e.deltaY);
      const scrollable = this.#insideScrollable(e.target);

      // (1) 页内还能继续往该方向滚 → 交还页内，清零翻页累积
      if (scrollable && this.#scrollableCanMove(e.target, dir)) {
        this.boundaryArmed = false;
        this.wheelAcc = 0;
        return;
      }

      // (2) 页内滚动已到边界（或整页无内部滚动）：
      //     若是第一次到达边界，只标记、不清零累积，等待用户再次明确滚动
      if (scrollable && !this.#scrollableCanMove(e.target, dir) && !this.boundaryArmed) {
        this.boundaryArmed = true;
        return;
      }

      // (3) 手势超时 / 方向反转 → 重置累积（把惯性尾部与新的意图区分开）
      const now = performance.now();
      if (this.wheelDir !== dir || now - this.wheelAt > 500) {
        this.wheelAcc = 0;
        this.wheelDir = dir;
      }
      this.wheelAt = now;

      this.wheelAcc += e.deltaY;
      if (Math.abs(this.wheelAcc) < WHEEL_THRESHOLD) return;
      this.wheelAcc = 0;
      this.boundaryArmed = false;
      this.wheelDir = 0;
      dir > 0 ? this.next() : this.prev();
    }, { passive: true });

    /* —— 键盘 —— */
    window.addEventListener('keydown', (e) => {
      if (this.#chromeLocked()) return;
      // 焦点在输入控件时不劫持
      if (e.target.closest('input, textarea, [contenteditable]')) return;
      switch (e.key) {
        case 'ArrowDown': case 'PageDown': case ' ':
          e.preventDefault(); this.next(); break;
        case 'ArrowUp': case 'PageUp':
          e.preventDefault(); this.prev(); break;
        case 'Home': e.preventDefault(); this.#goTo(0); break;
        case 'End':  e.preventDefault(); this.#goTo(this.count - 1); break;
      }
    });

    /* —— 触摸滑动 —— */
    window.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
      this.touchStartX = e.touches[0].clientX;
      this.touchTarget = e.target;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (this.touchStartY === null || this.locked) return;
      if (this.#chromeLocked()) { this.#resetTouch(); return; }
      if (this.#isInLockedZone(this.touchTarget)) { this.#resetTouch(); return; }

      const dy = this.touchStartY - e.changedTouches[0].clientY;
      const dx = this.touchStartX - e.changedTouches[0].clientX;
      this.#resetTouch();

      // 横向位移更大时不翻页（留给页内横向交互）
      if (Math.abs(dx) > Math.abs(dy)) return;
      if (Math.abs(dy) < SWIPE_THRESHOLD) return;

      const dir = Math.sign(dy);
      // 页内还有内容可滚 → 让给页内自然滚动；到边界后才允许翻页
      const scrollable = this.#insideScrollable(e.target);
      if (scrollable && this.#scrollableCanMove(e.target, dir)) return;
      dir > 0 ? this.next() : this.prev();
    }, { passive: true });

    /* —— 浏览器前进/后退（hash 变化） —— */
    window.addEventListener('hashchange', () => {
      this.#goTo(this.#indexFromHash());
    });
  }

  #resetTouch() {
    this.touchStartY = null;
    this.touchStartX = null;
    this.touchTarget = null;
  }
}
