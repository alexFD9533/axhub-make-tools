# style.css 全局裸规则排查收编报告（2026-07-17）

## 任务范围

对 `src/prototypes/system-replica-base/style.css`（约 3.6 万行，CRLF）做全局裸规则（无页面作用域前缀的通用类规则）排查，分类处置：A 类收编到唯一消费者作用域、B 类保留全局+注释、C 类死代码注释待删。

## 排查方法

- node 脚本解析全部 CSS 规则（含 @media 内嵌规则），按选择器形态分组：
  - **G1 通用类裸规则 12 条**（`.tone-*`、`.level-tag/.status-tag` 等）
  - **G2 单类壳层规则 565 条**（`.drill-*`、`.county-*` 等项目扁平命名惯例，全部归 B 不动）
- 对每条裸规则在全部 tsx 中定位消费者，并结合 CSS 特异性（specificity）与源顺序判断裸规则是否为该元素的生效样式来源。

## A 类（收编）：0 条——原方案复核后降级

原计划收编两组 tone 裸规则，复核后**证据不足，全部降级为 B 类保守处理**：

| 原方案 | 降级原因 |
|--------|----------|
| A1：2475–2478 `.tone-cyan/blue/orange/purple { background }` 收编到 `.classify-bar/.classify-legend` 作用域 | classify 组件确已无 tsx 使用，但 bare background 的泄漏消费者存在未证伪项（personnel-staffing-list 行、illegal-algorithm-copy、reminder-task 等），删除裸规则可能产生可见变化 |
| A2：6590–6604 `.tone-red/orange/yellow/blue { color }` 收编到 `.alarm-level-strip` | 复核发现消费者遍布十余处页面：CountyOverviewPage（`em.tone-orange`）、city-analysis-summary/source-grid、dangerous-work、personnel-cert/access-grid、coal-basic、illegal-overview、V2/V3 首页多张卡片等，收编到单一作用域会造成可见回归 |

## B 类（保留全局 + 注释）：已落盘 5 处注释

| 位置（原行号） | 内容 | 依据 |
|----------------|------|------|
| 文件顶部 | 壳层扁平命名惯例注释（G2 565 条规则的约定说明） | 项目惯例 |
| 2475 前 | `.tone-*` 背景色 4 条为 B 类全局共享 | 见 A1 降级说明 |
| 6590 前 | `.tone-*` 文字色 4 条为 B 类全局共享 | 见 A2 降级说明 |
| 17259 前 | `.level-tag/.status-tag` 基础样式全局共享 | CountyInspectionPage 与 DailyRegulationAnalysisPage 两页共用 |
| 31455 前 | `.level-tag/.status-tag` 配色变体全局共享 | 同上 |

## 乱码选择器还原（live bug 修复）：9 条规则 + 2 处缺逗号，已落盘

| 位置（原行号） | 修复内容 | 依据 |
|----------------|----------|------|
| 31467–31473 | `.level-tag.level-锟?` → `.level-tag.level-高`（红组） | CountyInspectionPage `level-${r.level}` 输出 高/中/低 |
| 31475–31480 | `.level-tag.level-锟?` → `.level-tag.level-中`（琥珀组） | 同上 |
| 31482–31489 | `.level-tag.level-锟?` → `.level-tag.level-低,`（蓝组），**并补齐行末缺失的逗号**（原缺失导致 `.county-inspection-conclusion-list span` 被吞成后代选择器） | 同上 |
| 31894–31895 | `.status-寰呬細锟?` → `.status-待会商,`、`.status-鐮斿垽锟?` → `.status-研判中`，**并补齐首行缺失的逗号** | IllegalCityAnalysisPage 表格第 7 列状态值 |
| 31899 | `.status-寤鸿鍗囩骇` → `.status-建议升级`（注意：原文件在“鸿”后含 PUA 字符 U+E185） | 同上 |
| 31903 | `.status-閫€鍥炶ˉ锟?` → `.status-退回补查` | 同上 |
| 31907 | `.status-宸插舰鎴愭剰锟?` → `.status-已形成意见` | 同上 |

修复效果：CountyInspectionPage 的高/中/低等级标签恢复红/琥珀/蓝着色；IllegalCityAnalysisPage 的 5 个处置状态列恢复文字着色。修复前这些规则因乱码从未命中任何元素。

## C 类（死代码 + 乱码，只注释不还原）：已落盘 5 处注释

| 位置（原行号） | 内容 | 依据 |
|----------------|------|------|
| 2389 前 | `.classify-*` 组件块（至 `.classify-bar`）无 tsx 使用 | 全文检索 0 使用 |
| 21873 前 | `.drill-illegal-algorithm-grid` 无使用；`risk-楂?/涓?` 乱码（原意 risk-高/中） | 全文检索 0 使用 |
| 22036 前 | `.drill-illegal-table` 无使用；`em.risk-楂?/涓?/浣?` 乱码（原意 risk-高/中/低） | 全文检索 0 使用 |
| 33986 前 | `.personnel-table .tag-*` 乱码（原意约为 正常/已到位/低、关注/中、异常/未到位/高），且第 2、6 行行末缺逗号；不做还原 | personnel-table 无 tsx 使用，原意无法可靠还原 |
| 338 前 | `.switch-yes` 无 tsx 使用 | 全文检索 0 使用 |

## 实际修改统计

- 落盘编辑共 **19 处**：选择器还原 8 条规则、缺逗号补齐 2 处、修复注释 2 条、B 类注释 5 条、C 类注释 5 条、顶部惯例注释 1 条（部分合并落盘）。
- 全文 `锟?` 残留：**0**；大括号配平 6528/6528；无新增乱码。

## 验证结果

- `vite build`（ENTRY_KEY=prototypes/system-replica-base）：**通过**（21s）。剩余 css-syntax 警告仅来自 C 类死代码区域（illegal-algorithm-grid ×2、illegal-table ×3、personnel-table 缺逗号），均为修改前已存在的存量警告，本次刻意保留不还原。
- 预览服务 `http://localhost:51721/prototypes/system-replica-base/` 返回 200。
- `git diff --check`：仅存量 LF/CRLF 提示，无新增空白错误。
- V3 首页样式全部在四联类作用域内，未受影响。

## 遗留风险与后续建议

1. **tone-\* 裸规则仍全局泄漏**（B 类 8 条）：后续若要收编，需逐页确认消费者并截图验收，建议按页面逐个推进，不做一次性全局收编。
2. **C 类死代码未删除**：`.classify-*`、`.drill-illegal-algorithm-grid`、`.drill-illegal-table`、`.personnel-table`、`.switch-yes` 待用户确认后删除；其中 personnel-table 的 2 处缺逗号会吞掉同块后续选择器，因整块为死代码暂无活页面影响。
3. **建议视觉抽查两页**：CountyInspectionPage（县级检查，等级标签着色恢复）与 IllegalCityAnalysisPage（市级研判，状态列着色恢复）——这两页是本次乱码还原的直接受益方，渲染会发生「从无色到有色」的可见变化，属预期修复效果。
4. DailyRegulationAnalysisPage 的 `level-tag tone-红色` 使用中文 tone 类，本无规则匹配，维持现状未改动。
5. 静态分析无法穷举 computed style 全部场景（跨组件祖先链、动态 tone 映射），B 类区域后续调整前建议先跑构建+页面抽查。
