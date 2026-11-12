/* P08 平行光 Paralight —— 文档第 08 页
   PART 13：先出现第一段文字（BACKGROUND）→ 再出现对应图片（hero），
   不机械执行「图片必须先出现」。之后按叙事穿插 TASK / ACTION / RESULT。 */
import { folio, block, fig, figs, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'paralight',
  title: '平行光 Paralight',

  render() {
    const p = A['paralight'];
    return `
    <div class="page page-project layout-project-intro section-scroll">
      ${folio('08', 'CONTENT & SOCIAL')}
      ${projectHead(
        '平行光',
        '从供应商原始素材，到具有用户身份与情绪入口的旅行招募内容。',
        '',
        'Paralight',
      )}
      <div class="blocks">
        ${block('BACKGROUND', `<p>BottleDream 孵化旅行平台 平行光Paralight。</p><p>早期目的地素材主要来自当地供应商，信息较平、缺少统一传播入口。</p>`, 'e-w-wide')}
      </div>
      ${fig(p.hero)}
      <div class="blocks">
        ${block('TASK', `<p>独立负责节日旅行招募内容的选题、文案撰写、配图与页面视觉。</p>`, 'e-w-mid e-x-right e-lb-row')}
      </div>
      ${fig(p.supporting[0])}
      <div class="blocks">
        ${block('ACTION', `<p>观察小红书与公众号同类旅行内容，从 MBTI、“浓人淡人”等当时热门社交话题切入；重新提炼不同目的地的体验、节奏与情绪价值，把供应商信息转化为用户能代入的旅行选择。</p>`, 'e-w-wide e-x-in1')}
      </div>
      ${fig(p.supporting[1])}
      <div class="blocks">
        ${block('RESULT', `<p>完成多篇公众号及小红书招募内容，获得稳定点赞、转发，并带来实际旅行咨询与报名意向。</p>`, 'e-w-narrow e-x-in2')}
      </div>
    </div>`;
  },
};
