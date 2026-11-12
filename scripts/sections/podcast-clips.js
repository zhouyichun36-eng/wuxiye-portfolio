/* P07 长内容如何继续生长 —— 文档第 07 页
   PART 12：PROCESS → 指定正文 → 第一张图（文字先于图片，作为完整 editorial sequence）
   ↓ 之后重排：AI 工作流 → 第二张切片 → FEEDBACK / REFLECTION */
import { folio, block, fig, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'podcast-clips',
  title: '长内容如何继续生长',

  render() {
    const p = A['podcast-clips'];
    return `
    <div class="page page-project layout-project-intro section-scroll">
      ${folio('07', 'CONTENT & SOCIAL')}
      ${projectHead(
        '长内容如何继续生长',
        '把一次长视频制作继续转化为可管理的内容资产。',
      )}
      <div class="blocks">
        ${block('PROCESS', `<p>视频播客上线约 3–4 天后，根据初步表现决定后续切片投入。</p>`, 'e-w-mid')}
      </div>
      ${fig(p.supporting[0])}
      <div class="blocks">
        ${block('AI-ASSISTED WORKFLOW', `<p>与 AI 协作筛选长视频中的候选高光，形成约 5–6 条切片清单；再根据议题价值、传播潜力与内容密度进行人工排序。</p>`, 'e-w-mid e-x-in1 e-lb-row')}
      </div>
      ${fig(p.supporting[1])}
      <div class="blocks">
        ${block('FEEDBACK', `<p>首批发布后继续观察数据，再决定是否继续发布第二、第三条，避免对表现较弱的内容持续投入。</p>`, 'e-w-wide')}
        ${block('REFLECTION', `<p>一次同期切片对照让我更明确：相比抽象概念，具体身份、现实处境与更低的理解门槛，更容易成为用户进入观点型内容的入口。</p>`, 'e-w-wide e-x-in2')}
      </div>
    </div>`;
  },
};
