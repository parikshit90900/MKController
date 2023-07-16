import { writable } from "svelte/store";




function createLogsStore() {
  const { subscribe, set, update } = writable<String[]>([]);

  const addToLog = (log: string) => {
    update((logs) => {
    // [...logs, log])
    logs.push(log);
    return logs
    })
  };

  const clear = () => {
    set([]);
  };

  return {
    subscribe,
    addToLog,
    clear,
  };
}

export const LogsStore = createLogsStore();

// export const addLogc = (v: Object) => {
//   console.log(JSON.stringify(v));
//   LogsStore.addToLog(JSON.stringify(v));
// };

export const addLog = (v: Object, ty: string = "all") => {
  if (ty === "all") {
    console.log(JSON.stringify(v));
    LogsStore.addToLog(JSON.stringify(v));
  } else if (ty === "c") {
    console.log(JSON.stringify(v));
  } else if (ty === "l") {
    LogsStore.addToLog(JSON.stringify(v));
  }
};
