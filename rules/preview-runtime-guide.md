# 预览运行时与缓存排障规范

用于 Axhub 框架入口、直连 `/prototypes/...` 入口、React runtime、Vite 依赖预打包、端口残留或 worktree 启动源异常的排查与修复。

## 适用场景

- Axhub 框架入口可用但直连入口报错，或反过来。
- 报错包含 `ReactCurrentDispatcher`、`useState/useEffect/useRef of null/undefined`、`module is not defined`、`Failed to resolve module specifier "react"`。
- `sourceFile` 指向 `node_modules/.vite/deps/chunk-*.js`、`react.js?v=...`、`@axhub_annotation.js` 或 `html-proxy`。
- 同一个错误在刷新、重启、换端口后反复出现。

## 基本判断

Axhub 框架入口和直连入口可能共用业务代码，但不一定共用同一个启动源、端口、浏览器模块缓存或 Vite deps 状态。不要只看页面路径，要看实际返回的 `sourceFile`、端口和进程工作目录。

## 排查顺序

1. **先记录两类入口**
   - Axhub 框架入口：通常带 `agentToolbar=host`、`projectId` 或由 Axhub 管理页嵌入。
   - 直连入口：通常是 `/prototypes/<prototype-name>/#page=<page-id>`。
   - 两边都要保留完整报错里的 `url`、`sourceFile`、`chunk-*.js`、`?v=`。

2. **确认服务端是否仍返回旧 chunk**
   - 直接请求报错中的 `sourceFile`。
   - 如果旧 chunk 返回 `200`，说明服务端或 Vite deps 仍旧，需要停对应进程并清理 deps。
   - 如果旧 chunk 返回 `404`，但浏览器还报它，说明是浏览器标签页或模块缓存残留，需要关闭旧标签页、无痕窗口或强刷。

3. **确认端口对应的实际进程**
   - 用端口查 `OwningProcess`，再看进程命令行。
   - 重点确认是否启动到了 `.codex/worktrees/...`、临时目录、旧项目副本，而不是当前主项目。
   - 如果是旧 worktree，不能只修主项目；要么切回主项目启动，要么同步运行时修复到该 worktree。

4. **确认 Vite deps 是否干净**
   - 检查 `node_modules/.vite/deps/_metadata.json` 的 `browserHash`、`optimized.react.src`、`chunks`。
   - 搜索 deps 中是否还有旧问题特征：`ReactCurrentDispatcher`、`require_jsx_runtime`、`fallbackReact`、旧 `chunk-*.js`。
   - 如果有，停服务后删除对应项目根目录下的 `node_modules/.vite/deps`，再启动服务让它重建。

5. **确认 React runtime 注入顺序**
   - 直连 HTML 必须先注入 React/ReactDOM UMD，再加载预览入口模块。
   - `react-shim.js` 和 `react-dom-shim.js` 不得在模块初始化阶段从 `window.React` / `window.ReactDOM` 解构 hooks。
   - 不要让浏览器直接导入 `node_modules/react/index.js` 或 `node_modules/react-dom/index.js` 这类 CommonJS 文件。

## 修改规范

- Runtime 层修改优先限制在：`src/common/react-shim.js`、`src/common/react-dom-shim.js`、`vite.config.ts`、`vite-plugins/clientPreviewPlugin.ts`、`src/index.html`。
- 不要因为 `ReactCurrentDispatcher`、hooks undefined、deps chunk 报错去改业务页面组件。
- 修改 runtime 后，要清理并重建 Vite deps，确认新 deps 不再包含旧 chunk 或旧特征。
- Vite deps 响应应避免浏览器长期缓存；runtime 文件变化应能带动依赖预打包版本变化。

## 验收要求

每次 runtime 修复后至少验证：

- 直连入口 `/prototypes/<prototype-name>/#page=<page-id>` 可打开。
- Axhub 框架入口或带 `agentToolbar=host` 的入口可打开。
- 当前入口模块导入的是新 `react.js?v=<new-hash>`。
- 报错中不再出现旧 `chunk-*.js?v=<old-hash>`。
- 单入口构建通过：`ENTRY_KEY='prototypes/<prototype-name>'; npx.cmd vite build`。
- 如涉及共享底座，同步验证：`ENTRY_KEY='prototypes/system-replica-base'; npx.cmd vite build`。

## 用户沟通规范

- 不要只说“刷新一下”；要说明是浏览器刷新、关闭旧标签页、重启本地预览服务，还是清理 Vite deps。
- 如果需要停进程，要说明会影响哪个端口和哪个入口，避免误关用户正在使用的浏览器或其他项目服务。
- 如果发现实际启动源是 worktree 或项目副本，要直接告诉用户当前运行的真实路径。
