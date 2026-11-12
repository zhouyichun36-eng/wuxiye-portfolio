/* P15 章节页 04 —— 文档第 15 页 */
import { folio, divider } from './layouts.js';

export default {
  id: 'section-04',
  title: '04 Visual Storytelling',

  render() {
    return `
    <div class="page layout-section-opener">
      ${folio('15', '04 / VISUAL STORYTELLING')}
      ${divider({
        num: '04',
        en: 'VISUAL STORYTELLING',
        zh: '视觉表达与形象设计',
        desc: '让原创视觉进入真实的传播场景。',
        illus: { file: 'ill-04.webp', alt: '铅笔插画', w: 350, h: 561, cls: 'df-t' },
      })}
    </div>`;
  },
};
