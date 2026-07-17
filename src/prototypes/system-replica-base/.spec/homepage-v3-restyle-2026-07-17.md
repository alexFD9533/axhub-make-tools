# V3 首页视觉美化决策快照（2026-07-17）

## 背景与来源

- 目标页面：`src/prototypes/system-replica-base/pages/ShuanHomeCommandV3.tsx`（路由 `shuan-home-command-v3`，"蜀安首页方案A V3"）。
- 设计来源：`src/resources/homepage-redesign-v1.png`（2048×1152，深海军蓝玻璃拟态驾驶舱风格）。
- 任务边界：只改视觉样式，不改内容框架、DOM 结构与交互逻辑（下钻覆盖层、方案切换器、annotation 标注系统、地图搜索定位等均不动）。

## 改动文件

| 文件 | 改动 |
|------|------|
| `src/prototypes/system-replica-base/style.css` | ① 末尾追加 "V3 homepage restyle 2026-07-17" 样式块（约 250 行，71 条规则）；② 原线框样式块注释标记为"视觉层已被末尾新块取代"（保留其布局栅格规则继续生效） |
| `src/prototypes/system-replica-base/.spec/homepage-v3-restyle-2026-07-17.md` | 本快照（新建） |

未改动任何 `.tsx`、运行时文件（`react-shim.js` / `vite.config.ts` / `vite-plugins/`）或其他原型。

## 样式作用域策略

- 全部新规则限定在四联类作用域 `.shuan-concept.shuan-command.shuan-command-v2.shuan-command-v3`（即 V3 首页根节点）内，特异性（4 个类）高于既有共享规则与 v2/v3 旧规则，且追加在文件末尾，天然覆盖旧视觉属性。
- 旧线框块（约 35339–35435 行）保留布局相关规则（grid 栅格、高度、定位），视觉属性（边框、背景、颜色）被新块覆盖，互不冲突。
- 不污染 `shuan-command`、`shuan-command-v2` 页面及下钻页面样式。

## 主要设计 token

- 背景：深海军蓝 `#0A1830` 系渐变 + 青蓝径向渐变点缀。
- 面板：玻璃拟态 = 半透明深色渐变底 + `rgba(74,168,255,.34)` 1px 发光描边 + 10px 圆角 + 内高光/外投影。
- 强调色：青 `#5FE3FF` / 蓝 `#2F9DFF`；关键数字 `#8FE6ff` 30px 加粗 + 青色光晕；预警总数等待办数字用琥珀 `#FFD071` 光晕。
- 预警色统一：红 `#FF5D5D` / 橙 `#FF9E3D` / 黄 `#FFD94D` / 蓝 `#3FA9FF`，贯穿地图图例 chips 与"红9/橙22/黄47/蓝40"分级格（nth-child 着色，无需改 DOM）。
- 交互反馈统一 hover：描边提亮 + 微浮起 `translateY(-1px)` + 青色光晕。

## 验收结果

1. 编码核验：追加块重新读取无乱码，全文 U+FFFD 替换符 0 处；`git diff --check` 仅存量 LF→CRLF 提示，无新增问题。
2. 类型检查：`tsc --noEmit -p tsconfig.typecheck.json` 有报错，但全部位于 `src/themes/*`、`vite-plugins/clientPreviewPlugin.ts` 等存量文件（缺 `@types/react` 声明等历史问题），与本次 CSS-only 改动无关。
3. 单入口构建：`ENTRY_KEY='prototypes/system-replica-base' vite build` 通过（14.12s）。
4. 预览验证：复用已运行的 dev server（`http://localhost:51721`，projectRoot 指向本项目）：
   - `GET /prototypes/system-replica-base/` → 200，无 vite-error-overlay / Transform failed；
   - `GET /prototypes/system-replica-base/style.css` → 200，已包含 "V3 homepage restyle 2026-07-17" 新块（HMR/服务正常）。
   - 直连入口：`http://localhost:51721/prototypes/system-replica-base/#page=shuan-home-command-v3`。

## 残留风险

- 本机无 playwright/puppeteer，未做浏览器截图级视觉回归；建议人工打开上述直连入口对照 `homepage-redesign-v1.png` 复核玻璃描边、数字光晕与分级配色。
- style.css 存在历史乱码选择器（约 33986–33994 行 `.personnel-table .tag-*`）与乱码注释（如 10196 行附近），构建有对应 CSS 警告，属存量问题，本次未修复；后续可单独做编码清理。
- `scripts/check-app-ready.mjs` 在当前 Git Bash 环境因 `spawn EINVAL`（npm 不在 PATH）无法自启 dev server，本次以既有 dev server + curl + 单入口构建替代验证。

---

## 返工记录（2026-07-17 round 2：内容结构重建 + 等宽三列）

首轮验收不通过的两点问题与处理：

