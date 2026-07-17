# UI Design Specification

## Package Metadata

- Page: 日常监管统计
- Slug: `daily-regulation-statistics`
- Status: final
- Reference image: `reference.png`
- Reference viewport: 1487 × 1058 px
- Render mode: `responsive-layout`
- Product shell or route: `shuan-home-command-v3-export` / `shuan-home-command-v3-daily-regulation`

## Source Precedence

1. Latest explicit user decision
2. Approved reference image for visible composition and appearance
3. This specification for business meaning and behavior
4. Initial image-generation prompt
5. Agent inference

当参考图中的示意数值与现有原型数据源冲突时，保持参考图的结构与视觉表达，数值以数据源为准。

## Page Intent

- Users: 省、市州应急管理部门和煤矿安全监管人员。
- Primary task or decision: 快速判断当日预警规模、等级构成、处置成效、分类集中度和煤矿联网健康度。
- Reading or operating path: 页面条件 → 今日报警总览 → 分级处置与分类分析 → 联网城市排名。
- In scope: 时间、区域、煤矿筛选；预警等级统计；接警率与处置率；分类预警排行；联网概况与市州排行；刷新与返回。
- Out of scope: 待办提醒横幅、预警明细表、单条预警处置入口、与首页重复的驾驶舱指标、地图、趋势预测。

## Business Content And Functions

| ID | Module or object | Purpose | Visible content/data | Function or rule |
| --- | --- | --- | --- | --- |
| M01 | 页面标题与筛选 | 明确页面范围并控制统计口径 | 日常监管统计、说明文案、今日/近7日/近30日、市州、煤矿、刷新、返回首页 | 时间、区域和煤矿条件影响全页；默认“今日 + 全部市州 + 全部煤矿” |
| M02 | 今日报警 | 展示报警总量、等级构成和闭环概况 | 总数118；红9、橙22、黄47、蓝40；各等级待处置/已处置；占比分布；待处置21、已处置97 | 总数等于四级报警之和；待处置与已处置之和等于总数；颜色固定对应等级 |
| M03 | 分级预警处置 | 判断报警是否接收、是否完成处置 | 煤矿接警率、煤矿处置率、红橙黄蓝四级同心环、周/月切换、简短结论 | 默认周；接警率与处置率分别计算；参考图中的100%仅为视觉示意，处置率应绑定现有数据源，当前原型默认82% |
| M04 | 分类预警统计 | 识别预警主要来源 | 分类名称、数量、横向排行条、单位“条” | 按数量降序；0值仍保留名称和数值；分类数据为代表性展示，正式实现绑定现有分类统计源 |
| M05 | 联网情况 | 判断煤矿网络接入是否健康 | 在线80、中断0、联网80；生产状态、区域筛选；市州排名、在线/中断/联网数、进度条 | 市州按在线数降序；绿色表示在线，红色表示中断，蓝色表示联网总数 |

## Final Image-Generation Prompt

```text
Refine the attached selected dark desktop concept into a more carefully planned, production-quality layout for the Chinese “日常监管统计” drilldown page. Target 1440 x 1024, desktop web app, no browser/device chrome. Preserve the selected concept’s navy command-center visual system, restrained cyan accents, white Chinese typography, warning semantic colors, and overall premium government safety-monitoring character. Preserve the business content from the two attached mobile references. Do not switch to a white/light theme.

The selected concept’s current layout is too evenly stacked and too dense. Redesign the content area with a disciplined three-level information hierarchy and a 12-column grid:

1. Compact page heading and filter toolbar, no more than 90px tall. Title and description on the left; date range, region, mine, refresh and return actions aligned in one clean row on the right.
2. Full-width “今日报警” executive summary, about 170px tall. Put total 118 at the left as the anchor. In the center show red 9, orange 22, yellow 47, blue 40 as four aligned severity groups with pending/handled counts beneath. On the right show one segmented distribution bar and pending 21 / handled 97. Use subtle vertical dividers, not four separate cards.
3. Middle analytical row, about 330px tall, 7/5 column split. Left: “分级预警处置” with two large, legible concentric-ring charts for receipt rate and handling rate, a week/month segmented toggle, a compact legend and one concise interpretation line. Right: “分类预警统计” as a ranked horizontal bar chart with clear values and enough room for long labels. These two sections should align perfectly at top and bottom.
4. Bottom full-width “联网情况”, about 270px tall. First row contains 80 online, 0 interrupted, 80 networked plus compact production-status and region filters. Below is a calm table-like city ranking with six rows, green progress bars and aligned online/interrupted/network totals. Use row separators and whitespace, not individual cards.

Remove the amber reminder banner and all warning-detail rows/table. Avoid equal 2x2 cards, nested cards, oversized empty space, excessive glow, repeated legends, repeated totals, or decorative icons. Use the base surface, subtle 1px borders and section dividers. Body text 14–16px. Ensure all content fits naturally in 1440 x 1024 with no clipping. The final result should feel clearly different from the homepage while remaining part of the same product.
```

