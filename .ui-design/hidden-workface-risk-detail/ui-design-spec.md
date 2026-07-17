# UI Design Specification

## Package Metadata

- Page: 综合风险评估智能体 · 隐蔽工作面专项风险研判详情
- Slug: hidden-workface-risk-detail
- Status: final
- Reference image: `.ui-design/hidden-workface-risk-detail/reference.png`
- Reference viewport: 1582 × 890 px
- Render mode: responsive-layout
- Product shell or route: `system-replica-base` 框架；顶部统一模块导航与左侧菜单沿用现有框架，工作区路由为 `#page=guard-hidden-risk-agent-detail`。

## Source Precedence

1. 最新用户明确决定：主体使用本参考图；顶部必须改为项目框架的顶部导航。
2. `reference.png`：工作区中的视觉构图、内容密度、颜色与数据表达。
3. 本规格：业务语义、框架适配和交互要求。
4. 初始图像提示词：Not available; reference supplied directly.
5. Agent inference。

## Page Intent

- Users: 矿山监管人员、专项检查任务派发人员。
- Primary task or decision: 快速判断一个煤矿的隐蔽工作面风险由哪些线索触发、当前分数是否越阈、任务是否执行及回流后是否需要继续跟踪。
- Reading or operating path: 煤矿与状态摘要 → 五步研判链路 → 任务阈值与回流结果 → 关键证据 → 检查任务要点。
- In scope: 单矿专项研判详情、线索聚合、模型结论、评分、阈值、回流、证据节选与任务要点。
- Out of scope: 配置指标权重、完整任务表单、证据原始文件预览、跨矿排行、与参考图无关的统计大卡。

## Business Content And Functions

| ID | Module or object | Purpose | Visible content/data | Function or rule |
| --- | --- | --- | --- | --- |
| M01 | 页面摘要 | 确认研判对象和数据时效 | 达州县河煤矿 / 隐蔽工作面专项风险研判；正常生产；达州市·渠县；2026-07-15 09:30:00 | “扩充证据”触发刷新反馈，不改变初始截图状态。 |
| M02 | 五步智能体链路 | 说明风险产生与处置闭环 | 01 异常线索汇聚 → 02 大模型辅助综合分析 → 03 评分算法计算 → 04 任务阈值触发 → 05 检查回流修正 | 过程顺序固定，采用细青蓝连线/箭头提示。 |
| M03 | 异常线索汇聚 | 展示多维异常来源 | 电 12 条、风 14 条、煤 10 条、人 8 条、瓦斯 15 条；共 59 条 | 展示当前选中研判的节选数据。 |
| M04 | 综合分析 | 解释模型加减分依据 | 综合结论、时间窗口关联 +9.6、对象一致性关联 +8.4、多源印证 +23.1、数据质量评分修正 -2.6 | 加分以绿色数值呈现，修正项可为绿色或低饱和色，不夸张告警。 |
| M05 | 评分与阈值 | 显示任务触发因果 | 41.7 + 38.5 = 80.2；市级阈值 80；任务状态执行中 | 80.2 ≥ 80 即展示“已跨越阈值线”。 |
| M06 | 回流修正 | 显示风险是否可下降 | 任务回流修正分 -5.3；当前风险分 74.9/100；高风险 | 当前任务未完成时保留高风险标签，回流结果可更新该区域。 |
| M07 | 关键异常线索 | 支撑研判可追溯 | 5 行时间、维度、事实描述、证据成熟度、跨专题关联、分析证据操作 | “分析证据”为进入证据链的可点击入口。 |
| M08 | 检查任务要点 | 指引现场核查 | 通风、瓦斯、电气三项检查方向及任务下发时间 | “查看任务详情”为进入任务详情的可点击入口。 |

## Final Image-Generation Prompt

Not available; reference supplied directly. Visual reconstruction summary: 在项目统一顶部导航和左侧菜单下，工作区使用深海军蓝科技监管看板；顶部为煤矿专项研判摘要，依次展示五步智能体链路。主体为五列紧凑流程面板，青蓝细边、克制辉光、少量绿色运行态和橙红风险数值；底部左侧为证据表格、右侧为三条检查任务。整体为真实政务矿山监管系统，不能做成营销页、PPT 或全屏独立大屏。

## Final Composition

### Regions

| ID | Role | Geometry or responsive relationship | Confidence | Notes |
| --- | --- | --- | --- | --- |
| R01 | 框架顶部导航 | 沿用现有 AppShell 高 51px，位于页面最顶端 | observed | 此为用户对参考图的唯一明确结构修正；不采用图中黑色图标导航。 |
| R02 | 框架左侧菜单 | 沿用现有 AppShell 宽 250px | observed | 激活“隐蔽面风险综合分析 / 专项风险研判详情”。 |
| R03 | 工作区摘要 | 工作区顶部，高约 68px，标题居左、状态与工具居右 | estimated | 参考图相对工作区宽度测量；在框架可用宽度内自适应。 |
| R04 | 五步链路标题 | 摘要下方，高约 76px，五个步骤横向等节奏排布 | observed | 在 1600px 以上不换行；窄于 1320px 可缩小文字并允许横向滚动。 |
| R05 | 研判主流程 | 五列网格，列比例约 1.05 : 1.62 : .95 : .85 : .84，间距 10px | estimated | 参考图主体工作区的主要视觉结构。 |
| R06 | 证据与任务区 | 主流程下方 12px；左/右比例约 1.72 : .95 | estimated | 表格与任务各自固定为一张面板。 |

