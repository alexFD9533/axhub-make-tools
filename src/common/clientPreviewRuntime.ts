import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

type PreviewComponent = React.ComponentType<{
  container: HTMLElement;
  config: { projectPath: string };
  data: Record<string, never>;
  events: Record<string, never>;
}>;

export function renderClientPreview(
  PreviewComponent: PreviewComponent,
  container: HTMLElement,
  projectPath: string,
) {
  const element = React.createElement(PreviewComponent, {
    container,
    config: { projectPath },
    data: {},
    events: {},
  });
  const root = ReactDOMClient.createRoot?.(container);
  if (root) {
    root.render(element);
    return root;
  }
  ReactDOMClient.render?.(element, container);
  return null;
}