### 问题 1：内容结构未按效果图组织 → 已重写 `ShuanHomeCommandV3.tsx` 的 `FiveZoneHomeWireframe`

- **左列（4 个面板）**：煤矿基础信息（174 处大数字 + 纯 CSS conic-gradient 环形图：正常生产 21家/正常建设 5家/停产停建 34家/长期关停 0家，中心 60，右侧图例）；从业人员情况（12345 总从业人员 / 12345 当前井下人员双大数字块）；生产情况（2134万吨 年度产煤 / 12345 当前井下人员）；数据汇聚情况（复用 `dataCatalogRows` 的 6 个图标指标块 28/16/12/36/21/9 项）。
- **中列**：`MapStage` 原样保留（四川地图、城市预警标记数据、分级预警图例、顶部搜索定位框）；移除线框阶段的"空间态势总览"浮层标签。
- **右列**：日常监管（今日/近7日/近30日 切换复用 `TimeRangeControl`；预警总数 118；预警分级分布 红9/橙22/黄47/蓝40 复用 `alarmLevels` 数据 + 彩色分段条；预警处置率 82% 用内联 SVG 圆环实现，已处置 97/待处置 21；安全监控/人员定位/工业视频/视频监测 四个图标 tab；证据链快照 5、重大灾害预警 3 两张提醒卡）；打非治违（隐蔽工作面 疑似矿井 2、监控系统造假 1、隐瞒入井人数 1 三行带图标；县级任务 15待办/11闭环、市级 10/7、省级 6/4 三个任务块）。
- 环形图/分段条/处置率环均为纯 CSS/SVG 实现，未引入新依赖。
- 旧线框组件 `WireframePanel`/`WireframeMetric` 已删除；`DailyRegulationPanel`/`IllegalTreatmentPanel`/`LeftInsightPanels` 等历史未挂载组件保持原样未动。

### 问题 2：布局等宽居中 → CSS Grid 列定义

- `.home-five-zone-wireframe`：`grid-template-columns: minmax(320px, 400px) minmax(0, 1fr) minmax(320px, 400px)`（1920 下左右各 400px、地图居中约 1080px）。
- `≤1500px` 媒体查询覆盖旧线框的不等宽定义为 `minmax(260px, 1fr) minmax(0, 1.6fr) minmax(260px, 1fr)`（左右始终同宽），并缩小大数字与环形图尺寸防挤压。
- 左列行高：`minmax(0,1.28fr) minmax(0,0.82fr) minmax(0,0.82fr) minmax(0,1.32fr)`；面板骨架改为 flex 列布局，body 拉伸填充。

### 内容映射（旧 → 新）

| 旧线框内容 | 新结构 |
|------------|--------|
| 煤矿总数 196 / 总从业人员 58,624 / 总工作面 128 | 煤矿基础信息 174 处 + 环形图（21/5/34/0，中心 60） |
| 数据汇聚 122个 + 质量 92分 | 数据汇聚情况 6 个图标指标块（28/16/12/36/21/9 项，复用 `dataCatalogRows`） |
| 预警总数 118 + 红9/橙22/黄47/蓝40 文本 chips | 预警总数 hero + 分级数值 + 彩色分段条 + 处置率 82% SVG 环（已处置97/待处置21） |
| 环境监测/人员定位/工业视频/水害防治 入口 | 安全监控/人员定位/工业视频/视频监测 tab |
| 证照到期提醒5 / 地质灾害提醒3 | 证据链快照 5 / 重大灾害预警 3 |
| 疑似矿井 18/15/14 处 + 任务 36/24、19/14、8/6 | 疑似矿井 2/1/1 + 县级 15/11、市级 10/7、省级 6/4 |

### 保留的交互

- 日常监管区块点击 → `shuan-home-command-v3-daily-regulation`（预警总数/分级分布/处置率/四个 tab/证据链快照）。
- 重大灾害预警卡 → `shuan-home-command-v3-major-hazard-reminder`。
- 打非治违三行 → `openHiddenFaceCampaign({ business })`（含 sessionStorage 过滤参数与 jtb.boilyun.cn 特殊跳转逻辑，原样保留）；任务块 → `openHiddenFaceCampaign()`。
- 今日/近7日/近30日 `TimeRangeControl` state、地图搜索定位与区域下钻（`shuan-home-command-v3-region-cockpit`）、下钻覆盖层/workspace 切换、annotation id（shuan-v3-header / shuan-v3-map-aggregation / shuan-v3-daily-regulation / shuan-v3-illegal-treatment / shuan-v3-drill-stage）、顶部导航与方案切换均保留。

### round 2 验收

