/* ==========================================================================
   paper-drift.js — P1 封面交互：纸面微漂移
   --------------------------------------------------------------------------
   感觉：纸面上的作品受到手指 / 鼠标靠近的轻微影响，
        产生极小幅度的位移与旋转，像纸片被轻轻碰到。

   Desktop：鼠标靠近元素时，元素被“推开”极小的距离（<= 10px，<= 0.8deg），
            鼠标离开后缓缓归位（rAF lerp，无僵硬回弹）。
   Mobile： 不依赖 hover。手指触碰图片轻拖时产生极轻位移（横向为主），
            松手后弹簧归位。纵向 swipe 仍然正常翻页——
            本模块不 preventDefault、不加 data-deck-lock，不劫持任何手势。

   用法：给需要的元素加 class="drift"，可用 data-drift="0.5" 调整强度。
   关闭方式：把 section mount 里的 paperDrift(el) 移除即可，无副作用。
   ========================================================================== */

const RADIUS = 260;        // 鼠标影响半径 (px)
const MAX_SHIFT = 10;      // 最大位移 (px)
const MAX_ROT = 0.8;       // 最大旋转 (deg)
const LERP = 0.075;        // 缓动系数（小 = 更柔）
const TOUCH_X = 0.12;      // 触屏横向跟随系数
const TOUCH_Y = 0.05;      // 触屏纵向跟随系数（弱化，让位给翻页手势）

export function paperDrift(root) {
  const els = Array.from(root.querySelectorAll('.drift'));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!els.length || reduced) return () => {};

  const isTouch = window.matchMedia('(hover: none)').matches;
  const cleanup = isTouch ? bindTouch(els) : bindMouse(root, els);

  return () => {
    cleanup();
    els.forEach((el) => {
      el.style.transform = '';
      el.style.transition = '';
      el.style.willChange = '';
    });
  };
}

/* —— Desktop：鼠标接近时的轻微避让 —— */
function bindMouse(root, els) {
  const items = els.map((el) => ({
    el,
    k: parseFloat(el.dataset.drift) || 1,
    tx: 0, ty: 0, rot: 0,     // 目标值
    cx: 0, cy: 0, crot: 0,    // 当前值
  }));

  let raf = null;
  let running = false;

  function tick() {
    let settled = true;
    for (const it of items) {
      it.cx += (it.tx - it.cx) * LERP;
      it.cy += (it.ty - it.cy) * LERP;
      it.crot += (it.rot - it.crot) * LERP;
      if (Math.abs(it.tx - it.cx) > 0.02 ||
          Math.abs(it.ty - it.cy) > 0.02 ||
          Math.abs(it.rot - it.crot) > 0.005) settled = false;
      it.el.style.transform =
        `translate(${it.cx.toFixed(2)}px, ${it.cy.toFixed(2)}px) rotate(${it.crot.toFixed(3)}deg)`;
    }
    if (settled) { running = false; raf = null; return; }
    raf = requestAnimationFrame(tick);
  }

  function wake() {
    if (!running) { running = true; raf = requestAnimationFrame(tick); }
  }

  function onMove(e) {
    for (const it of items) {
      const r = it.el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < RADIUS && dist > 0.001) {
        const f = (1 - dist / RADIUS) * it.k;
        // 朝远离鼠标的方向轻推，像纸片被指尖靠近时推开
        it.tx = -(dx / dist) * f * MAX_SHIFT;
        it.ty = -(dy / dist) * f * MAX_SHIFT;
        it.rot = it.tx * (MAX_ROT / MAX_SHIFT) * 0.9;
      } else {
        it.tx = 0; it.ty = 0; it.rot = 0;
      }
    }
    wake();
  }

  function onLeave() {
    items.forEach((it) => { it.tx = 0; it.ty = 0; it.rot = 0; });
    wake();
  }

  // drift 由 rAF 直接驱动，需要关闭 CSS transition 避免双重缓动；
  // 但入场 reveal 动画（约 600ms）也走 transition，等它结束后再关闭
  els.forEach((el) => { el.style.willChange = 'transform'; });
  const transitionTimer = setTimeout(() => {
    els.forEach((el) => { el.style.transition = 'none'; });
  }, 700);

  root.addEventListener('mousemove', onMove, { passive: true });
  root.addEventListener('mouseleave', onLeave, { passive: true });

  return () => {
    root.removeEventListener('mousemove', onMove);
    root.removeEventListener('mouseleave', onLeave);
    clearTimeout(transitionTimer);
    if (raf) cancelAnimationFrame(raf);
  };
}

/* —— Mobile：触碰轻拖的极轻反馈，松手归位 —— */
function bindTouch(els) {
  const removers = els.map((el) => {
    const k = parseFloat(el.dataset.drift) || 1;
    let sx = 0, sy = 0, active = false;

    el.style.willChange = 'transform';

    function onStart(e) {
      active = true;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      el.style.transition = 'none';
    }
    function onMove(e) {
      if (!active) return;
      const dx = e.touches[0].clientX - sx;
      const dy = e.touches[0].clientY - sy;
      const tx = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, dx * TOUCH_X * k));
      const ty = Math.max(-4, Math.min(4, dy * TOUCH_Y * k));
      const rot = tx * (MAX_ROT / MAX_SHIFT) * 0.9;
      el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${rot.toFixed(3)}deg)`;
    }
    function onEnd() {
      if (!active) return;
      active = false;
      el.style.transition = 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = '';
    }

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
    el.addEventListener('touchcancel', onEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchcancel', onEnd);
    };
  });

  return () => removers.forEach((fn) => fn());
}
