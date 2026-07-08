# Axhub Enterprise API 参考

这份文档整理自 `http://jtb.boilyun.cn:61000/static/js/main.e56f912a.chunk.js` 暴露出来的前端调用路径、权限名和错误处理逻辑。

适用原则：

- 下列“已确认接口”可作为站点前端证据使用
- 未列出的项目 / HTML CRUD 接口，不要默认存在
- 如果必须继续深挖，先通过真实请求验证，再向用户说明结论

## 已确认接口

### 认证与配置

- `POST /api/account/login`
  - 用途：前端用 token 建立登录态
  - 观察到的请求体：`token=<token>`
- `GET /api/config/`
  - 用途：读取服务端配置
- `POST /api/config/`
  - 用途：更新服务端配置
- `POST /api/config/verify`
  - 用途：校验配置 / 认证信息，并返回用户类型
- `GET /api/config/check`
  - 用途：检查服务是否已完成配置
- `POST /api/config/usertoken`
  - 用途：生成用户 token

### Token 管理

- `GET /api/tokens/meta`
  - 用途：读取 token scope 元信息、角色 scope
- `GET /api/tokens?status=<status>`
  - 用途：读取 token 列表
  - 前端状态值：`available`、`disabled`、`expired`、`all`
- `POST /api/tokens`
  - 用途：创建 token
- `PUT /api/tokens/:tid`
  - 用途：更新 token
- `POST /api/tokens/:tid/disable`
  - 用途：禁用 token
- `POST /api/tokens/:tid/rotate`
  - 用途：重置 token

### 项目访问校验

- `POST /api/project/verify/`
  - 用途：校验某个项目访问密码
  - 观察到的请求体字段：
    - `path`
    - `password`

## 已确认权限名

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

## 用户角色名

前端里出现过这些角色预设：

- `visitor`
- `teammate`
- `admin`
- `service`
- `extension`

不要把“角色名”直接当作“权限集合”写死，优先以 `/api/tokens/meta` 返回值为准。

## 错误码解释

前端内置了这组错误文案，可直接作为排障解释基线：

- `400`：请求参数不正确
- `401`：登录已过期或权限不足，需要重新输入访问 Token
- `403`：没有权限执行该操作
- `404`：接口不存在，请检查服务地址或刷新页面后重试
- `500`：服务器错误，请稍后重试

## 排障建议

### 401 / 403

优先检查：

1. token 是否已失效
2. token scope 是否缺少对应权限
3. 会话是否未建立，是否只拿到了 token 但没走登录
4. token 是否被禁用
5. 是否命中了 IP 白名单或项目范围限制

### 404

优先检查：

1. 服务根地址是否正确
2. 这是不是一个只在前端路由中出现、但后端并未暴露的路径
3. 请求是否应该发到 `/api/...` 而不是页面路由

### 需要创建或发布 HTML 时

当前前端证据只明确暴露了相关权限名 `html:read`、`html:create`、`html:publish`，但没有在已抓到的片段里直接暴露完整 HTML CRUD 接口路径。

因此处理这类需求时应采用下面顺序：

1. 先确认 token 具备 `html:create` / `html:publish`
2. 先做只读探测或通过现有页面行为复核接口
3. 如果需要尝试推断接口，必须明确告诉用户“这是推断，不是已确认接口”