## Final Composition

### Regions

| ID | Role | Geometry or responsive relationship | Confidence | Notes |
| --- | --- | --- | --- | --- |
| R00 | 产品顶部导航 | 参考图 x=0, y=0, w=1487, h≈69；沿用现有产品壳 | observed | 下钻页不重做导航 |
| R01 | 标题与筛选 | x≈29, y≈82, w≈1411, h≈74 | estimated | 宽屏单行；空间不足时筛选换行，不压缩标题 |
| R02 | 今日报警 | x≈29, y≈167, w≈1411, h≈189 | observed | 约占12列；内部为总数2列、等级7列、分布3列 |
| R03 | 分级预警处置 | x≈29, y≈366, w≈706, h≈312 | estimated | 中部7/12轨道；最小宽度620px |
| R04 | 分类预警统计 | x≈757, y≈366, w≈683, h≈312 | estimated | 中部5/12轨道；与R03等高 |
| R05 | 联网情况 | x≈29, y≈691, w≈1411, h≈318 | observed | 整行12列；指标与筛选在首行，排行在下方 |

响应规则：

- 内容区最大宽度随现有壳体伸展，左右安全边距24–32px。
- 1200px以上保持12列和7/5中部布局。
- 900–1199px时，中部两区改为单列；联网排行允许横向滚动表头但不裁切数值。
- 899px以下仅保证结构性响应，不作为本轮主要验收设备；四级报警可改为2×2排列。
- 页面纵向自然滚动，不使用固定画布缩放。

### Visual hierarchy

- Primary focus: “今日报警 118”和四级构成。
- Secondary focus: 接警率、处置率及分类预警排行。
- Density and reading order: 三层纵向阅读；每层内部从左到右；不使用四块等权卡片。
- Typography: 页面标题28–32px/700；模块标题18–20px/600；核心数字32–52px/700；正文14–16px；辅助文字12–14px。
- Color and elevation: 深navy底；cyan细边框与选中态；红/橙/黄/蓝只承担预警语义；绿色仅表示联网或良好状态；无重阴影。
- Reusable visual patterns: 1px低透明边框、轻分割线、分段按钮、排行条、对齐数字列、ECharts图表。

## Content Truth

- Exact headings and labels:
  - `日常监管统计`
  - `查看今日预警、联网状态和分级处置情况。`
  - `今日`、`近7日`、`近30日`
  - `市州`、`煤矿`、`刷新`、`返回首页`
  - `今日报警`
  - `红色预警`、`橙色预警`、`黄色预警`、`蓝色预警`
  - `待处置`、`已处置`、`分级占比分布`
  - `分级预警处置`、`煤矿接警率`、`煤矿处置率`、`周`、`月`
  - `分类预警统计`、`单位：条`
  - `联网情况`、`在线矿数`、`中断矿数`、`联网矿数`
  - `排名`、`市`、`在线矿数`、`中断矿数`、`联网矿数`
- Representative values and units:
  - 报警总数118；红9、橙22、黄47、蓝40。
  - 待处置21；已处置97；现有默认处置率82%。
  - 在线80；中断0；联网80。
  - 分类预警和市州排行数值为原型演示数据，单位为“条”或“矿”。
- Selected/default states: 今日、全部市州、全部煤矿、周、正常生产、全部区域。
- Copy that is illustrative rather than contractual: 处置结论句、分类排行具体数值、筛选下拉中的完整选项集合。

## Interaction And Motion

