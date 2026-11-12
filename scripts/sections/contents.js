/* P03 Contents —— 文档第 03 页
   左右交错的 Editorial Contents（PART 11）：无横线、无 divider、无 table。
   靠 数字 + 中文章节名 + 小英文 + 左右位置 + 垂直距离 + 留白 建立节奏。
   章节名沿用已确认文案，不改写；仅改排列方式。 */
import { folio } from './layouts.js';

export default {
  id: 'contents',
  title: 'Contents',

  render() {
    const items = [
      ['01', 'CONTENT & SOCIAL', '内容策略与平台传播'],
      ['02', 'BRAND & EXPERIENCE', '品牌传播与参与体验'],
      ['03', 'RESEARCH & INSIGHT', '研究与信息洞察'],
      ['04', 'VISUAL STORYTELLING', '视觉表达与形象设计'],
      ['05', 'PERSONAL WORKS', '个人作品'],
    ];
    const rows = items.map(([num, en, zh]) => `
        <li class="toc-entry anim-in" data-target="${num}">
          <span class="toc-num">${num}</span>
          <span class="toc-zh">${zh}</span>
          <span class="toc-en">${en}</span>
        </li>`).join('');
    return `
    <div class="page page-contents section-scroll">
      ${folio('03', 'CONTENTS')}
      <h2 class="toc-title anim-in">Contents</h2>
      <ol class="toc-stagger">${rows}</ol>
    </div>`;
  },
};
