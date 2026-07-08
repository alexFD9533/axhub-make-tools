# ZGPT 原型自助发布流程（JumpServer）

适用项目：`D:\地方综管平台\dfzg-project-20260611`

目标地址：`http://168.168.168.182:18081/zgpt/#page=placeholder-shift-query`

目标服务器：`应用测试-182 / 168.168.168.182`

正式发布目录：`/data/apps/html/static/zgpt/`

## 什么时候用这份流程

更新 `src/prototypes/system-replica-base/` 后，需要把“煤矿安全综合监控平台”原型发布到公司测试服务器时使用。

## 一、在本地生成发布包

在项目目录执行：

```powershell
cd /d D:\地方综管平台\dfzg-project-20260611
npm run release
```

也可以双击项目根目录下的：

```text
构建发布包.bat
```

成功后确认有这个文件：

```text
D:\地方综管平台\dfzg-project-20260611\release\zgpt.zip
```

同时 `release\zgpt\` 里应至少包含：

```text
index.html
prototypes-system-replica-base.js
```

## 二、通过 JumpServer 上传 zip

1. 打开 JumpServer：`https://www.boilyun.cn:8888/`
2. 进入 `应用测试-182 / 168.168.168.182` 的“文件管理”。
3. 左侧点选：

```text
Default / 旧机柜-168测试 / 应用测试-182
```

注意：这一层就是服务器临时上传区，对应服务器 `/tmp`。不要进入它下面旧的 `zgpt` 文件夹。

4. 上传本地文件：

```text
D:\地方综管平台\dfzg-project-20260611\release\zgpt.zip
```

上传成功后，右侧应看到：

```text
zgpt.zip
```

## 三、在 Web 终端确认上传位置

打开 `应用测试-182` 的 Web 终端，先执行：

```bash
ls -lh /tmp/zgpt.zip
```

正常应看到约 `312K` 的 zip 文件。

如果提示“没有那个文件或目录”，通常是上传层级错了。用下面命令找一下：

```bash
find /tmp -maxdepth 3 -name 'zgpt.zip' -ls
```

如果找到了但不在 `/tmp/zgpt.zip`，把它移动到 `/tmp/zgpt.zip`，或删除后重新上传到 `应用测试-182` 这一层。

## 四、解压覆盖正式目录

如果当前不是 root，先执行：

```bash
su -
```

输入 root 密码后执行：

```bash
cd /tmp && unzip -o zgpt.zip -d /data/apps/html/static/zgpt/
rm -f /tmp/zgpt.zip
```

说明：

- `unzip -o` 会覆盖旧文件，不需要一个个确认。
- 只操作 `/tmp/zgpt.zip` 和 `/data/apps/html/static/zgpt/`。
- 不要删除服务器其他目录。

## 五、验证发布结果

执行：

```bash
ls -lah /data/apps/html/static/zgpt/index.html /data/apps/html/static/zgpt/prototypes-system-replica-base.js
```

看文件时间是否为刚刚发布的时间。

然后浏览器访问：

```text
http://168.168.168.182:18081/zgpt/#page=placeholder-shift-query
```

如果页面看起来还是旧的，按：

```text
Ctrl + F5
```

## 常见问题

### 1. `/tmp/zgpt.zip` 不存在

说明 zip 没传到 `应用测试-182` 这一层，可能传进了 `/tmp/zgpt/` 文件夹。

处理：

```bash
find /tmp -maxdepth 3 -name 'zgpt.zip' -ls
```

### 2. `cp` 或写入正式目录提示权限不够

说明当前还是 `superman` 用户。执行：

```bash
su -
```

再执行发布命令。

### 3. 页面没更新

先确认正式目录文件时间：

```bash
ls -lah /data/apps/html/static/zgpt/index.html /data/apps/html/static/zgpt/prototypes-system-replica-base.js
```

如果时间正确，浏览器强制刷新：`Ctrl + F5`。

## 推荐长期优化

让运维在服务器上配置一个只负责发布的脚本，例如 `/root/deploy-zgpt.sh`：

```bash
#!/bin/bash
set -e

SRC="/tmp/zgpt.zip"
DEST="/data/apps/html/static/zgpt"

test -f "$SRC"
unzip -o "$SRC" -d "$DEST/"
rm -f "$SRC"
ls -lah "$DEST/index.html" "$DEST/prototypes-system-replica-base.js"
echo "发布完成：$DEST"
```

以后上传 zip 后只需要：

```bash
su -
bash /root/deploy-zgpt.sh
```