- 编码：TSX/CSS 重读无乱码（U+FFFD = 0）。
- 类型检查：本文件仅剩 react 声明缺失噪音（TS7016/TS7006/TS7026，全项目存量环境问题），无真实类型错误。
- 单入口构建通过（10.18s）；`GET /prototypes/system-replica-base/` → 200 无错误覆盖层；dev server 上 TSX 模块与 style.css 均已热更新为新代码。
- 浏览器截图级验收待用户执行：`http://localhost:51721/prototypes/system-replica-base/#page=shuan-home-command-v3`。

### round 3 紧凑化（2026-07-17，修复 1912×867 裁切）

- 问题：vh=867 时左列「数据汇聚情况」第二排指标块底边 y=908 超出视口 41px；右列任务行贴底。
- 处理（仅 style.css 追加，三列等宽 400px/1fr/400px 不动）：
  - 左列行高比例改为 `1.2fr/0.75fr/0.75fr/1.45fr`（数据面板获得更多高度）；
  - 主区 gap 10→8、padding 收紧、面板 header 42→38、body padding 12→10；
  - 环形图 118→104、煤矿总数 42→36、统计图标 42→38、大数字 26→24；
  - 数据指标块：图标 38→26、数字 22→19、padding/gap 收紧（重点压缩对象）；
  - 右列同步：预警总数 38→32、处置率环 62→56、tab/提醒卡/疑似行/任务块 padding 与图标收紧；
  - 覆盖 `.shuan-command` 存量 `min-height:1080px` 为 `100vh`，保证 vh=867 无纵向滚动条。
- 估算余量：vh=867 时数据面板内容约 238px < 面板高约 259px；右列两面板各约 295px < 约 378px。
- 验收：单入口构建通过（9.20s）；直连入口 200；浏览器复测由用户执行。

### round 4 收窄地图 + 深度美化（2026-07-17）

**列宽**：`minmax(360px,460px) minmax(0,1fr) minmax(360px,460px)`（1912 下实测约 460/948/460，左右仍等宽、地图仍居中）；≤1500px 为 `minmax(280px,1fr) minmax(0,1.35fr) minmax(280px,1fr)`。

**地图舞台**：`.home-wireframe-map` 增加 14/16px 内边距；`.shuan-map` 收窄至 `min(700px,94%)`，加 12px 圆角 + 细描边 + 内外发光，收进画框不再顶天立地。

**美化点清单**（全部在 V3 四联类作用域内追加）：
1. 面板头：发光渐变标记条 + `::after` 青蓝渐变淡出分隔线（替代平实 border-bottom）。
2. 主数字（174/118/82%）：青蓝渐变文字（#c2f2ff→#6fd0ff→#3fa9ff）+ drop-shadow 光晕 + 900 字重；单位 em 单独还原文档色。
3. 环形图：环变细（inset 24%→30%）、外发光增强、中心 60 放大 26px；图例圆点光晕加强；左列加宽后环形图 104→112、煤矿总数 36→40、统计图标/数字、数据图标 26→30 回补。
4. 地图：`::after` 径向暗角 vignette（points z3/legend z4 保持可读）；城市标记 `b::after` 脉冲光圈动画 `v3-marker-pulse`（红色 2s 更明显），支持 prefers-reduced-motion；图例改半透明玻璃胶囊（blur 6px）。
5. 搜索框：999px 胶囊 + 玻璃模糊，`:focus-within` 描边发光；定位按钮同胶囊。
6. 监管 tab：胶囊横排（图标+文字），hover 青蓝描边 + 微光。
7. 提醒卡：图标徽章改渐变底（琥珀/红两 tone），hover 浮起 -2px。
8. 页面底层：叠加 44px 细网格纹理（透明度 3.5%）+ 保留径向青蓝光晕。
9. 预警四色降饱和：红 #f47171 / 橙 #f5a558 / 黄 #eed267 / 蓝 #58a6f2，统一应用到地图图例、分级数值、分段条、脉冲圈。

**高度复核（vh=867）**：列高未变，数据汇聚面板内容约 242px < 面板约 259px；右列两面板余量更大；`min-height:100vh` 覆盖保持，无纵向滚动条。

**验收**：单入口构建通过（10.63s）；直连入口 200；dev server 已加载 round 4 样式。浏览器截图验收由用户执行。

### round 4.1 热修（2026-07-17）：分级分布「橙 22」被遮挡

- 根因：style.css 2476–2477 行的全局裸规则 `.tone-blue { background:#2f6bff }`、`.tone-orange { background:#ffb31a }` 泄漏到 `.v3-daily-dist-values` 的数值 span 上（橙色不透明底色盖住文字；分段条 `i` 元素的背景属正常需求）。
- 修复：V3 作用域内对 `.v3-daily-dist-values` 的四个 tone span 显式 `background: none`，不动其他部分。
- 验收：单入口构建通过（9.73s）；直连入口 200；区域复测由用户执行。
