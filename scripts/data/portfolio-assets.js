/* ==========================================================================
   portfolio-assets.js — 全站图片资产清单（唯一 source of truth）
   --------------------------------------------------------------------------
   2026-11 重构：按 11 页新结构重新组织。
   更换图片只需改这里，不需要动页面结构。
   role: HERO 主视觉 / SUPPORTING 辅助 / DETAIL 细节 / DATA 数据证据 /
         CUTOUT 抠图散落 / DOCUMENTARY 现场记录 / EVIDENCE 作品证据 /
         COVERAGE 外部报道
   frame: PHONE → 全站唯一标准手机框（不滥用：每页至多 1–2 个，
          与裸图 / 局部 / 长图混合使用）
   原始素材：作品照片_副本.zip（含 瓶行宇宙社会创新节）+ 校园建筑.zip
   ========================================================================== */

const IMG = './assets/img/';
/* a(file, w, h, role, alt, cls, ratio, frame, fit)
   frame: PHONE → 标准手机框；fit: 'standard'|'tall'|'long'（默认 standard），
   默认为 contain 完整显示；不要把截图盲目铺满、不要出现裁切。 */
const a = (file, w, h, role, alt, cls = '', ratio = null, frame = null, fit = 'standard') =>
  ({ src: IMG + file, w, h, role, alt, cls, ratio, frame, fit });
const PHONE = 'phone';  // 标准手机框：仅用于手机界面截图（长图/海报/数据大图不套）