### Visual hierarchy

- Primary focus: 80.2 触发分、阈值 80、回流后 74.9 当前风险分的因果关系。
- Secondary focus: 五步流程及模型综合结论。
- Density and reading order: 高密度、左至右、上至下；文字必须完整可读，不使用装饰性大留白。
- Typography: 中文使用 Microsoft YaHei / PingFang SC；标题 20–23px，面板标题 15–16px，指标值 28–34px，说明 11–13px。
- Color and elevation: 背景 #021329 至 #041d3b；主青蓝 #22bdf4；文字 #dcecff；辅助文字 #8caecc；运行绿 #56df8f；风险橙红 #ff7250。边框为低透明青蓝，内发光克制。
- Reusable visual patterns: 细边半透明面板、圆形维度图标、描边状态标签、细线分隔、表格行分隔。

## Content Truth

- Exact headings and labels: “达州县河煤矿 / 隐蔽工作面专项风险研判”、“异常线索汇聚”、“大模型辅助综合分析”、“评分算法计算”、“任务阈值触发”、“检查回流修正”、“关键异常线索（节选）”、“检查任务要点与方向”。
- Representative values and units: 59 条、41.7、38.5、80.2、80、-5.3、74.9 /100；这些为界面演示数据，非外部事实。
- Selected/default states: 正常生产；任务状态“执行中”；当前风险标签“高风险”；页面默认展示 5 条证据与 3 项任务。
- Copy that is illustrative rather than contractual: 矿名、区域、时间、线索描述、任务描述与数值均为原型展示内容。

## Interaction And Motion

| ID | Trigger/state | Result | Priority | Notes |
| --- | --- | --- | --- | --- |
| I01 | 点击“扩充证据” | 刷新图标短暂旋转，按钮显示“已更新” | required | 不改变布局或初始数据。 |
| I02 | 点击“分析证据” | 进入线索证据台账或显示可用入口反馈 | preferred | 后续路由实现可先跳转到台账占位页。 |
| I03 | 点击“查看任务详情” | 进入工作安排处置或显示可用入口反馈 | preferred | 后续路由实现可先跳转到任务占位页。 |
| I04 | 悬停面板或按钮 | 边框、背景透明度轻微提升 | optional | 150–220ms ease-out。 |

- Reduced-motion treatment: `prefers-reduced-motion` 下禁用扫描、脉冲、旋转；保留静态状态与点击反馈。

## Assets

| Asset | Strategy | Source/status | Notes |
| --- | --- | --- | --- |
| reference.png | 视觉还原基准 | 用户提供，已冻结 | 1582 × 890；仅用于比对，不作为页面背景。 |
| 图标 | lucide-react 或内联 SVG | 项目已有依赖 | 使用与原图语义接近的铃铛、脑图、数据库、盾牌、刷新等图标。 |
| 轨道/仪表 | CSS / SVG | 实现阶段构建 | 不需要位图切片。 |

## Negative Constraints

- 顶部不得使用参考图中的黑色大屏图标导航；必须采用当前项目框架顶部导航。
- 不把参考截图直接做成整页背景图。
- 不新增地图、排行榜、全局统计卡、营销 Hero、插画、粗大白色箭头或无业务意义的装饰模块。
- 不将深色研判工作区延伸覆盖项目框架顶部导航和左侧菜单。
- 不让可读中文、表格信息、数值、状态标签重叠、截断或超出面板。
- 不用高频闪烁、同步全屏动效或过曝霓虹效果。

## Final Revisions

- Added: 对项目框架顶部导航与左侧菜单的明确适配要求。
- Removed: 参考图原有顶部黑色图标导航，不进入实现。
- Changed: 参考图的主体研判工作区保留，但嵌入框架工作区，而非全屏独立大屏。
- Differences between the final image and the original prompt: 无初始图像提示词；直接以用户提供参考图为视觉方向。

## Implementation Acceptance

- Major-region tolerance or responsive behavior: 在参考工作区宽度下，主流程五列与底部左右两列关系保持；主要面板边界允许约 8–16px 视觉偏差。窄于 1320px 时可横向滚动，不得挤压重叠。
- Exact-copy requirements: 标题、五步名称、分数、阈值、风险等级、证据表头和三项任务标题需与本规格一致。
- Required states/interactions: I01 必须实现；I02、I03 至少有可点击且可观察的路由/反馈。
- Screenshot comparison requirements: 在 1582×890 同视口截图进行结构与细节两轮比对；框架导航差异为已批准改动，不计为偏差。
- Performance or accessibility constraints: 动效使用 transform/opacity；支持 reduced motion；关键颜色不作为唯一状态表达。

## Unresolved

| Item | Why unresolved | Temporary treatment allowed? |
| --- | --- | --- |
| 真实煤矿与任务数据接口 | 用户未提供数据源与字段口径 | 是，使用参考图中的演示数据。 |
| “分析证据”“查看任务详情”最终页面范围 | 现有目标为详情页还原 | 是，先链接至现有台账/任务路由或给出反馈。 |
