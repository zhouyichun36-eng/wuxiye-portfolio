/* P06 PROJECT OPERATIONS —— 2026 瓶行宇宙社会创新节（2026-11 新增）
   一页证明：多方协同 / 项目推进 / 现场执行 / 临场应变 / 内容支持。
   纪实大图为主锚点；WhatYouNeed 报道以 publication clipping 呈现，
   点击可放大查看全文（不默认铺开、不包装成权威背书）。 */
import { fig, block, projectHead, dataRow } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';

export default {
  id: 'festival',
  title: 'Project Operations',

  render() {
    const p = A['festival'];
    return `
    <div class="page page-project layout-editorial-collage section-scroll">
      ${projectHead(
        '项目运营',
        '50+「Camp」，同时推进',
        '活动筹备期间，负责持续对接 50+ Camp。不同 Camper 带来的活动形式、准备进度和现场需求都不一样，因此前期工作不是一次统一通知，而是同时推进多条任务线。',
        '2026 瓶行宇宙社会创新节',
      )}
      ${fig(p.hero)}
      <div class="blocks">
        ${block('BEFORE EVENT', `<p class="flow-line">首次线上沟通 <span class="flow-arrow">→</span> 共创方案讨论 <span class="flow-arrow">→</span> 需求与信息确认 <span class="flow-arrow">→</span> 活动更新同步 <span class="flow-arrow">→</span> 临场确认</p>`, 'e-w-wide')}
        ${block('ON SITE', `<p>活动期间负责 Camp 区执行协调：Camper 入场 / 现场需求 / 志愿者沟通 / 信息同步 / 突发问题处理。</p>`, 'e-w-mid e-x-right')}
      </div>
      ${fig(p.interior)}
      ${fig(p.fight)}
      <figure class="img-slot clip anim-in ${p.coverageClip.cls}" data-role="COVERAGE"
              data-coverage tabindex="0" role="button"
              aria-label="查看报道全文：我要WhatYouNeed《体验了一场可以「打架」的活动，喜欢。》">
        <img src="${p.coverageClip.src}" alt="${p.coverageClip.alt}"
             width="${p.coverageClip.w}" height="${p.coverageClip.h}" loading="lazy" decoding="async" />
        <figcaption class="clip-cap">
          <span class="clip-kicker">SELECTED COVERAGE</span><br />
          我要WhatYouNeed《体验了一场可以「打架」的活动，喜欢。》2026.10.29
        </figcaption>
      </figure>
      <div class="blocks">
        ${block('CONTENT SUPPORT', `<p>同时参与活动宣发视频的策划与拍摄。</p>`, 'e-w-mid')}
      </div>
      ${dataRow([['10K+', '宣发浏览（微信视频号 + 小红书）']])}
      <div class="rain-note">
        ${fig(p.rain)}
        <p class="anno anim-in rain-anno">临近活动时天气预报发生明显变化，团队紧急完善雨天方案，并重新同步 Camp 区相关执行信息；活动第一天实际出现降雨，现场仍按照调整后的方案推进。</p>
      </div>
      <p class="case-result anim-in">当计划变化时，关键是让信息及时到达正确的人，并让现场继续运行。</p>
    </div>`;
  },

  /* 点击 clipping → 全屏查看报道全文；Esc / 点击任意处关闭。
     打开期间锁定 deck 翻页（复用 is-contents-open 锁）。 */
  mount(el) {
    const trigger = el.querySelector('[data-coverage]');
    if (!trigger) return null;
    const full = A['festival'].coverageFull;
    const overlay = document.createElement('div');
    overlay.className = 'coverage-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', '我要WhatYouNeed 报道全文');
    overlay.innerHTML = `
      <button class="cov-close" type="button" aria-label="关闭">×</button>
      <img src="${full.src}" alt="${full.alt}" decoding="async" />`;

    const open = () => {
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('is-open'));
      document.body.classList.add('is-contents-open');
    };
    const close = () => {
      if (!overlay.isConnected) return;
      overlay.classList.remove('is-open');
      document.body.classList.remove('is-contents-open');
      window.setTimeout(() => overlay.remove(), 260);
    };
    const onDocKey = (e) => { if (e.key === 'Escape') close(); };
    const onTrigKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    };

    trigger.addEventListener('click', open);
    trigger.addEventListener('keydown', onTrigKey);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', onDocKey);

    return () => {
      trigger.removeEventListener('click', open);
      trigger.removeEventListener('keydown', onTrigKey);
      document.removeEventListener('keydown', onDocKey);
      document.body.classList.remove('is-contents-open');
      overlay.remove();
    };
  },
};
