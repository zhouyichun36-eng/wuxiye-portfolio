/* P04 章节页 01 —— 文档第 04 页 */
import { folio, divider } from './layouts.js';

export default {
  id: 'section-01',
  title: '01 Content & Social',

  render() {
    return `
    <div class="page layout-section-opener">
      ${folio('04', '01 / CONTENT & SOCIAL')}
      ${divider({
        num: '01',
        en: 'CONTENT &amp; SOCIAL',
        zh: '内容策略与平台传播',
        desc: '让好的内容，更容易被看见和理解。',
        illus: { file: 'ill-01.webp', alt: '咖啡杯插画', w: 481, h: 338, cls: 'df-l' },
      })}
    </div>`;
  },
};
