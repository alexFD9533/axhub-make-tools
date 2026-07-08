# shuan-drilldowns

蜀安首页 Av3 下钻页只负责覆盖层里的业务内容，不负责全局页面框架。

## Frame ownership

- 全局顶部菜单唯一来源是 `ShuanHomeCommandV3.tsx` 里的首页 Av3 顶部系统栏。
- 下钻页面通过首页 Av3 的 `shuan-drilldown-overlay` 叠加展示，不再单独绘制系统标题、全局导航或用户工具栏。
- `DrilldownFrame` 只负责 `drill-stage` 内容容器，不负责顶部系统菜单。

## Child page rules

- 子页面不得渲染全局顶部导航。
- 子页面不得使用这些全局顶部类名：`drill-fixed-top`、`drill-top-nav`、`drill-brand`、`drill-top-tools`。
- 子页面只能渲染覆盖层中的内容区。
- 页面标题、返回、筛选、业务页签、操作按钮统一放在内容区 `header` 或 `toolbox` 内。
- 内容区优先复用 `DrillContentHeader`，不要再引入新的“全局 titlebar”语义。

## Routing expectations

- `shuan-home-command-v3-wireframes`
- `shuan-home-command-v3-daily-regulation`
- `shuan-home-command-v3-illegal-campaign-*`
- `shuan-home-command-v3-algorithm-*`

以上路由都应通过首页 Av3 承载，在同一套顶部菜单下显示覆盖层内容。
