/* P04 CONTENT & SOCIAL —— 2026-11 重构
   只证明一件事：内容策划能力（内容从哪里进入用户）。
   A. BottleDream Video Podcast：平台截图 + 封面/标题文案 + 数据；
   B. Paralight：MBTI / 浓人淡人两组真实内容。
   不展开完整 Case Study，文案来自《搭配文案.pdf》。 */
import { fig, projectHead, dataRow, nameTitle } from './layouts.js';
import { portfolioAssets as A } from '../data/portfolio-assets.js';

export default {
  id: 'content-social',
  title: 'Content & Social',

  render() {
    const p = A['content-social'];
    return `
    <div class="page page-project layout-editorial-collage section-scroll">
      ${projectHead(
        '内容与社媒',
        '内容从哪里进入用户？',
        '',
        'CONTENT & SOCIAL',
      )}

      <div class="case-block">
        <p class="case-title anim-in">${nameTitle('BottleDream Video Podcast')}</p>
        <p class="case-one anim-in">参与了视频播客从制作到上线传播的完整流程。</p>
      </div>
      ${fig(p.podcastXhs)}
      ${fig(p.podcastChannel)}
      <div class="case-focus anim-in">
        <p>封面负责建立快速的话题入口，标题再把真正想讨论的内容补充完整。</p>
        <p class="focus-quote">当女性和文科生重新饲养 AI</p>
        <p class="focus-title">《共情成为新的产品力：这些事正在悄悄改变》</p>
      </div>
      ${fig(p.aiPost)}
      ${dataRow([
        ['712', '小红书点赞'],
        ['96', '收藏'],
        ['863', '视频号点赞'],
        ['195', '转发'],
      ])}

      <div class="case-block case-b">
        <p class="case-title anim-in">${nameTitle('Paralight')}</p>
        <p class="case-one anim-in">独立负责节日旅行招募内容的选题、文案、配图与页面视觉。</p>
        <p class="case-sub anim-in">没有继续堆叠目的地信息，而是从 MBTI、“浓人淡人”等用户熟悉的话题重新整理旅行体验。</p>
      </div>
      ${fig(p.mbtiDetail)}
      ${fig(p.mbtiPost)}
      ${fig(p.nongdanPost)}
      <p class="case-result anim-in">相关内容带来实际旅行咨询与报名意向。</p>
    </div>`;
  },
};
