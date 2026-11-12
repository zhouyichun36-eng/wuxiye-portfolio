/* P13 章节页 03 —— 文档第 13 页 */
import { folio, divider } from './layouts.js';

export default {
  id: 'section-03',
  title: '03 Research & Insight',

  render() {
    return `
    <div class="page layout-section-opener">
      ${folio('13', '03 / RESEARCH & INSIGHT')}
      ${divider({
        num: '03',
        en: 'RESEARCH &amp; INSIGHT',
        zh: '研究与信息洞察',
        desc: '把分散的信息，整理成可供判断的依据。',
        illus: { file: 'ill-03.webp', alt: '放大镜插画', w: 562, h: 555, cls: 'df-m' },
      })}
    </div>`;
  },
};
