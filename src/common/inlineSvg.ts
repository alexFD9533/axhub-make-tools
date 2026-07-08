function extractSvgAttribute(source: string, attributeName: string) {
  const match = source.match(new RegExp(`${attributeName}="([^"]+)"`, 'i'));
  return match?.[1] ?? null;
}

function deriveViewBox(source: string) {
  const existingViewBox = extractSvgAttribute(source, 'viewBox');
  if (existingViewBox) return existingViewBox;

  const width = extractSvgAttribute(source, 'width');
  const height = extractSvgAttribute(source, 'height');
  if (!width || !height) return null;

  const normalizedWidth = Number.parseFloat(width);
  const normalizedHeight = Number.parseFloat(height);
  if (!Number.isFinite(normalizedWidth) || !Number.isFinite(normalizedHeight)) return null;

  return `0 0 ${normalizedWidth} ${normalizedHeight}`;
}

export function normalizeInlineSvg(source: string) {
  const trimmed = source.trim();
  const viewBox = deriveViewBox(trimmed);
  const normalizedRoot = [
    '<svg xmlns="http://www.w3.org/2000/svg"',
    viewBox ? `viewBox="${viewBox}"` : null,
    'preserveAspectRatio="xMidYMid meet"',
    'aria-hidden="true">',
  ].filter(Boolean).join(' ');

  return trimmed.replace(/<svg\b[^>]*>/i, normalizedRoot);
}
