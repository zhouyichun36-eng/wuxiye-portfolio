/* P05 SOCIAL MEDIA —— 2026-11 重构
   不讲单一项目，讲「怎样理解社交媒体内容」：
   长内容 / 短内容 / Campaign 内容 / AI 工作流，以内容拼贴呈现。
   AI 只是工作方法之一（annotation），不做最大标题。 */
import { fig, block, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';

export default {
  id: 'social-media',
  title: 'Social Media',

  render() {
    const p = A['social-media'];
    return `
    <div class="page page-project layout-editorial-collage section-scroll">
      ${projectHead(
        '社交媒体',
        '同一份内容，不一定只有一种发布方式',
        '过去的内容实践，覆盖了小红书、微信视频号与公众号，也包括完整视频、短切片、招募内容、产品宣发和个人内容。',
        'SOCIAL MEDIA',
      )}
      <div class="blocks">
        ${block('LONG-FORM', `<p>视频播客——议题内容 / 人物表达 / 完整上下文。</p>`, 'e-w-mid')}
      </div>
      ${fig(p.longform)}
      <div class="blocks">
        ${block('SHORT-FORM', `<p>根据长内容重新提炼：开头 / 人物身份 / 现实处境 / 核心观点；首批发布后再根据数据决定后续投入，而不是一次性把所有切片全部做完。</p>`, 'e-w-mid e-x-right')}
      </div>
      ${fig(p.clip1)}
      ${fig(p.clip2)}
      <div class="blocks">
        ${block('CAMPAIGN CONTENT', `<p>活动招募 / 旅行产品 / 行动手账 / 项目宣发——根据不同目标调整信息入口和表达形式。</p>`, 'e-w-wide')}
      </div>
      ${fig(p.zineOpen)}
      ${fig(p.campaign)}
      <p class="anno anim-in ai-anno">AI-ASSISTED WORKFLOW——在长视频切片中使用 AI 辅助初筛内容，再根据议题价值、内容完整度和传播潜力进行人工判断；AI 主要负责提高处理效率，最终的内容选择仍然由人完成。</p>
    </div>`;
  },
};
