// import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { socketUrl } from "./useOrderbookSubscribe"; //TODO:
export const statuses = {
  [ReadyState.CONNECTING]: "Connecting",
  [ReadyState.OPEN]: "Open",
  [ReadyState.CLOSING]: "Closing",
  [ReadyState.CLOSED]: "Closed",
  [ReadyState.UNINSTANTIATED]: "Uninstantiated",
};

export const useSubscribe = () => {
  const { sendMessage, lastMessage, readyState }: WebSocketHook<any> =
    useWebSocket(socketUrl);

  const connectionStatus = statuses[readyState];

  const subscribe = <T>(inputMessageData: T): void => {
    const message = {
      event: "subscribe",
      ...inputMessageData,
    };
    sendMessage(JSON.stringify(message));
  };
  // eslint-disable-next-line no-unused-vars
  const unsubscribe = <T>(inputMessageData: T): void => {
    const message = {
      event: "unsubscribe",
      ...inputMessageData,
    };
    sendMessage(JSON.stringify(message));
  };
  return { subscribe, unsubscribe, lastMessage, connectionStatus };
};
