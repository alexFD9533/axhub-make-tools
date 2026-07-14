import type { AnnotationSourceDocument } from '@axhub/annotation';
import baseSource from './annotation-source.json';
import prdShuanHomeDoc from './.spec/docs/PRD-蜀安首页功能模块说明.md?raw';

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

source.markdownMap = {
  ...source.markdownMap,
  'prd-shuan-home-v3-export': prdMarkdown.displayMarkdown,
};

for (const node of source.directory?.nodes ?? []) {
  if (node.type !== 'folder' || !Array.isArray(node.children)) continue;
  for (const child of node.children) {
    if (child.type !== 'markdown' || child.id !== 'prd-shuan-home-v3-export') continue;
    child.title = prdMarkdown.title;
    child.markdown = prdMarkdown.displayMarkdown;
  }
}

export default source;
