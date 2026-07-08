import type { AnnotationSourceDocument } from '@axhub/annotation';
import baseSource from './annotation-source.json';
import projectOverviewDoc from './.spec/docs/原型版本记录.md?raw';
import smsModuleDoc from './.spec/docs/06-11短信管理模块迭代需求.md?raw';
import hiddenRiskModuleDoc from './.spec/docs/06-23隐蔽面风险综合分析模块迭代需求.md?raw';
import shuanHomeV3ModuleDoc from './.spec/docs/蜀安首页V3产品迭代需求说明（2026-06-30）.md?raw';

function cloneSource(): AnnotationSourceDocument {
  return JSON.parse(JSON.stringify(baseSource)) as AnnotationSourceDocument;
}

type MarkdownDocMeta = {
  displayMarkdown: string;
  title: string;
};

function normalizeMarkdown(markdown: string, fallback: string): MarkdownDocMeta {
  const normalized = markdown.replace(/^\uFEFF/, '');
  const match = normalized.match(/^#\s+(.+)$/m);
  const title = match?.[1]?.trim() || fallback;

  // Annotation viewer currently does not render the first H1 in the body area.
  // Downgrade the leading H1 to H2 for display while keeping the extracted title for the directory node.
  const displayMarkdown = match
    ? normalized.replace(/^#\s+(.+)$/m, '## $1')
    : normalized;

  return {
    title,
    displayMarkdown,
  };
}

const source = cloneSource();
const markdownEntries = {
  'project-overview-doc': normalizeMarkdown(projectOverviewDoc, '原型版本记录'),
  'sms-module-doc': normalizeMarkdown(smsModuleDoc, '短信管理模块产品迭代需求说明'),
  'hidden-risk-module-doc': normalizeMarkdown(hiddenRiskModuleDoc, '隐蔽面风险综合分析模块迭代需求说明'),
  'shuan-home-v3-module-doc': normalizeMarkdown(shuanHomeV3ModuleDoc, '蜀安首页V3产品迭代需求说明'),
} as const;

source.markdownMap = {
  ...source.markdownMap,
  'project-overview-doc': markdownEntries['project-overview-doc'].displayMarkdown,
  'sms-module-doc': markdownEntries['sms-module-doc'].displayMarkdown,
  'hidden-risk-module-doc': markdownEntries['hidden-risk-module-doc'].displayMarkdown,
  'shuan-home-v3-module-doc': markdownEntries['shuan-home-v3-module-doc'].displayMarkdown,
};

for (const node of source.directory?.nodes ?? []) {
  if (node.type !== 'folder' || !Array.isArray(node.children)) continue;
  for (const child of node.children) {
    if (child.type !== 'markdown') continue;
    const markdown = markdownEntries[child.id as keyof typeof markdownEntries];
    if (!markdown) continue;
    child.markdown = markdown.displayMarkdown;
    child.title = markdown.title;
  }
}

export default source;

