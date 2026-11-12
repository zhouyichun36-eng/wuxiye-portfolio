/* P05 BottleDream Video Podcast —— 文档第 05 页（核心案例）
   图文咬合：主手机(左) → BACKGROUND(宽,左) → 视频号手机(右) → ROLE(中右) → ACTION(宽,左) → Shownotes 手机(左) */
import { folio, block, fig, figs, projectHead } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';


export default {
  id: 'bottledream-podcast',
  title: 'BottleDream Video Podcast',

  render() {
    const p = A['bottledream-podcast'];
    return `
    <div class="page page-project layout-project-intro section-scroll">
      ${folio('05', 'CONTENT & SOCIAL')}
      ${projectHead(
        '视频播客项目',
        '将原有音频播客转向视频化，让深度内容进入更多平台。',
        '',
        'BottleDream Video Podcast',
      )}
      ${fig(p.hero)}
      <div class="blocks">
        ${block('BACKGROUND', `<p>BottleDream 作为一家社会共益企业，长期关注社会议题，并通过播客进行深度讨论。</p><p>随着内容消费进一步视频化，团队开始尝试视频播客，希望保留原有内容深度，同时适配小红书、视频号、B站等平台，扩大内容的触达与复用。</p>`, 'e-w-wide')}
      </div>
      ${fig(p.supporting[0])}
      <div class="blocks">
        ${block('ROLE', `<p>作为内容制作与传播执行成员，参与视频播客从录制、后期制作到传播包装、上线分发的完整流程。</p>`, 'e-w-mid e-x-right')}
        ${block('ACTION', `<p>负责粗剪、精剪、字幕、Shownotes 与画面节奏调整，并参与封面文字、平台标题与发布文案。</p><p>制作过程中重点考虑视频平台的观看习惯，在增强传播性的同时，保持原有议题深度与内容调性。</p><p>参与录制现场协助；依据修订后的文字稿完成粗剪，并负责精剪、字幕校对、Shownotes、画面节奏调整；同时参与封面文字、平台标题与发布文案，并在上线后制作短切片。</p>`, 'e-w-wide e-x-in1')}
      </div>
      ${fig(p.supporting[1])}
    </div>`;
  },
};
