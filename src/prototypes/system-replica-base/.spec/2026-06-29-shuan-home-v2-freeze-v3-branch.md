# 蜀安首页方案A V2封板与V3迭代分支

日期：2026-06-29

## 决策

- `蜀安首页方案A V2` 作为当前封板版本保留，不再直接承接新的迭代修改。
- 基于 V2 当前实现复制出 `蜀安首页方案A V3`，作为后续继续迭代的工作版本。

## 页面与实现

- V2 页面地址：`#/shuan-home-command-v2`
- V2 实现文件：`src/prototypes/system-replica-base/pages/ShuanHomeCommandV2.tsx`
- V3 页面地址：`#/shuan-home-command-v3`
- V3 实现文件：`src/prototypes/system-replica-base/pages/ShuanHomeCommandV3.tsx`

## 维护规则

- 后续针对“蜀安首页方案A”的新探索和调整，默认落在 V3 文件与路由上。
- 如确需回改 V2，需要先明确说明原因，避免破坏封板版本。
