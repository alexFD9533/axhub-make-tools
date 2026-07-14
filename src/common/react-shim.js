const globalObject = typeof globalThis !== 'undefined' ? globalThis : window;

function getReact() {
  const runtime = globalObject.React;
  if (!runtime) {
    throw new Error('[Axhub Make Project] React runtime is not ready');
  }
  return runtime;
}

function getJSXRuntime() {
  return globalObject.ReactJSXRuntime || {};
}

function getJSXDevRuntime() {
  return globalObject.ReactJSXDevRuntime || getJSXRuntime();
}

function createJSXElement(type, props, key) {
  const elementProps = key === undefined
    ? props
    : { ...props, key };
  return getReact().createElement(type, elementProps);
}

const ReactProxy = new Proxy({}, {
  get(_target, property) {
    return getReact()?.[property];
  },
  has(_target, property) {
    return property in (getReact() || {});
  },
});

export default ReactProxy;

export const useState = (...args) => getReact().useState(...args);
export const useEffect = (...args) => getReact().useEffect(...args);
export const useRef = (...args) => getReact().useRef(...args);
export const useMemo = (...args) => getReact().useMemo(...args);
export const useCallback = (...args) => getReact().useCallback(...args);
export const useContext = (...args) => getReact().useContext(...args);
export const useReducer = (...args) => getReact().useReducer(...args);
export const useLayoutEffect = (...args) => getReact().useLayoutEffect(...args);
export const useImperativeHandle = (...args) => getReact().useImperativeHandle(...args);
export const useDebugValue = (...args) => getReact().useDebugValue?.(...args);
export const useDeferredValue = (...args) => getReact().useDeferredValue?.(...args);
export const useTransition = (...args) => getReact().useTransition?.(...args);
export const useId = (...args) => getReact().useId?.(...args);
export const useSyncExternalStore = (...args) => getReact().useSyncExternalStore?.(...args);
export const useInsertionEffect = (...args) => getReact().useInsertionEffect?.(...args);

export const forwardRef = (...args) => getReact().forwardRef(...args);
export const memo = (...args) => getReact().memo(...args);
export const createElement = (...args) => getReact().createElement(...args);
export const createContext = (...args) => getReact().createContext(...args);
export const createRef = (...args) => getReact().createRef(...args);
export const lazy = (...args) => getReact().lazy(...args);
export const cloneElement = (...args) => getReact().cloneElement(...args);
export const isValidElement = (...args) => getReact().isValidElement(...args);
export const createFactory = (...args) => getReact().createFactory?.(...args);
export const startTransition = (...args) => getReact().startTransition?.(...args);
export const act = (...args) => getReact().act?.(...args);

export const Fragment = Symbol.for('react.fragment');
export const Suspense = Symbol.for('react.suspense');
export const StrictMode = Symbol.for('react.strict_mode');
export const Profiler = Symbol.for('react.profiler');
export const Component = globalObject.React?.Component;
export const PureComponent = globalObject.React?.PureComponent;
export const Children = globalObject.React?.Children;
export const version = globalObject.React?.version || '';

// JSX Runtime exports for modern React
export const jsx = (type, props, key) => {
  const runtime = getJSXRuntime();
  return runtime.jsx
    ? runtime.jsx(type, props, key)
    : createJSXElement(type, props, key);
};

export const jsxs = (type, props, key) => {
  const runtime = getJSXRuntime();
  return runtime.jsxs
    ? runtime.jsxs(type, props, key)
    : createJSXElement(type, props, key);
};

export const jsxDEV = (type, props, key, ...rest) => {
  const runtime = getJSXDevRuntime();
  return runtime.jsxDEV
    ? runtime.jsxDEV(type, props, key, ...rest)
    : createJSXElement(type, props, key);
};
