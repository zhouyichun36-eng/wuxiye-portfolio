/* P10 章节页 02 —— 文档第 10 页 */
import { folio, divider } from './layouts.js';

export default {
  id: 'section-02',
  title: '02 Brand & Experience',

  render() {
    return `
    <div class="page layout-section-opener">
      ${folio('10', '02 / BRAND & EXPERIENCE')}
      ${divider({
        num: '02',
        en: 'BRAND &amp; EXPERIENCE',
        zh: '品牌传播与参与体验',
        desc: '围绕真实场景，设计品牌与用户的接触方式。',
        illus: { file: 'ill-02.webp', alt: '胶带插画', w: 426, h: 384, cls: 'df-m' },
      })}
    </div>`;
  },
};
