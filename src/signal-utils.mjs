import { Signal } from "signal-polyfill";

let needsEnqueue = true;

const watcher = new Signal.subtle.Watcher(() => {
  if (needsEnqueue) {
    needsEnqueue = false;
    queueMicrotask(processPending);
  }
});

function processPending() {
  needsEnqueue = true;

  for (const signal of watcher.getPending()) {
    signal.get();
  }

  watcher.watch();
}

const useSignal = (initialValue) => {
  const state = new Signal.State(initialValue);
  const getState = () => state.get();
  const setState = (value) => state.set(value);
  return [getState, setState];
};

const useComputed = (callback) => {
  const computed = new Signal.Computed(callback);
  return [() => computed.get(), computed];
};

const useEffect = (callback) => {
  let cleanup;

  const [getComputed, computed] = useComputed(() => {
    typeof cleanup === "function" && cleanup();
    cleanup = callback();
  });

  watcher.watch(computed);
  getComputed();

  return () => {
    watcher.unwatch(computed);
    typeof cleanup === "function" && cleanup();
  };
};

export {
  Signal,
  useSignal,
  useEffect,
  useComputed
}