| ID | Trigger/state | Result | Priority | Notes |
| --- | --- | --- | --- | --- |
| I01 | 今日/近7日/近30日切换 | 更新全页统计并保持其他筛选 | required | 选中态使用cyan实底 |
| I02 | 市州或煤矿筛选 | 更新五个业务模块 | required | 煤矿选项受市州约束 |
| I03 | 刷新 | 保持筛选并重新拉取数据 | required | 显示短暂加载反馈 |
| I04 | 返回首页 | 返回V3首页并关闭下钻状态 | required | 沿用现有路由机制 |
| I05 | 周/月切换 | 更新处置同心环、数值和结论 | required | 默认周 |
| I06 | 生产状态/区域筛选 | 仅更新联网指标与城市排行 | required | 选择结果应可见 |
| I07 | 图表悬停 | 显示分类、数量、占比或等级数据 | preferred | 移动端不依赖hover |
| I08 | 页面加载 | 数字和图表在300–600ms内轻量呈现 | optional | 不影响首次读数 |

- Reduced-motion treatment: 在 `prefers-reduced-motion: reduce` 下关闭数字递增、圆环绘制和进度条动画，直接显示最终状态。

## Assets

| Asset | Strategy | Source/status | Notes |
| --- | --- | --- | --- |
| 顶部产品壳、Logo、导航图标 | 复用现有实现 | existing | 不从参考图裁切 |
| 页面功能图标 | 使用项目现有图标库 | existing | 不使用emoji、CSS绘图或内联手绘SVG |
| 同心环与横向柱状图 | ECharts实现 | existing dependency | 支持resize与tooltip |
| 参考图 | `reference.png` | approved | 只用于视觉复刻与截图对比 |

## Negative Constraints

- Do not restore removed modules.
- Do not introduce patterns rejected during iteration.
- 不恢复“今日还有21条预警待处置”的琥珀色提醒横幅。
- 不恢复预警明细表和单条“去处置”操作。
- 不使用四块等权2×2卡片布局。
- 不把四级报警拆成四张独立卡片；使用同一横向总览面。
- 不重复首页的“预警总数 + 分布 + 处置率”三卡摘要结构。
- 不使用卡中卡、粗边框、重发光、渐变装饰球或大面积空白。
- 不把生成图中的100%处置率写死为正式业务值。
- 不新增地图、趋势预测、待办列表或未确认的下钻入口。

## Final Revisions

- Added:
  - 三层纵向信息主线。
  - 今日报警总览中的总数、等级、占比和闭环数据合并表达。
  - 7/5中部分析布局。
  - 整行联网城市排名。
- Removed:
  - 琥珀色待处置提醒横幅。
  - 预警明细表。
  - 等权2×2统计卡布局。
  - 重复图例和重复总数。
- Changed:
  - 由移动端纵向统计模块转为桌面12列响应式布局。
  - 联网情况由普通卡片改为表格式排名。
  - 分类统计与处置分析并排，形成“效率 + 原因”分析关系。
- Differences between the final image and the original prompt:
  - 生成图实际尺寸为1487×1058，而非提示词中的1440×1024；实现按比例关系而非绝对像素复刻。
  - 参考图处置环展示100%，规格明确改为绑定数据源，当前原型默认82%。

## Implementation Acceptance

- Major-region tolerance or responsive behavior:
  - 1440px基准下，今日报警整行、中部7/5、联网整行的结构必须一致。
  - 中部两区顶底对齐，宽度比例允许±3%。
  - 主要区块间距16–20px，左右安全边距24–32px。
- Exact-copy requirements: `Content Truth` 中列出的标题、筛选项和字段名逐字一致。
- Required states/interactions: I01–I06必须可操作并更新对应区域；刷新和返回不得为静态装饰。
- Screenshot comparison requirements:
  - 在1440×1024或等比例桌面视口截取完整页面。
  - 将实现截图与`reference.png`并排比较。
  - 首屏信息顺序、三层结构、7/5比例和四级颜色必须一致。
  - 不允许文字溢出、图表裁切、表头错列或底部内容被遮挡。
- Performance or accessibility constraints:
  - 图表随容器resize，不重复创建实例。
  - 颜色之外必须同时提供文字与数值。
  - 控件有可见焦点态和可读的aria-label。
  - 页面加载和筛选切换期间保留稳定布局，避免明显跳动。

## Unresolved

| Item | Why unresolved | Temporary treatment allowed? |
| --- | --- | --- |
| 分类预警的正式分类集合和数值口径 | 手机参考与现有原型演示数据不同 | Yes；沿用现有原型数据并标注单位“条” |
| “接警率”计算口径 | 尚未确认按报警条数、煤矿数或已确认事件数计算 | Yes；沿用现有接口返回百分比，不在前端自行推导 |
| 市州、煤矿和生产状态的真实选项 | 当前仅有原型演示选项 | Yes；保留现有演示选项并使用受控选择器 |
