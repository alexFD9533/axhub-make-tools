import { describe, expect, it } from 'vitest';

import { normalizeInlineSvg } from '../src/common/inlineSvg';

describe('normalizeInlineSvg', () => {
  it('removes fixed root sizing and positioning while adding fallback viewBox', () => {
    const input = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="745" height="640" style="user-select: none; position: absolute; left: 0px; top: 0px;"><g><rect width="745" height="640" /></g></svg>';

    const output = normalizeInlineSvg(input);
    const rootTag = output.match(/<svg\b[^>]*>/)?.[0] ?? '';

    expect(rootTag).toContain('viewBox="0 0 745 640"');
    expect(rootTag).toContain('preserveAspectRatio="xMidYMid meet"');
    expect(rootTag).not.toContain('position: absolute');
    expect(rootTag).not.toContain('width="745"');
    expect(rootTag).not.toContain('height="640"');
    expect(rootTag).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
  });

  it('preserves an existing viewBox while normalizing aspect ratio metadata', () => {
    const input = '<svg viewBox="10 20 30 40" width="120" height="160" style="position:absolute"><path d="M0 0" /></svg>';

    const output = normalizeInlineSvg(input);
    const rootTag = output.match(/<svg\b[^>]*>/)?.[0] ?? '';

    expect(rootTag).toContain('viewBox="10 20 30 40"');
    expect(rootTag).toContain('preserveAspectRatio="xMidYMid meet"');
    expect(rootTag).not.toContain('width="120"');
    expect(rootTag).not.toContain('height="160"');
    expect(rootTag).not.toContain('style=');
  });
});
