# UI Design Specification

## Package Metadata

- Page: 打非治违首页－专题核查任务摘要组件
- Slug: `illegal-campaign-task-summary`
- Status: final
- Reference image: `reference.png`
- Reference viewport: `1068 × 185 px`
- Render mode: `fixed-canvas`
- Product shell or route: `src/prototypes/system-replica-base/` 的蜀安首页 Av3「打非治违」面板内部

## Source Precedence

1. Latest explicit user decision
2. Approved reference image for visible composition and appearance
3. This specification for business meaning and behavior
4. Initial image-generation prompt
5. Agent inference

## Page Intent

- Users: 省、市、县煤矿安全监管人员及大屏值守人员。
- Primary task or decision: 在首页快速比较县级、市级、省级专题核查任务数量及处理进度，并按级别进入同一个任务模块。
- Reading or operating path: 从左到右读取县、市、省任务总量，再读取各卡片的待办、执行中、复核中、已闭环分布。
- In scope: 三级任务摘要卡、四个任务状态、按任务级别下钻。
- Out of scope: 智能触发与人工发起统计、人工发起操作、任务阈值、任务升级事件、任务详情、驻矿员安排、现场核查和多级复核操作。

## Business Content And Functions

| ID | Module or object | Purpose | Visible content/data | Function or rule |
| --- | --- | --- | --- | --- |
| T1 | 县级任务卡 | 展示当前县级任务 | 总数 26；待办 9；执行中 7；复核中 4；已闭环 6 | 点击进入统一任务页，级别过滤预置为「县级」 |
| T2 | 市级任务卡 | 展示当前市级任务 | 总数 18；待办 6；执行中 5；复核中 3；已闭环 4 | 点击进入统一任务页，级别过滤预置为「市级」 |
| T3 | 省级任务卡 | 展示当前省级任务 | 总数 11；待办 4；执行中 3；复核中 2；已闭环 2 | 点击进入统一任务页，级别过滤预置为「省级」 |

业务真值：县级、市级、省级是同一任务模型的三个当前级别及过滤条件，不是三套处理流程。任务闭环前只允许升级，不自动降级；具体升级记录只在统一任务页的任务列表和详情中展示，不在首页卡片中设置「升级任务」指标。

## Final Image-Generation Prompt

以蜀安煤矿安全监管大屏现有视觉为基准，设计一个可直接嵌入「打非治违」面板底部槽位的横向专题核查任务摘要组件。画布比例约5.77:1，只包含县级任务、市级任务、省级任务三张横向等权卡片。每张卡顶部显示级别图标、任务级别名称和任务总数；下部显示待办、执行中、复核中、已闭环四个状态，使用细线节点轨道连接。保持深 navy 蓝背景、cyan 细边框、白色标题、cyan 数字、绿色闭环数字、小切角和克制发光。不得生成独立标题、外层大边框、发起方式汇总、人工发起按钮、层级间升级箭头、卡片内升级任务或新增检查待确认。

最终参考图由用户明确指定，优先级高于此前所有尺寸估算和带发起方式汇总的生成方向。

## Final Composition

### Regions

| ID | Role | Geometry or responsive relationship | Confidence | Notes |
| --- | --- | --- | --- | --- |
| R0 | 组件画布 | x=0, y=0, w=1068, h=185 | observed | 仅含三张任务卡，无额外外框 |
| R1 | 县级任务卡 | x≈3, y≈4, w≈333, h≈178 | observed | 左侧卡片 |
| R2 | 市级任务卡 | x≈369, y≈4, w≈338, h≈178 | observed | 与县级卡间距约33px |
| R3 | 省级任务卡 | x≈736, y≈4, w≈332, h≈178 | observed | 与市级卡间距约29px |
| R4 | 卡片标题区 | 卡片顶部约0–68px | estimated | 图标、级别名称、任务总数同一行 |
| R5 | 状态轨道区 | 卡片顶部约78–165px | estimated | 四个状态等距排列，标签在上、数值在下 |
| R6 | 首页目标槽位 | 约590–594px宽、102–103px高 | observed | 组件整体等比缩放约0.552，不改变宽高比 |

### Visual hierarchy

