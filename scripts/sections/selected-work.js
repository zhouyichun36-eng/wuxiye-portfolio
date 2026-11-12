/* P03 SELECTED WORK —— 2026-11 重构
   招聘者的「作品地图」：只列 4 个能力 / 项目方向，
   通过编号大小、横向位置与大量垂直留白建立节奏（非表格、非卡片）。
   点击条目 → hash 跳转对应页面（deck 监听 hashchange）。 */
export default {
  id: 'selected-work',
  title: 'Selected Work',

  render() {
    const items = [
      {
        num: '01', en: 'CONTENT & SOCIAL',
        desc: 'BottleDream Video Podcast / Paralight——深度内容的视频化、多平台传播与旅行内容策划',
        go: 4, cls: 'wm-a',
      },
      {
        num: '02', en: 'PROJECT OPERATIONS',
        desc: '2026 瓶行宇宙社会创新节——50+ Camp 前期对接、共创推进与现场执行',
        go: 6, cls: 'wm-b',
      },
      {
        num: '03', en: 'BRAND CAMPAIGN',
        desc: 'Campus Café——围绕校园生活节点持续运营一个线下品牌',
        go: 7, cls: 'wm-c',
      },
      {
        num: '04', en: 'RESEARCH & VISUAL',
        desc: 'Desk Research / Visual Practice——把分散信息整理成策划依据，也把想法直接做到成品',
        go: 8, cls: 'wm-d',
      },
    ];
    const rows = items.map((m) => `
      <a class="work-map-item anim-in ${m.cls}" href="#/${m.go}" data-go="${m.go}">
        <span class="wm-num">${m.num}</span>
        <span class="wm-en">${m.en}</span>
        <span class="wm-desc">${m.desc}</span>
      </a>`).join('');
    return `
    <div class="page page-selected-work section-scroll">
      <h2 class="toc-title anim-in">Selected Work</h2>
      <div class="work-map">${rows}</div>
    </div>`;
  },
};
