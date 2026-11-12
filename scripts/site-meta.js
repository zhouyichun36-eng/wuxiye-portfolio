/* ==========================================================================
   site-meta.js — 全站导航元数据（Header 当前页标签 + 总目录）
   --------------------------------------------------------------------------
   2026-11 重构：20 页 → 11 页（能力优先结构）。
   与 sections/index.js 的 sections 数组**按索引对齐**。
   - p     ：在 sections 中的下标（也是 Deck 的页序）
   - num   ：出版物页码（两位数）
   - zh / en：Header 当前页标签 / 目录展示
   SECTION_OPENERS：展开目录展示的条目（P02–P11 全页，封面不在目录中），
   range 用于"当前页"高亮（每页独立一项）。
   ========================================================================== */

export const SITE_META = [
  { p: 0,  num: '01', zh: '封面',                  en: 'Cover',                  group: 0 },
  { p: 1,  num: '02', zh: 'About',                 en: 'About',                  group: 0 },
  { p: 2,  num: '03', zh: 'Selected Work',         en: 'Selected Work',          group: 0 },
  { p: 3,  num: '04', zh: 'Content & Social',      en: 'Content & Social',       group: 1 },
  { p: 4,  num: '05', zh: 'Social Media',          en: 'Social Media',           group: 1 },
  { p: 5,  num: '06', zh: 'Project Operations',    en: 'Project Operations',     group: 2 },
  { p: 6,  num: '07', zh: 'Brand Campaign',        en: 'Brand Campaign',         group: 3 },
  { p: 7,  num: '08', zh: 'Research & Insight',    en: 'Research & Insight',     group: 4 },
  { p: 8,  num: '09', zh: 'Visual Communication',  en: 'Visual Communication',   group: 4 },
  { p: 9,  num: '10', zh: 'Independent Practice',  en: 'Independent Practice',   group: 5 },
  { p: 10, num: '11', zh: "Let's Connect",         en: "Let's Connect",          group: 6 },
];

/* —— 展开目录条目（P02–P11，封面除外；每项独立一页） —— */
export const SECTION_OPENERS = [
  { p: 1,  num: '02', zh: '关于',          en: 'ABOUT',                 range: [1, 1]  },
  { p: 2,  num: '03', zh: '作品地图',      en: 'SELECTED WORK',         range: [2, 2]  },
  { p: 3,  num: '04', zh: '内容与社媒',    en: 'CONTENT & SOCIAL',      range: [3, 3]  },
  { p: 4,  num: '05', zh: '社交媒体方法',  en: 'SOCIAL MEDIA',          range: [4, 4]  },
  { p: 5,  num: '06', zh: '项目运营',      en: 'PROJECT OPERATIONS',    range: [5, 5]  },
  { p: 6,  num: '07', zh: '品牌 Campaign', en: 'BRAND CAMPAIGN',        range: [6, 6]  },
  { p: 7,  num: '08', zh: '研究与洞察',    en: 'RESEARCH & INSIGHT',    range: [7, 7]  },
  { p: 8,  num: '09', zh: '视觉表达',      en: 'VISUAL COMMUNICATION',  range: [8, 8]  },
  { p: 9,  num: '10', zh: '独立实践',      en: 'INDEPENDENT PRACTICE',  range: [9, 9]  },
  { p: 10, num: '11', zh: '联系',          en: "LET'S CONNECT",         range: [10, 10] },
];

/* 旧 CHAPTERS 分组已随 20 页结构下线（2026-11 重构） */
export const CHAPTERS = [];
