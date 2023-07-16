import { writable } from "svelte/store";
import { addLog } from "./LoggerStore";
let sock_errror = "";
let SocketWS: any = null;

// const DEV = true;
const DEV = false;

const wsAddr = DEV ? "ws://127.0.0.1:8080/ws" : "ws://192.168.0.100:8080/ws";

export interface Res<T> {
  Ok?: T;
  Err?: string;
}

// const sleep = (v) => Promise.resolve(  )

function connectWs() {
  try {
    if (!(SocketWS?.readyState == WebSocket.OPEN)) {
      addLog("Trying to connect");
      SocketWS = new WebSocket(wsAddr);
      // SocketWS.onClose(() => {
      //   sock_errror = "Faild";
      //   SocketWS = null;
      // });
      SocketWS.onerror = (e) => {
        addLog("Faild to connect to socket");
        socketState.setTo(false);
      };
      SocketWS.onopen = (e) => {
        socketState.setTo(true);
      };

      sock_errror = "None";
      return true;
    }
  } catch (e) {
    SocketWS = null;
    sock_errror = "Faild";
    console.log(e);
    addLog("Faild to connect to socket");
    socketState.setTo(false);
    // addLog(JSON.stringify(e));
    return false;
  }
}

export function tryConnectWs(n: boolean = false) {
  // console.log(SocketWS);
  // console.log(SocketWS?.readyState);
  // console.log(SocketWS?.readyState === WebSocket.OPEN);
  if (SocketWS?.readyState === WebSocket.OPEN) {
    // console.log(SocketWS);
    socketState.setTo(true);
    if (n) addLog(`Alread Connection Alive`);
    return true;
  }
  if (connectWs()) {
    return true;
  }

  return false;
}

export function SocketSendData(data: string): Res<boolean> {
  let v = tryConnectWs();
  // addLog(v);
  console.log(`v: ${v}`);
  if (SocketWS?.readyState !== WebSocket.OPEN) {
    addLog(`Socket not connected`);
    socketState.setTo(false);
    return { Err: `Not connected cannot register action` };
  }

  try {
    SocketWS.send(data);
    return { Ok: true };
  } catch (e) {
    console.log(e);
    addLog(JSON.stringify(e));
    return { Err: e };
  }
}

function createConnectionState() {
  const { subscribe, set, update } = writable(false);

  const toggle = () => {
    update((v) => !v);
  };
  const setTo = (v) => {
    console.log("calleds ", v);
    set(v);
  };

  return {
    subscribe,
    toggle,
    setTo,
  };
}

export const socketState = createConnectionState();
