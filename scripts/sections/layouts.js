/* ==========================================================================
   layouts.js — 各页共享的编辑式版式构件
   --------------------------------------------------------------------------
   这里只提供「构件」，不规定页面构图。每个 section 模块自行组合，
   保持逐页独立排版的可能。所有文案来自《吴熙晔_作品集逐页文案.docx》，
   模块内不增删、不改写。
   ========================================================================== */

/** 刊头（running header）：页码 + 章节标识，来自文档每页页眉表格。
 *    Phase 14 起由全局 Header（site-chrome.css 的 .site-header / #site-label / #site-num）
 *    统一承载页码与标签；此处不再渲染独立 .folio，返回空串以保留调用点兼容。 */
export function folio(num, label) {
  return '';
}

/**
 * 项目/篇目名：中文为主标题、英文为辅助信息（无竖线分隔）。
 * 用于 page-kicker 与 block-label 两处上下文，字号由所在上下文决定。
 */
export function nameTitle(zh, en = '') {
  return `<span class="nt-zh">${zh}</span>${en ? ` <span class="nt-en">${en}</span>` : ''}`;
}

/**
 * 视觉断句（不改写文案）：长段落在句号处拆成多个视觉段落，
 * 只改变排版节奏，不删字、不加字、不改原意。
 */
function breakSentences(bodyHTML) {
  return bodyHTML.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner) => {
    const text = inner.replace(/<[^>]+>/g, '');
    if (text.length < 46) return m;                 // 短段落保持原样
    const parts = inner.split('。').filter((s) => s.trim() !== '');
    if (parts.length < 2) return m;
    return parts
      .map((s, i) => `<p>${s}${i < parts.length - 1 ? '。' : ''}</p>`)
      .join('');
  });
}

/* ————————————————————————————————————————————
   Phase 19：全站正文小标题统一为「中文 + 小英文」
   —— key 必须与各 section 里 block('...') 的 label 完全一致；
   —— value = [中文, 英文 Title Case]；
   —— 中文在前、英文紧跟其后，英文更小更轻（样式见 sections.css 的 .bl-zh/.bl-en）。
   中文语义沿用原文，不改写；英文为辅助识别。
   ———————————————————————————————————————————— */
const LABEL_MAP = {
  'BACKGROUND':          ['背景', 'Background'],
  'ROLE':                ['角色', 'Role'],
  'ACTION':              ['行动', 'Action'],
  'TASK':                ['任务', 'Task'],
  'RESULT':              ['结果', 'Result'],
  'PROCESS':             ['过程', 'Process'],
  'FEEDBACK':            ['反馈', 'Feedback'],
  'REFLECTION':          ['反思', 'Reflection'],
  'ABOUT':               ['关于', 'About'],
  'WHAT I DO':           ['我做什么', 'What I Do'],
  'CAPABILITIES':        ['能力方向', 'Capabilities'],
  'AI-ASSISTED WORKFLOW': ['AI 协作工作流', 'AI-Assisted Workflow'],
  '2024 原创日历':        ['2024 原创日历', '2024 Original Calendar'],
  '“追感”系列':           ['“追感”系列', '“Zhuigan” Series'],
  '内容分享':             ['内容分享', 'Content Sharing'],
  '多平台分发':           ['多平台分发', 'Multi-Platform Distribution'],
  '如何运营':             ['如何运营', 'How We Operated'],
  '小红书后台数据':        ['小红书后台数据', 'Xiaohongshu Analytics'],
  '应用与传播':           ['应用与传播', 'Application & Distribution'],
  '日常社媒运营':         ['日常社媒运营', 'Daily Social Operations'],
  '校园建筑插画':         ['校园建筑插画', 'Campus Architecture Illustration'],
  '行动手帐传播':         ['行动手帐传播', 'Action Journal Campaign'],
  '西索鹅 原创角色创作':   ['西索鹅 原创角色创作', 'Sisu Goose Character Design'],
  '项目成效':             ['项目成效', 'Project Performance'],
  /* —— 2026-11 重构新增（P02–P11） —— */
  'LONG-FORM':            ['长内容', 'Long-Form'],
  'SHORT-FORM':           ['短内容', 'Short-Form'],
  'CAMPAIGN CONTENT':     ['Campaign 内容', 'Campaign Content'],
  'BEFORE EVENT':         ['活动前', 'Before Event'],
  'ON SITE':              ['现场', 'On Site'],
  'CONTENT SUPPORT':      ['内容支持', 'Content Support'],
  '毕业季':               ['毕业季', 'Graduation'],
  '开学季':               ['开学季', 'Back to School'],
  '上新 / 招新':           ['上新 / 招新', 'New & Recruiting'],
  '西索鹅｜Campus IP':     ['西索鹅', 'Campus IP'],
  'Campus Illustration':  ['校园建筑插画', 'Campus Illustration'],
  'OTHER APPLICATIONS':   ['其他应用', 'Other Applications'],
  '2024 ORIGINAL CALENDAR': ['2024 原创日历', '2024 Original Calendar'],
  'PERSONAL CONTENT':     ['个人内容', 'Personal Content'],
};