export const portfolioAssets = {
  /* P02 About —— 人物抠图靠左占一侧，文字在另一侧大留白 */
  'about': {
    hero: a('p02-portrait.webp', 1200, 1425, 'CUTOUT', '个人照片（抠图）', 'iw-28'),
  },

  /* P04 Content & Social —— BottleDream 播客（平台证据）+ Paralight（两组话题内容）
     手机框只保留播客主帖一个，其余裸图 */
  'content-social': {
    podcastXhs:     a('p05-post-xhs.jpg', 1179, 2556, 'EVIDENCE', '视频播客小红书发布页', 'iw-30', null, PHONE),
    podcastChannel: a('p05-post-channel.jpg', 1179, 2556, 'EVIDENCE', '视频播客视频号发布页', 'iw-30 place-r up-1', null, PHONE),
    aiPost:         a('p06-post-ai.jpg', 589, 1073, 'EVIDENCE', '小红书发布帖：当女性和文科生重新饲养AI', 'iw-30'),
    mbtiDetail:     a('p08-mbti-detail.jpg', 1179, 2556, 'EVIDENCE', '《根据你的 MBTI，我们为你匹配好了跨年地》内容', 'iw-30', null, PHONE),
    mbtiPost:       a('p08-mbti-post.jpg', 1179, 969, 'EVIDENCE', 'MBTI 跨年地小红书发布帖', 'iw-50 place-r up-1'),
    nongdanPost:    a('p08-nongdan-post.jpg', 1179, 943, 'EVIDENCE', '《浓人淡人都去哪玩》小红书发布帖', 'iw-60'),
  },

  /* P05 Social Media —— 内容形式拼贴：完整视频 / 短切片 / Campaign / AI 流程注释 */
  'social-media': {
    longform:  a('p05-notes.jpg', 1179, 2556, 'EVIDENCE', '播客 Shownotes 与发布文案', 'iw-30', null, PHONE),
    clip1:     a('p07-clip-1.jpg', 594, 1060, 'EVIDENCE', '短切片帖（表现较好）', 'iw-30 up-1'),
    clip2:     a('p07-clip-2.jpg', 595, 1084, 'EVIDENCE', '短切片帖（对照）', 'iw-30 place-r'),
    campaign:  a('p09-zine-post.jpg', 1179, 2556, 'EVIDENCE', '行动手账小红书宣发帖', 'iw-30', null, PHONE),
    zineOpen:  a('p09-zine-open.webp', 1400, 1027, 'CUTOUT', '《Do Something》行动手账摊开（抠图）', 'iw-50'),
  },

  /* P06 Project Operations —— 2026 瓶行宇宙社会创新节
     纪实大图为主锚点；外部报道以 publication clipping 呈现 */
  'festival': {
    hero:     a('p06-camp-hero.jpg', 1920, 1280, 'DOCUMENTARY', '瓶行宇宙社会创新节 Camp 区帐篷连续排列的现场', 'iw-70'),
    interior: a('p06-camp-interior.jpg', 1920, 1280, 'DOCUMENTARY', '单个 Camp 帐篷内部：留言网与对谈', 'iw-40'),
    fight:    a('p06-camp-fight.jpg', 1920, 1280, 'DOCUMENTARY', '参与者拿着充气道具互动的现场', 'iw-40 place-r up-1'),
    rain:     a('p06-camp-rain.jpg', 1616, 1080, 'DOCUMENTARY', '降雨当天，穿雨衣围坐的 Camp 现场', 'iw-30'),
    coverageClip: a('p06-wyn-clip.jpg', 1428, 849, 'COVERAGE', '我要WhatYouNeed 报道《体验了一场可以「打架」的活动，喜欢。》', 'iw-40'),
    coverageFull: a('p06-wyn-full.jpg', 1428, 2021, 'COVERAGE', '我要WhatYouNeed 报道全文', ''),
  },

  /* P07 Brand Campaign —— Campus Café：一张主图 + 不同尺寸物料 + 门店纪实 */
  'brand-campaign': {
    hero:      a('p12-photocard.jpg', 1600, 1176, 'HERO', '透明拍照卡使用场景（开学季）', 'iw-50'),
    stand:     a('p11-cafe-stand.jpg', 1400, 1867, 'DOCUMENTARY', '图文咖吧门店海报架现场', 'iw-30 place-r up-1'),
    posterWinter: a('p12-poster-winter.jpg', 1433, 1828, 'SUPPORTING', '冬季恋歌特饮海报', 'iw-30'),
    posterAutumn: a('p12-poster-autumn.jpg', 1242, 1660, 'SUPPORTING', '图咖上新秋日特辑海报', 'iw-30 place-r rt-1'),
  },

  /* P08 Research & Insight —— 真实资料库截图为页面最大视觉 */
  'research-insight': {
    hero: a('p14-archive.jpg', 2000, 1236, 'EVIDENCE', '社会创新案例资料库（约 80 个案例表格）', 'img-slot--full'),
  },

  /* P09 Visual Communication —— 西索鹅 + 校园建筑 specimen + 官方发布证据 */
  'visual-communication': {
    stickers: a('p16-stickers-1.jpg', 1170, 2532, 'EVIDENCE', '西索鹅SISUer 微信表情页面', 'iw-30', null, PHONE),
    official: a('p16-official.jpg', 1170, 2532, 'EVIDENCE', '学校官方小红书发布', 'iw-30 place-r up-1'),
    swan:     a('p12-swan.png', 1004, 638, 'CUTOUT', 'SISU CAFE 天鹅插画', 'iw-30 rt--1'),
    buildings: [
      a('p16-b-tsg.webp', 700, 486, 'CUTOUT', '校园建筑插画：图书馆', 'sc-lg'),
      a('p16-b-e2.webp', 700, 486, 'CUTOUT', '校园建筑插画：二教', 'sc-md'),
      a('p16-b-s3.webp', 700, 486, 'CUTOUT', '校园建筑插画：三教', 'sc-sm'),
      a('p16-b-s4.webp', 700, 486, 'CUTOUT', '校园建筑插画：四教', 'sc-md sc-d1'),
      a('p16-b-w5.webp', 700, 486, 'CUTOUT', '校园建筑插画：五教', 'sc-sm'),
      a('p16-b-l6.webp', 700, 534, 'CUTOUT', '校园建筑插画：六教', 'sc-md sc-d2'),
      a('p16-b-q7.webp', 700, 486, 'CUTOUT', '校园建筑插画：七教', 'sc-sm sc-d1'),
      a('p16-b-b8.webp', 700, 486, 'CUTOUT', '校园建筑插画：八教', 'sc-sm'),
      a('p16-b-y1.webp', 700, 486, 'CUTOUT', '校园建筑插画：一教', 'sc-md sc-d2'),
      a('p16-b-za.webp', 700, 486, 'CUTOUT', '校园建筑插画：中阿大楼', 'sc-sm'),
      a('p16-b-gb.webp', 700, 486, 'CUTOUT', '校园建筑插画：国别区域楼', 'sc-sm sc-d1'),
      a('p16-b-sh.webp', 700, 486, 'CUTOUT', '校园建筑插画：师生活动中心', 'sc-md'),
      a('p16-b-xz.webp', 700, 486, 'CUTOUT', '校园建筑插画：行政楼', 'sc-sm'),
      a('p16-b-yb.webp', 700, 486, 'CUTOUT', '校园建筑插画：语言博物馆', 'sc-md sc-d1'),
    ],
  },

  /* P10 Independent Practice —— 产品 specimen：日历 / 追感 / 个人内容 */
  'independent-practice': {
    flatlay:      a('p18-flatlay.jpg', 1600, 2400, 'HERO', '手机壳与贴纸产品摆拍', 'iw-34'),
    totebag:      a('p18-totebag.jpg', 1400, 2100, 'SUPPORTING', '「追感」帆布包', 'iw-30'),
    zhuigan:      a('p18-zhuigan.jpg', 1400, 1826, 'SUPPORTING', '「追感」系列插画', 'iw-40 place-r up-1'),
    calendarPost: a('p18-calendar-post.jpg', 1169, 2278, 'EVIDENCE', '原创日历小红书宣发帖（2025 实用日历）', 'iw-30', null, PHONE),
    viralPost:    a('p19-viral-post.jpg', 575, 1079, 'EVIDENCE', '个人小红书高互动内容', 'iw-30 place-r up-1'),
  },

  /* P11 Contact —— 结尾人物抠图 + 大留白 */
  'contact': {
    portrait: a('p20-contact.webp', 410, 1005, 'CUTOUT', '结尾人物（抠图）', 'iw-28'),
  },
};
