#!/usr/bin/env node
/**
 * 快速存档脚本 - 一键保存当前进度到 Git
 * 
 * 用法:
 *   node scripts/quick-save.mjs           # 自动提交并推送到远程
 *   node scripts/quick-save.mjs "消息"     # 使用自定义提交信息
 *   node scripts/quick-save.mjs --push    # 只推送不提交（已有本地提交时）
 *   node scripts/quick-save.mjs --status  # 只查看状态
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

// 颜色输出
const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  blue: (s) => `\x1b[34m${s}\x1b[0m`,
  gray: (s) => `\x1b[90m${s}\x1b[0m`,
};

function run(cmd, options = {}) {
  return execSync(cmd, {
    cwd: PROJECT_ROOT,
    encoding: 'utf-8',
    stdio: options.silent ? 'pipe' : 'inherit',
    ...options,
  });
}

function runSilent(cmd) {
  try {
    return run(cmd, { silent: true }).trim();
  } catch (e) {
    return null;
  }
}

function getGitStatus() {
  const status = runSilent('git status --short') || '';
  const lines = status.split('\n').filter(Boolean);
  
  const modified = [];
  const added = [];
  const deleted = [];
  const untracked = [];
  
  for (const line of lines) {
    const code = line.slice(0, 2);
    const file = line.slice(3);
    
    if (code === '??') {
      untracked.push(file);
    } else if (code.startsWith('D') || code.endsWith('D')) {
      deleted.push(file);
    } else if (code.startsWith('A') || code === ' M') {
      added.push(file);
    } else {
      modified.push(file);
    }
  }
  
  return { modified, added, deleted, untracked, total: lines.length };
}

function getLastCommitTime() {
  const time = runSilent('git log -1 --format=%cd --date=format:"%Y-%m-%d %H:%M"');
  return time || '未知';
}

function getCurrentBranch() {
  return runSilent('git branch --show-current') || 'unknown';
}

function getRemoteUrl() {
  return runSilent('git remote get-url origin') || '未配置';
}

function generateCommitMessage(status) {
  const parts = [];
  
  if (status.added.length > 0) {
    parts.push(`新增 ${status.added.length} 个文件`);
  }
  if (status.modified.length > 0) {
    parts.push(`修改 ${status.modified.length} 个文件`);
  }
  if (status.deleted.length > 0) {
    parts.push(`删除 ${status.deleted.length} 个文件`);
  }
  
  if (parts.length === 0) {
    return 'chore: 快速存档';
  }
  
  return `save: ${parts.join('，')}`;
}

function showStatus() {
  console.log(c.blue('═══ 项目状态 ═══'));
  console.log(`分支: ${c.yellow(getCurrentBranch())}`);
  console.log(`远程: ${c.gray(getRemoteUrl())}`);
  console.log(`上次提交: ${c.gray(getLastCommitTime())}`);
  console.log();
  
  const status = getGitStatus();
  
  if (status.total === 0) {
    console.log(c.green('✓ 工作区干净，没有未保存的改动'));
    return false;
  }
  
  console.log(c.yellow(`⚠ 有 ${status.total} 个未保存的改动:`));
  
  if (status.modified.length > 0) {
    console.log(c.blue(`\n  修改 (${status.modified.length}):`));
    status.modified.slice(0, 10).forEach(f => console.log(`    • ${f}`));
    if (status.modified.length > 10) console.log(`    ... 还有 ${status.modified.length - 10} 个`);
  }
  
  if (status.added.length > 0) {
    console.log(c.blue(`\n  新增 (${status.added.length}):`));
    status.added.slice(0, 10).forEach(f => console.log(`    + ${f}`));
    if (status.added.length > 10) console.log(`    ... 还有 ${status.added.length - 10} 个`);
  }
  
  if (status.deleted.length > 0) {
    console.log(c.blue(`\n  删除 (${status.deleted.length}):`));
    status.deleted.forEach(f => console.log(`    - ${f}`));
  }
  
  if (status.untracked.length > 0) {
    console.log(c.blue(`\n  未跟踪 (${status.untracked.length}):`));
    status.untracked.slice(0, 10).forEach(f => console.log(`    ? ${f}`));
    if (status.untracked.length > 10) console.log(`    ... 还有 ${status.untracked.length - 10} 个`);
  }
  
  return true;
}

function quickSave(customMessage) {
  // 1. 检查是否有改动
  const status = getGitStatus();
  
  if (status.total === 0) {
    console.log(c.green('✓ 没有需要保存的改动'));
    
    // 检查是否有未推送的提交
    const unpushed = runSilent('git log origin/main..HEAD --oneline');
    if (unpushed) {
      console.log(c.yellow('⚠ 有未推送的提交，正在推送...'));
      run('git push origin HEAD:main');
      console.log(c.green('✓ 推送完成'));
    }
    return;
  }
  
  // 2. 生成提交信息
  const message = customMessage || generateCommitMessage(status);
  console.log(c.blue(`提交信息: "${message}"`));
  console.log();
  
  // 3. 添加所有改动
  console.log(c.gray('→ 添加文件...'));
  run('git add -A');
  
  // 4. 提交
  console.log(c.gray('→ 提交...'));
  run(`git commit -m "${message}"`);
  
  // 5. 推送到远程
  console.log(c.gray('→ 推送到 GitHub...'));
  run('git push origin HEAD:main');
  
  // 6. 显示结果
  console.log();
  console.log(c.green('✓ 存档成功！'));
  console.log(c.gray(`  提交: ${message}`));
  console.log(c.gray(`  时间: ${new Date().toLocaleString('zh-CN')}`));
  console.log(c.gray(`  远程: https://github.com/alexFD9533/axhub-make-tools`));
}

// ============ 主程序 ============

const args = process.argv.slice(2);

// 帮助信息
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
快速存档脚本

用法:
  node scripts/quick-save.mjs              自动提交并推送
  node scripts/quick-save.mjs "自定义消息"  使用自定义提交信息
  node scripts/quick-save.mjs --status     只查看状态
  node scripts/quick-save.mjs --push       只推送已有提交
  node scripts/quick-save.mjs --help       显示帮助

示例:
  node scripts/quick-save.mjs "feat: 完成隐患治理页面"
`);
  process.exit(0);
}

// 只查看状态
if (args.includes('--status') || args.includes('-s')) {
  showStatus();
  process.exit(0);
}

// 只推送
if (args.includes('--push') || args.includes('-p')) {
  console.log(c.gray('→ 推送到 GitHub...'));
  run('git push origin HEAD:main');
  console.log(c.green('✓ 推送完成'));
  process.exit(0);
}

// 先显示状态
const hasChanges = showStatus();
console.log();

// 获取自定义消息（第一个非选项参数）
const customMessage = args.find(a => !a.startsWith('-'));

// 执行存档
if (hasChanges || customMessage) {
  quickSave(customMessage);
} else {
  console.log(c.gray('没有需要保存的改动'));
}
