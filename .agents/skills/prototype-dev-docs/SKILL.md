---
name: prototype-dev-docs
description: 原型调整后同步维护开发向文档时使用：更新项目级原型版本记录、模块级产品迭代需求说明、原型说明面板目录与文档引用，确保文档是用户写给开发的交付物，不是对用户的聊天总结。
---

# 原型开发文档

用于 `src/prototypes/` 下原型迭代完成后的开发文档同步。核心原则：文档是用户写给开发看的交付物，记录“改了什么、开发需要知道什么、如何验收”，不要写成助手对用户的说明。

## 默认触发

当用户表达以下意图时使用：

- “改完原型后把 PRD 写了”
- “同步开发文档”
- “补版本记录”
- “补模块需求说明”
- “按我这个思路写 PRD”
- 原型页面、字段、交互、只读/可编辑口径发生变化，并需要沉淀给开发

## 文档分工

- 项目级总账：`src/prototypes/<prototype-id>/.spec/docs/原型版本记录.md`
  - 记录当前原型整体调整清单、占位范围、数据口径、后续按日期追加的变化。
- 模块级需求说明：`src/prototypes/<prototype-id>/.spec/docs/<模块名>产品迭代需求说明（YYYY-MM-DD）.md`
  - 记录某个模块本次迭代的背景、目标、范围、页面结构、字段、交互约束、验收标准。
- 原型说明面板：`annotation-source.json` + `annotation-source-runtime.ts`
  - 目录标题必须和指向的 Markdown 文件名一致。
  - Markdown 正文应从独立 `.md` 文件 `?raw` 导入，不要再把长文案写死在 JSON 字符串里。

## 写作口径

使用开发交付物口径：

- 直接列调整内容，不写“我做了”“你可以”“建议你”等对话语气。
- 先写事实清单，再写开发需要知道的边界。
- 页面表现写清楚：新增入口、字段变化、状态切换、只读/可编辑变化、验收标准。
- 后续迭代按日期追加，不覆盖用户已写内容。
- 用户已改过的 Markdown 是第一信源；需要补充时沿用它的结构和语气。

## 执行流程

1. 定位原型目录，例如 `src/prototypes/system-replica-base/`。
2. 读取现有 `.spec/docs/` 文档、`annotation-source.json`、`annotation-source-runtime.ts`。
3. 判断本次变化属于项目级、模块级，或两者都需要更新。
4. 修改原型代码后，同步维护对应 Markdown：
   - 项目级变化追加到 `原型版本记录.md`。
   - 模块级变化追加或新建模块产品迭代需求说明。
5. 如果新增或改名文档，同步更新：
   - `annotation-source.json` 的目录节点标题。
   - `annotation-source-runtime.ts` 的 `?raw` 导入和注入映射。
6. 验证：
   - Markdown 文件可读。
   - JSON 结构合法。
   - 运行当前原型的构建或项目约定的预览验证。

## 模板

需要新建文档时，优先参考：

- `src/prototypes/<prototype-id>/.spec/docs/templates/原型版本记录-template.md`
- `src/prototypes/<prototype-id>/.spec/docs/templates/模块产品迭代需求说明-template.md`
