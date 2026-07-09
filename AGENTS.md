# Agents 工作流程说明

## 🧭 工作流程

| 步骤 | 说明 | 参考文档 |
|------|------|----------|
| ① 读取上下文 | 系统规则、用户资料、相关规范、已有原型与资源目录 | — |
| ② 产品需求对齐 | 新建原型、明显重构或需求模糊时，先收敛目标用户、核心任务、范围、功能清单、内容来源和验收重点 | `rules/requirements-alignment-guide.md` |
| ③ 设计方案对齐 | 产品需求确认后，先让用户从 3-4 个带预览链接的 `DESIGN.md` 候选中确认设计基底，再收敛为设计决策 | `rules/requirements-alignment-guide.md` |
| ④ 原型开发与验收 | 根据已确认方案实现原型；遇到问题按错误信息定位修复，并完成预览验收 | `rules/prototype-development-guide.md` |
| ⑤ 预览运行时排障 | Axhub 框架入口、直连入口、React runtime、Vite deps、端口或 worktree 异常时，先按运行时规则定位，不盲目改业务页面 | `rules/preview-runtime-guide.md` |

## 额外产物

| 产物/场景 | 位置 | 参考文档 |
|-----------|------|----------|
| 主题 | `src/themes/<theme-key>/` | `rules/theme-guide.md` |
| 项目资料和文档 | `src/resources/` | `rules/resource-management-guide.md` |
| UI Review 结论 | `src/prototypes/<prototype-name>/.spec/ui-review.md` | `rules/ui-review-guide.md` |
| 原型 Review 结论 | `src/prototypes/<prototype-name>/.spec/prototype-review.md` | `rules/prototype-review-guide.md` |
| 原型开发文档 | `src/prototypes/<prototype-name>/.spec/docs/` | `.agents/skills/prototype-dev-docs/SKILL.md` |

## ⚠️ 重要原则

1. **产品需求和设计方案分阶段对齐**
   - 先确认做什么，再确认怎么表达；读取资料、规格/计划确认和开发验收过程中，发现影响方向的问题都要回到相应阶段继续对齐

   | 阶段 | 需要对齐的情况 |
   |------|----------------|
   | 读取资料 | 目标、边界、素材、参考或约束不清 |
   | 产品需求 | 出现不同目标用户、功能范围、内容来源或验收标准 |
   | 设计方案 | 出现不同信息架构、交互路径、视觉方向或设计基底 |
   | 开发验收 | 实现结果、体验取舍或验收标准发生变化 |

2. **优先创建和维护 task/todo**
   - 多步骤、高风险、需求对齐、方案确认或跨文件任务，优先用 task/todo 记录当前步骤、状态和下一步
   - 简单局部修改可以保持轻量，但要清楚说明当前正在处理什么、完成后如何验收
3. **设计要判断何时收敛、何时发散**
   - AI 应自行判断当前需要收拢需求还是探索解法：需求不清先收敛；需要改善体验或创新表达时再发散。发散是为了帮助用户选择最终方向
4. **不要把截图当唯一真相**
   - 截图用于视觉参考；有代码、组件、设计系统、业务资料或用户说明时，要结合上下文判断
5. **早展示，早反馈**
   - 产品需求、设计方案或原型应尽早交给用户确认，不要等到全部完成后才暴露方向问题
   - 涉及页面意图、组件取舍、多方案比稿时，优先用「设计决策」这类用户能理解的说法，不用旧的属性类说法描述主流程
6. **讲人话，用户不懂技术**
   - 用用户能理解的方式说明取舍、风险和结果；用户无法执行 CLI 命令，不得省略验收流程
   - 向用户请求反馈或验收时，提醒用户尽量提供截图、预览链接、页面路径或具体问题位置，便于准确定位和复现
7. **原型改动同步开发文档**
   - 原型调整后，如用户要求“补 PRD”“补开发文档”“补版本记录”，使用 `.agents/skills/prototype-dev-docs/SKILL.md`
   - 文档是用户写给开发看的交付物，不是 AI 写给用户的聊天总结
   - 项目级变化追加到 `src/prototypes/<prototype-name>/.spec/docs/原型版本记录.md`
   - 模块级变化写入或新建 `src/prototypes/<prototype-name>/.spec/docs/<模块名>产品迭代需求说明（YYYY-MM-DD）.md`
   - 原型说明面板里的文档标题应与实际 Markdown 文件名一致
   - 长文档正文应维护在独立 `.md` 文件中，再由原型运行时读取，不要写死在 `annotation-source.json` 的长字符串里
8. **预览运行时问题先查环境链路**
   - Axhub 框架入口和 `/prototypes/...` 直连入口报错时，不默认归因于页面代码；先按 `rules/preview-runtime-guide.md` 核对端口、进程工作目录、Vite deps、React runtime 和浏览器缓存
   - 涉及 `src/common/react-shim.js`、`src/common/react-dom-shim.js`、`vite.config.ts`、`vite-plugins/clientPreviewPlugin.ts` 的修改，必须同时验证 Axhub 框架入口和直连入口
   - 发现 Axhub 启动到 `.codex/worktrees/...` 等项目副本时，要明确说明当前实际启动源，并同步运行时修复或切回主项目，避免只修 D 盘主项目


## 系统复刻与迭代规则

适用于 `src/prototypes/system-replica-base/` 及后续基于现有系统截图/链接的模块复刻与优化：

1. **先复刻底稿，再做优化**
   - 用户提供页面截图或链接时，先在既有底座中高保真复刻原页面，作为优化底稿；用户确认“像不像”后，再继续调整信息层级、交互路径、视觉表现或业务说明。
2. **优先复用系统底座**
   - 顶部导航、左侧菜单、内容容器、查询区、工具条、表格、分页、详情分组、字段表格、弹窗/抽屉、空状态和模块占位页应尽量复用，不为单个页面另起一套重复框架。
3. **按需复刻，不全量铺开**
   - 不提前全系统高保真复刻；当前要优化哪个模块，就先复刻哪个模块。未复刻菜单保持占位页，提示用户提供截图、链接、页面路径或具体问题位置。
4. **固定底座入口**
   - 默认在 `src/prototypes/system-replica-base/` 延展页面；原型显示名保持为“煤矿安全综合监控平台”。确需新建原型或改底座结构时，先说明原因并回到需求/设计对齐。
5. **保留决策快照**
   - 影响底座复用、页面范围、模块结构或优化方向的确认结果，归档到对应原型 `.spec/` 下，文件名包含日期。
## 项目结构

```text
├── src/
│   ├── common/      # 公共运行时、类型和工具
│   ├── prototypes/  # 原型页面目录
│   ├── resources/   # 项目资料、文档和素材
│   └── themes/      # 主题与设计规范
├── rules/           # Agent 工作规则
└── .axhub/make/     # 本地运行数据和项目 metadata
```