/** 文字块：小标题（中文 + 小英文）+ 正文（编辑式文字块，非卡片） */
export function block(label, bodyHTML, extraClass = '') {
  const pair = LABEL_MAP[label];
  const lbl = pair
    ? `<span class="bl-zh">${pair[0]}</span> <span class="bl-en">${pair[1]}</span>`
    : label;
  return `
    <div class="block anim-in ${extraClass}">
      <p class="block-label">${lbl}</p>
      <div class="block-body">${breakSentences(bodyHTML)}</div>
    </div>`;
}

/**
 * 图片槽：为未来真实图片预留的语义化 hook。
 * 现阶段为空 figure → CSS 隐藏，不显示任何占位框。
 * data-note 保留文档中的图片摆放建议（生产备注，不渲染为可见文字）。
 */
export function imgSlot(slot, note = '', extraClass = '') {
  return `<figure class="img-slot ${extraClass}" data-slot="${slot}" data-note="${note}"><!-- 图片槽：${note || slot} --></figure>`;
}

/**
 * fig：按 asset manifest 渲染真实图片。
 * 默认 lazy loading + 显式宽高（防布局抖动）；
 * asset.cls 携带布局词汇（iw-、place-、up-、rt-、figure--crop、figure--longform 等）；
 * asset.frame === 'phone' 时套极简 Phone Frame（仅用于手机界面截图，
 * 长图 / 海报 / 数据大图 / 项目摄影一律不套）。
 */
export function fig(asset, extraClass = '') {
  if (!asset) return '';
  const style = asset.ratio ? ` style="--ratio:${asset.ratio}"` : '';
  const img = `<img src="${asset.src}" alt="${asset.alt}" width="${asset.w}" height="${asset.h}"
           loading="lazy" decoding="async" />`;
  const inner = asset.frame === 'phone'
    ? `<div class="phone-device fit-${asset.fit || 'standard'}"><div class="phone-screen"><img src="${asset.src}"
           alt="${asset.alt}" loading="lazy" decoding="async" /></div><img class="phone-overlay"
           src="./assets/img/phone-frame.png" alt="" aria-hidden="true" /></div>`
    : img;
  return `
    <figure class="img-slot anim-in ${asset.cls} ${extraClass}" data-role="${asset.role}"${style}>
      ${inner}
    </figure>`;
}

/** 批量渲染一组图片 */
export function figs(list, extraClass = '') {
  return (list || []).map((asset) => fig(asset, extraClass)).join('');
}

/** 数据行：大数字 + 说明（出版物 statistics，非 KPI 卡片） */
export function dataRow(items) {
  const cells = items.map(([num, cap]) => `
      <div class="data-item anim-in">
        <p class="data-num">${num}</p>
        <p class="data-cap">${cap}</p>
      </div>`).join('');
  return `<div class="data-row">${cells}</div>`;
}

/** 章节过渡页：中文主标题（最大）+ 英文辅助（明显小）+ 一句说明 + 大量留白。
 *   可选 illus：章节轻插画（透明线稿），统一放在标题区下方偏右，
 *   作为第二视觉（editorial annotation），尺寸由 CSS 按视觉面积统一。 */
export function divider({ num, en, zh, desc, illus }) {
  const ill = illus
    ? `<figure class="img-slot anim-in divider-illustration ${illus.cls || ''}"
           data-role="CUTOUT" data-illus="${illus.file}">
        <img src="./assets/img/${illus.file}" alt="${illus.alt}" width="${illus.w}" height="${illus.h}"
             loading="lazy" decoding="async" />
      </figure>`
    : '';
  return `
    <div class="divider-compose">
      <p class="divider-num anim-in">${num}</p>
      <h2 class="divider-zh anim-in">${zh}</h2>
      <p class="divider-en anim-in">${en}</p>
      <p class="divider-desc anim-in">${desc}</p>
      ${ill}
    </div>`;
}

/**
 * 项目页头部：kicker（中文项目名 + 英文小字，无竖线）+ 中文主标题 + 导语
 * en 仅为说明性小字，不是第二个视觉标题。
 */
export function projectHead(kicker, title, lede, kickerEn = '') {
  const k = kickerEn
    ? `<span class="kicker-zh">${kicker}</span> <span class="kicker-en">${kickerEn}</span>`
    : kicker;
  return `
    <div class="project-head">
      <p class="page-kicker anim-in">${k}</p>
      <h2 class="project-title anim-in">${title}</h2>
      ${lede ? `<p class="project-lede anim-in">${lede}</p>` : ''}
    </div>`;
}
