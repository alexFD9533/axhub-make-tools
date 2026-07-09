const globalObject = typeof globalThis !== 'undefined' ? globalThis : window;

function getReactDOM() {
  const runtime = globalObject.ReactDOM;
  if (!runtime) {
    throw new Error('[Axhub Make Project] ReactDOM runtime is not ready');
  }
  return runtime;
}

const ReactDOMProxy = new Proxy({}, {
  get(_target, property) {
    return getReactDOM()?.[property];
  },
  has(_target, property) {
    return property in (getReactDOM() || {});
  },
});

export default ReactDOMProxy;

// ReactDOM 18+ (createRoot / hydrateRoot)
export const createRoot = (...args) => getReactDOM().createRoot(...args);
export const hydrateRoot = (...args) => getReactDOM().hydrateRoot(...args);

// ReactDOM 17 兼容 API（一些环境仍然可能需要）
export const render = (...args) => getReactDOM().render?.(...args);
export const hydrate = (...args) => getReactDOM().hydrate?.(...args);
export const unmountComponentAtNode = (...args) => getReactDOM().unmountComponentAtNode?.(...args);
export const findDOMNode = (...args) => getReactDOM().findDOMNode?.(...args);

// Server side features (如果 CDN 提供)
export const createPortal = (...args) => getReactDOM().createPortal?.(...args);

// React 18 Transition API（可能存在）
export const flushSync = (...args) => getReactDOM().flushSync?.(...args);
export const unstable_batchedUpdates = (...args) => getReactDOM().unstable_batchedUpdates?.(...args);
export const unstable_renderSubtreeIntoContainer = (...args) => getReactDOM().unstable_renderSubtreeIntoContainer?.(...args);