- Primary focus: 县级、市级、省级任务总数 26、18、11。
- Secondary focus: 每级的待办、执行中、复核中、已闭环分布。
- Density and reading order: 左到右县、市、省；单卡从上到下为级别与总数、状态标签、状态轨道、状态数量。
- Typography: 任务级别为白色中粗体；任务总数为高亮 cyan；状态标签为白色或浅灰；闭环数量使用绿色。
- Color and elevation: 深蓝渐变底，cyan 细边框与切角，轻微内发光；不使用紫色或大面积红色。
- Reusable visual patterns: 等权级别卡、四节点状态轨道、线性机构图标。

## Content Truth

- Exact headings and labels: 「县级任务」「市级任务」「省级任务」「待办」「执行中」「复核中」「已闭环」。
- Representative values and units: 县级 26（9/7/4/6）；市级 18（6/5/3/4）；省级 11（4/3/2/2）。
- Selected/default states: 首页不预选任务级别；点击卡片后由统一任务页显示对应过滤状态。
- Copy that is illustrative rather than contractual: 所有数值为原型代表数据，上线时由接口返回。

## Interaction And Motion

| ID | Trigger/state | Result | Priority | Notes |
| --- | --- | --- | --- | --- |
| I1 | 点击县级任务卡 | 打开同一个任务模块并过滤为县级 | required | 不创建独立县级页面 |
| I2 | 点击市级任务卡 | 打开同一个任务模块并过滤为市级 | required | 不创建独立市级页面 |
| I3 | 点击省级任务卡 | 打开同一个任务模块并过滤为省级 | required | 不创建独立省级页面 |
| I4 | 卡片 hover | 边框亮度和背景透明度轻微提升 | preferred | 150–250ms ease-out |
| I5 | 状态轨道 | 细小光点沿待办至闭环方向低速移动 | optional | 只表达任务处理方向，不表达层级升级 |

- Reduced-motion treatment: 关闭状态轨道光点移动，仅保留静态节点和即时 hover 反馈。

## Assets

| Asset | Strategy | Source/status | Notes |
| --- | --- | --- | --- |
| 县级、市级建筑图标 | 优先复用项目现有线性建筑图标或等义 SVG | reference observed | 三个图标容器大小一致 |
| 省级机构图标 | 优先复用项目现有政府建筑图标 | reference observed | 线宽和发光强度与其他卡片一致 |

## Negative Constraints

- 不要恢复「煤矿整改、县级走访、市级研判、省挂牌督办」四类旧处置。
- 不要出现「智能触发」「人工发起」或任何发起方式汇总；这些内容只属于统一任务页。
- 不要出现卡片内「升级任务」指标。
- 不要在三级卡片之间放置「升级」箭头或连接器。
- 不要在省级卡片中暗示仍可继续升级。
- 不要出现「新增检查待确认」。
- 不要新增独立标题「专题核查任务」、人工发起按钮或最外层展示框。
- 不要把该组件实现为三张独立页面入口；三张卡必须进入同一个任务模块。
- 不要改变参考图宽高比，不要纵向压缩，不要覆盖相邻旧处置内容。

## Final Revisions

- Added: 县级、市级、省级三张任务卡及四阶段状态分布。
- Removed: 原四类处置；所有升级任务指标；层级间升级连接器；新增检查待确认；独立标题和外框；智能触发与人工发起汇总条。
- Changed: 组件收敛为约590×102px的纯三卡结构，完整适配现有底部槽位。
- Differences between the final image and the original prompt: 最终参考图由用户指定；发起方式、说明条和查看全部入口全部移出首页组件。

## Implementation Acceptance

- Major-region tolerance or responsive behavior: 在现有1920×1080固定大屏中，组件目标宽度约590–594px、高度约102–103px；按1068×185参考图整体等比缩放，宽高比保持约5.77:1。主要区域偏差控制在4px以内。
- Exact-copy requirements: 「Content Truth」中的中文标签必须逐字一致，不得改回旧处置名称或加入发起方式。
- Required states/interactions: 三张级别卡均进入同一个任务模块，并正确携带县级、市级、省级过滤条件。
- Screenshot comparison requirements: 截图应完整落入原底部处置槽位，不覆盖上方三张专题整治卡，不残留原四类处置，不额外出现外框或汇总条。
- Performance or accessibility constraints: hover 与可选轨道动画使用 transform/opacity；卡片整体为可点击区域；支持 reduced-motion。

## Unresolved

| Item | Why unresolved | Temporary treatment allowed? |
| --- | --- | --- |
| 正式接口字段与实时任务数值 | 当前仅确认业务规则和代表数据 | 是；实现阶段接入真实数据 |
