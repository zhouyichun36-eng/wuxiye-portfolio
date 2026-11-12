/* P17 章节页 05 —— 文档第 17 页
   章节名统一为 PERSONAL WORKS / 个人作品（文档页眉曾写作
   INDEPENDENT PRACTICE，已按用户最终要求统一，不再出现）。 */
import { folio, divider } from './layouts.js';

export default {
  id: 'section-05',
  title: '05 Personal Works',

  render() {
    return `
    <div class="page layout-section-opener">
      ${folio('17', '05 / PERSONAL WORKS')}
      ${divider({
        num: '05',
        en: 'PERSONAL WORKS',
        zh: '个人作品',
        desc: '记录日常观察，也呈现我长期形成的个人审美与创作习惯。',
        illus: { file: 'ill-05.webp', alt: '手账本插画', w: 466, h: 587, cls: 'df-t' },
      })}
    </div>`;
  },
};
