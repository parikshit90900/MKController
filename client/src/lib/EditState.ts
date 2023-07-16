import { writable } from "svelte/store";

function createEditState() {
  const { subscribe, set, update } = writable(false);

  const toggle = () => {
    update((v) => !v);
  };

  return {
    subscribe,
    toggle,
  };
}

export const editState = createEditState();
