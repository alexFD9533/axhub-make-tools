---
name: axhub-enterprise-api
description: 使用 Axhub Enterprise Token 查看项目、校验权限、排查认证问题，并基于 Enterprise 服务完成项目与 HTML 发布相关操作时使用。适用于“我有企业版 token，帮我查项目 / 校验权限 / 调接口 / 发 HTML / 排查 401 403”这类请求。
---

# Axhub Enterprise API

用于通过 Axhub Enterprise 服务端接口完成认证、权限校验、项目读取，以及与 HTML 发布相关的 API 操作。

这个技能安装自站内技能入口 `http://jtb.boilyun.cn:61000/skills/axhub-enterprise-api/SKILL.md` 的同名项目技能位。当前站点没有直接暴露原始 Markdown 文件，因此本技能依据部署站点前端已暴露的接口、权限名和交互流程重建，优先保证在当前项目中可执行、可复用、可排障。

## 命中场景

- 用户给了 Axhub Enterprise 服务地址和 token，希望读取项目、验证权限或排查登录问题
- 用户要确认某个 token 是否具备 `project` / `html` / `config` / `token` 相关权限
- 用户要“创建并发布 HTML 项目”或排查发布链路卡在哪个接口
- 用户要定位 401 / 403 / 404 / 500 这类 Enterprise API 问题

## 快速分流

- 认证、token、权限范围、错误码排查：读 `references/api-endpoints.md`
- 只是想看当前项目里已有 Axhub 原型/批注能力：优先用现有 `prototype-*` 或 `canvas-workspace`
- 只是普通网页抓取，不涉及 Enterprise token：不要误用本技能

## 工作流

1. 先确认最小输入：
   - 服务地址，例如 `http://host:port`
   - Token，或用户当前已登录的会话
   - 目标动作：查项目、校验权限、创建项目、发布 HTML、排查错误
2. 先做可达性与配置校验：
   - 优先检查 `/api/config/check`
   - 需要鉴权时，再走 token 登录或校验
3. 如果用户只有 token，没有现成登录态：
   - 优先参考 `/api/account/login` 或 `/api/config/verify` 流程建立会话
   - 不要假设任意接口都支持把 token 直接塞到 query 里
4. 如果目标是权限排查：
   - 先读取 `/api/tokens/meta`
   - 对照 scope 判断缺的是 `project:read`、`project:create`、`html:create`、`html:publish`、`config:read` 还是 `token:manage`
5. 如果目标是项目 / HTML 操作：
   - 先说明当前已确认的接口和未确认的接口
   - 只调用已知接口；对未在前端证据中出现的接口，先明确说明是推断，不要伪装成已证实
6. 遇到报错时：
   - 保留请求目标、HTTP 状态、返回 message
   - 按错误码解释，再给下一步排查动作

## 已确认的权限名

前端代码中已明确出现这些 scope：

- `prototype:view`
- `project:read`
- `project:create`
- `project:update`
- `project:delete`
- `folder:write`
- `html:read`
- `html:create`
- `html:publish`
- `config:read`
- `config:write`
- `token:manage`
- `chrome:sync`

## 执行原则

- 先验证，再写操作；不要上来就改配置或创建资源
- 区分“已从部署前端确认”的接口与“基于命名推断”的接口
- 如果站点接口返回 401 / 403，优先从 token 权限、会话失效、IP 白名单、项目范围四个方向排查
- 如果用户要做真实发布，必须把将要调用的接口、输入和风险讲清楚

## 完成回复

最终回复至少包含：

- 这次使用了哪个 Enterprise API 子流程
- 已确认的接口/权限有哪些
- 哪些结论来自站点前端证据，哪些只是推断
- 如果做了请求验证，返回了什么结果

## 参考

- `references/api-endpoints.md`
