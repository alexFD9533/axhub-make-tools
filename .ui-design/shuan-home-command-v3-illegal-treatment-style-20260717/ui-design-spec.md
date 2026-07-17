# UI Design Specification

## Package Metadata

- Page: 蜀安首页—打非治违模块样式调整
- Slug: `shuan-home-command-v3-illegal-treatment-style-20260717`
- Status: final
- Reference image: `reference.png`
- Reference viewport: `1349 × 1166 px`（observed）
- Render mode: `fixed-canvas`
- Product shell or route: `shuan-home-command-v3-export` / `shuan-home-command-v3`

## Source Precedence

1. Latest explicit user decision
2. Approved reference image for visible composition and appearance
3. This specification for business meaning and behavior
4. Initial image-generation prompt
5. Agent inference

## Page Intent

- Users: 省、市、县煤矿安全监管人员。
- Primary task or decision: 快速识别三类疑似矿井，并对照县、市、省三级任务的待办和闭环数量。
- Reading or operating path: 标题与时间范围 → 三类疑似矿井 → 三级任务待办/闭环。
- In scope: 仅调整首页右下“打非治违”模块的视觉样式和局部图标承载结构。
- Out of scope: 不改变现有数据、业务口径、页面跳转、整页栅格和其他首页模块。

## Business Content And Functions

| ID | Module or object | Purpose | Visible content/data | Function or rule |
| --- | --- | --- | --- | --- |
| M1 | 标题与时间范围 | 明确主题和统计周期 | 打非治违；今日、近7日、近30日 | 默认今日；沿用现有切换逻辑 |
| M2 | 疑似矿井 | 展示三类重点线索 | 隐蔽工作面 2、监控系统造假 1、隐瞒入井人数 1 | 点击沿用现有业务筛选 |
| M3 | 分级任务 | 对照待办与闭环 | 县级 15/11、市级 10/7、省级 6/4 | 点击沿用现有总览入口 |

## Final Image-Generation Prompt

Not available; reference supplied directly. Visual reconstruction summary: deep navy command-center panel, cyan outline and restrained glow, three horizontal risk rows with colored circular icon halos, and three equal task cards with luminous elliptical icon pedestals. Pending values use cyan; closed values use green.

## Final Composition

### Regions

| ID | Role | Geometry or responsive relationship | Confidence | Notes |
| --- | --- | --- | --- | --- |
| R1 | 标题栏 | reference `x=20, y=24, w=1307, h=107` | estimated | 左标题、右三段时间控件 |
| R2 | 三类疑似矿井 | reference `x=49, y=157, w=1249, h=550` | estimated | 三行等高，图标/标题/标签/数字横向排列 |
| R3 | 三级任务 | reference `x=49, y=727, w=1249, h=389` | estimated | 三卡等宽，图标底座、标题、待办与闭环 |

### Visual hierarchy

- Primary focus: 三条风险标题与橙色疑似矿井数字。
- Secondary focus: 县、市、省任务标题。
- Density and reading order: 自上而下、先风险后任务。
- Typography: 标题和主数字高对比；辅助标签降低亮度。
- Color and elevation: 深 navy 底、青蓝边框；青/绿/紫区分三类风险；橙色表示疑似数量；青色待办、绿色闭环。
- Reusable visual patterns: 双层光环图标、轻发光描边、椭圆数据底座。

## Content Truth

- Exact headings and labels: 打非治违、今日、近7日、近30日、隐蔽工作面、监控系统造假、隐瞒入井人数、疑似矿井、县级任务、市级任务、省级任务、待办、闭环。
- Representative values and units: 2、1、1；15/11、10/7、6/4。
- Selected/default states: 今日。
- Copy that is illustrative rather than contractual: 所有数字沿用当前原型代表数据。

## Interaction And Motion

| ID | Trigger/state | Result | Priority | Notes |
| --- | --- | --- | --- | --- |
| I1 | 时间切换 | 更新当前时间状态 | required | 保留现有逻辑 |
| I2 | 点击风险行 | 进入对应业务筛选 | required | 保留现有逻辑 |
| I3 | 点击任务卡 | 进入任务总览 | required | 保留现有逻辑 |
| I4 | hover/focus | 边框和光晕轻微增强 | preferred | 不缩放内容 |

- Reduced-motion treatment: `prefers-reduced-motion` 下取消位移动画。

## Assets

| Asset | Strategy | Source/status | Notes |
| --- | --- | --- | --- |
| 图标 | 复用 `CockpitIcon` | existing | 不引入新位图 |
| 光环与底座 | CSS 绘制 | implementation | 不把参考图作为运行时背景 |
| 参考图 | `reference.png` | supplied | 仅作验收依据 |

## Negative Constraints

- 不改变模块数量、文案、数值和点击逻辑。
- 不改变首页右栏宽度及“日常监管”高度。
- 不把整张参考图作为背景。
- 不引入过曝霓虹、厚重 3D 素材或新的外部图标依赖。
- 不覆盖旧设计包 `shuan-home-command-v3-illegal-treatment-l0`。

## Final Revisions

- Added: 任务图标底座承载结构、三类风险色调标记。
- Removed: 无。
- Changed: 标题栏、时间控件、风险行、疑似数量和任务卡的视觉层级。
- Differences between the final image and the original prompt: 无初始生成提示词；按用户直接提供的参考图重建。

## Implementation Acceptance

- Major-region tolerance or responsive behavior: 在现有右下槽位内保持约 `1.16:1` 的模块比例；标题栏约 11%、风险行约 52%、任务卡约 37%。
- Exact-copy requirements: 当前可见中文和数字保持不变。
- Required states/interactions: 三个时间按钮、三条风险行、三张任务卡保持可点击。
- Screenshot comparison requirements: 在 `1920 × 920 px` 首页视口检查模块结构、文字边界、图标与数字对齐。
- Performance or accessibility constraints: 使用真实 button；保留 focus/hover；减少动态偏好下关闭位移动画。

## Unresolved

| Item | Why unresolved | Temporary treatment allowed? |
| --- | --- | --- |
| 参考图任务图标的精确 3D 造型 | 当前项目只复用统一 SVG 图标 | 是；使用现有图标与 CSS 椭圆底座近似 |
