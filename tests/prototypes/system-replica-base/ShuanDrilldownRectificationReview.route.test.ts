import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const dataSource = readFileSync(
  join(process.cwd(), 'src/prototypes/system-replica-base/pages/shuan-drilldowns/data.ts'),
  'utf8',
);
const pagesSource = readFileSync(
  join(process.cwd(), 'src/prototypes/system-replica-base/pages/shuan-drilldowns/ShuanDrilldownPages.tsx'),
  'utf8',
);
const homeV3Source = readFileSync(
  join(process.cwd(), 'src/prototypes/system-replica-base/pages/ShuanHomeCommandV3.tsx'),
  'utf8',
);
const exportSource = readFileSync(
  join(process.cwd(), 'src/prototypes/shuan-home-command-v3-export/index.tsx'),
  'utf8',
);
const runtimeSource = readFileSync(
  join(process.cwd(), 'src/prototypes/system-replica-base/annotation-source-runtime.ts'),
  'utf8',
);
const annotationSource = readFileSync(
  join(process.cwd(), 'src/prototypes/system-replica-base/annotation-source.json'),
  'utf8',
);

describe('rectification review drilldown registration', () => {
  it('registers the rectification review route in drilldown data and page dispatch', () => {
    expect(dataSource).toContain('shuan-home-command-v3-illegal-disposal-rectification-review');
    expect(dataSource).toContain('整改复核 / 县级协同处置');
    expect(pagesSource).toContain('shuanRectificationReviewData.route');
    expect(pagesSource).toContain('<RectificationReviewPage');
  });

  it('wires the new developer-facing document into the annotation runtime', () => {
    expect(runtimeSource).toContain('rectificationReviewModuleDoc');
    expect(runtimeSource).toContain('rectification-review-module-doc');
    expect(annotationSource).toContain('rectification-review-module-doc');
    expect(annotationSource).toContain('打非治违分级协同处置-整改复核产品迭代需求说明（2026-07-08）');
  });

  it('connects the homepage disposal card and export entry to the new route', () => {
    expect(homeV3Source).toContain("title: '煤矿整改'");
    expect(homeV3Source).toContain("owner: '县级复核'");
    expect(homeV3Source).toContain("page: 'shuan-home-command-v3-illegal-disposal-rectification-review'");
    expect(exportSource).toContain('shuanDrilldownRoutePages.filter');
  });
});
