import { writable } from "svelte/store";

function createCanvasStore() {
  const { subscribe, set, update } = writable(true);

  const toggle = () => {
    update((v) => !v);
  };

  return {
    subscribe,
    toggle,
  };
}

export const canvasState = createCanvasStore();
