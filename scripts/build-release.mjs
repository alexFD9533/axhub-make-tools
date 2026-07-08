/**
 * build-release.mjs - 构建发布包
 *
 * 使用方法:
 *   node scripts/build-release.mjs
 *
 * 功能:
 *   1. 用 Vite JavaScript API 构建单个入口原型（IIFE 模式）
 *   2. 生成独立可访问的 index.html
 *   3. 将产物打包为 zip
 *   4. 给出堡垒机操作指引
 */

import { build as viteBuild } from "vite";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function readConfig() {
  const configPath = path.join(projectRoot, "deploy.config.json");
  if (!fs.existsSync(configPath)) {
    console.error("缺少 deploy.config.json，请先创建发布配置文件。");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

async function buildRelease() {
  const config = readConfig();
  const { entryKey, releaseDir, prototypeName, defaultHash, publicUrl, sftp } = config;
  const releasePath = path.resolve(projectRoot, releaseDir);
  const distJsPath = path.resolve(projectRoot, "dist", ...entryKey.split("/")) + ".js";
  const releaseJsName = entryKey.replace("/", "-") + ".js";
  const releaseJsPath = path.join(releasePath, releaseJsName);
  const buildVersion = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);

  console.log("========== 发布包构建 ==========");
  console.log("原型:", prototypeName);
  console.log("入口:", entryKey);
  console.log("");

  // 步骤 1: 用 Vite API 构建
  console.log("[1/3] 构建原型...");
  process.env.ENTRY_KEY = entryKey;
  try {
    await viteBuild({ logLevel: "info" });
  } catch (err) {
    console.error("构建失败:", err.message || err);
    process.exit(1);
  }

  // 步骤 2: 创建发布目录并复制 JS
  console.log("[2/3] 生成发布文件...");
  fs.mkdirSync(releasePath, { recursive: true });

  // 先清理旧的发布文件
  for (const f of fs.readdirSync(releasePath)) {
    const fp = path.join(releasePath, f);
    if (f.endsWith(".js") || f === "index.html") {
      fs.rmSync(fp, { force: true });
    }
  }

  if (!fs.existsSync(distJsPath)) {
    const altPattern = path.join(projectRoot, "dist");
    const found = findJsFile(altPattern);
    if (found) {
      fs.copyFileSync(found, releaseJsPath);
      console.log("  JS:", releaseJsName);
    } else {
      console.error("构建产物未找到:", distJsPath);
      process.exit(1);
    }
  } else {
    fs.copyFileSync(distJsPath, releaseJsPath);
    console.log("  JS:", releaseJsName);
  }

  const htmlContent = [
    "<!doctype html>",
    '<html lang="zh-CN">',
    "<head>",
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">',
    '  <meta http-equiv="Pragma" content="no-cache">',
    '  <meta http-equiv="Expires" content="0">',
    "  <title>" + prototypeName + "</title>",
    "  <script>",
    '    window.__AXHUB_DEFINE_COMPONENT__ = function(Component) {',
    "      window._AXHUB_PAGE_COMPONENT = Component;",
    '      if (document.readyState === "loading") {',
    '        document.addEventListener("DOMContentLoaded", renderComponent);',
    "      } else {",
    "        renderComponent();",
    "      }",
    "    };",
    "    function renderComponent() {",
    '      var root = document.getElementById("root");',
    "      if (root && window.React && window.ReactDOM && window._AXHUB_PAGE_COMPONENT) {",
    "        if (window.ReactDOM.createRoot) {",
    "          window.ReactDOM.createRoot(root).render(window.React.createElement(window._AXHUB_PAGE_COMPONENT));",
    "        } else {",
    "          window.ReactDOM.render(window.React.createElement(window._AXHUB_PAGE_COMPONENT), root);",
    "        }",
    "      }",
    "    }",
    "  </script>",
    '  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>',
    '  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>',
    "</head>",
    "<body>",
    '  <div id="root"></div>',
    '  <script src="./' + releaseJsName + "?v=" + buildVersion + '"></script>',
    "</body>",
    "</html>",
  ].join("\n");

  fs.writeFileSync(path.join(releasePath, "index.html"), htmlContent, "utf8");
  console.log("  HTML: index.html");
  console.log("");

  // 清理构建临时产物
  console.log("清理临时文件...");
  const distDir = path.resolve(projectRoot, "dist");
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }

  // 步骤 3: 打包为 zip
  console.log("[3/3] 打包为 zip...");
  const zipName = "zgpt.zip";
  const zipPath = path.resolve(projectRoot, "release", zipName);
  if (fs.existsSync(zipPath)) {
    fs.rmSync(zipPath, { force: true });
  }

  try {
    execSync(
      `powershell -NoProfile -Command "Compress-Archive -Path '${releasePath}\\*' -DestinationPath '${zipPath}' -Force"`,
      { stdio: "pipe" }
    );
    console.log("  ZIP:", zipName, `(${(fs.statSync(zipPath).size / 1024).toFixed(0)} KB)`);
  } catch {
    console.log("  ZIP 打包失败，请手动压缩 release/zgpt/ 目录");
  }

  const accessUrl = publicUrl + (defaultHash || "");
  console.log("");
  console.log("✅ 发布包构建完成");
  console.log("=".repeat(50));
  console.log("");
  console.log("【堡垒机发布步骤】");
  console.log("");
  console.log("1. 打开堡垒机网址，找到服务器 168.168.168.182");
  console.log("2. 右键 → 文件传输，将以下文件拖到 /tmp/：");
  console.log("     " + path.resolve(projectRoot, "release", zipName));
  console.log("");
  console.log("3. 右键 → Web 终端，登录后执行：");
  console.log("");
  console.log("     cd /tmp && unzip -o zgpt.zip -d " + sftp.serverDir);
  console.log("     rm -f /tmp/zgpt.zip");
  console.log("");
  console.log("完成！访问地址：");
  console.log("     " + accessUrl);
}

function findJsFile(dir) {
  if (!fs.existsSync(dir)) return null;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findJsFile(fullPath);
      if (found) return found;
    } else if (entry.name.endsWith(".js")) {
      return fullPath;
    }
  }
  return null;
}

buildRelease().catch((err) => {
  console.error("发布包构建失败:", err);
  process.exit(1);
});
