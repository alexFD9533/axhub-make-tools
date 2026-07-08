import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = readFileSync(join(process.cwd(), 'src/prototypes/system-replica-base/pages/SmsPages.tsx'), 'utf8');

function extractFunctionBody(name: string) {
  const start = source.indexOf(`function ${name}`);
  expect(start).toBeGreaterThanOrEqual(0);
  const candidates = ['\nfunction ', '\nexport function ', '\nconst ']
    .map((needle) => source.indexOf(needle, start + 1))
    .filter((index) => index > start);
  const end = Math.min(...candidates);
  return source.slice(start, Number.isFinite(end) ? end : source.length);
}

describe('SMS address-book tree icons', () => {
  it('uses real icon components instead of private-font glyphs in tree controls', () => {
    const treeSource = `${extractFunctionBody('MineTree')}\n${extractFunctionBody('OtherUnitTree')}`;

    expect(treeSource).not.toMatch(/[\uE000-\uF8FF]/u);
    expect(treeSource).toContain('<TreeFolderIcon');
    expect(treeSource).toContain('<TreeExpander');
  });
});
