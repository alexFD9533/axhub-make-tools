import type { AnnotationSourceDocument } from '@axhub/annotation';
import baseSource from './annotation-source.json';
import prdShuanHomeDoc from './.spec/docs/PRD-蜀安首页功能模块说明.md?raw';
import illegalCampaignTaskClosureDoc from './.spec/docs/打非治违任务闭环业务说明（2026-07-15）.md?raw';

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
  const displayMarkdown = match
    ? normalized.replace(/^#\s+(.+)$/m, '## $1')
    : normalized;

  return {
    title: match?.[1]?.trim() || fallback,
    displayMarkdown,
  };
}

const source = cloneSource();
const prdMarkdown = normalizeMarkdown(prdShuanHomeDoc, 'PRD-蜀安首页功能模块说明');
const illegalCampaignTaskClosureMarkdown = normalizeMarkdown(
  illegalCampaignTaskClosureDoc,
  '打非治违任务闭环业务说明（2026-07-15）',
);

source.markdownMap = {
  ...source.markdownMap,
  'prd-shuan-home-v3-export': prdMarkdown.displayMarkdown,
  'illegal-campaign-task-closure-business': illegalCampaignTaskClosureMarkdown.displayMarkdown,
};

for (const node of source.directory?.nodes ?? []) {
  if (node.type !== 'folder' || !Array.isArray(node.children)) continue;
  for (const child of node.children) {
    if (child.type !== 'markdown') continue;
    if (child.id === 'prd-shuan-home-v3-export') {
      child.title = prdMarkdown.title;
      child.markdown = prdMarkdown.displayMarkdown;
    }
    if (child.id === 'illegal-campaign-task-closure-business') {
      child.title = illegalCampaignTaskClosureMarkdown.title;
      child.markdown = illegalCampaignTaskClosureMarkdown.displayMarkdown;
    }
  }
}

export default source;
