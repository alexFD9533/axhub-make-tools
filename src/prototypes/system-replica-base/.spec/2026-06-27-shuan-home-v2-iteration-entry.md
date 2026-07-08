# 蜀安首页 V1 锁定与 V2 迭代入口

## 决策时间

2026-06-27

## 决策内容

同一个原型底座下保留当前蜀安首页 V1，并新增 V2 独立迭代页面。

## V1 锁定版

- 页面地址：`http://127.0.0.1:5175/prototypes/system-replica-base/#/shuan-home-command`
- 页面实现：`src/prototypes/system-replica-base/pages/ShuanHomeConcepts.tsx`
- 后续定位：当前锁定验收版，不再直接承接新迭代需求。

## V2 迭代版

- 页面地址：`http://127.0.0.1:5175/prototypes/system-replica-base/#/shuan-home-command-v2`
- 页面实现：`src/prototypes/system-replica-base/pages/ShuanHomeCommandV2.tsx`
- 根类名：`.shuan-command-v2`
- 后续定位：新需求默认在 V2 上迭代。

## 后续约束

1. 修改 V2 时，不改 V1 页面文件。
2. V2 专属样式优先挂在 `.shuan-command-v2` 下。
3. 向 AI 描述后续需求时，可明确说明：“只改 V2，V1 锁定不要动。”
