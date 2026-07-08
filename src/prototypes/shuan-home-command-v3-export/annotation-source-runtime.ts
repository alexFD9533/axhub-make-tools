import type { AnnotationSourceDocument } from '@axhub/annotation';
import baseSource from './annotation-source.json';
import prdShuanHomeV3ExportDoc from './.spec/docs/PRD-蜀安首页V3单页导出.md?raw&v=20260630-doc2';

function cloneSource(): AnnotationSourceDocument {
  return JSON.parse(JSON.stringify(baseSource)) as AnnotationSourceDocument;
}

function normalizeMarkdown(markdown: string): string {
  return markdown.replace(/^\uFEFF/, '');
}

const source = cloneSource();
const prdMarkdown = normalizeMarkdown(prdShuanHomeV3ExportDoc);

source.markdownMap = {
  ...source.markdownMap,
  'prd-shuan-home-v3-export': prdMarkdown,
};

for (const node of source.directory?.nodes ?? []) {
  if (node.type !== 'folder' || !Array.isArray(node.children)) continue;
  for (const child of node.children) {
    if (child.type !== 'markdown' || child.id !== 'prd-shuan-home-v3-export') continue;
    child.title = 'PRD-蜀安首页V3单页导出';
    child.markdown = prdMarkdown;
  }
}

export default source;
