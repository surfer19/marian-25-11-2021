import useWebSocket from "react-use-websocket";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { statuses } from "../../containers/orderbook/Orderbook.constants";

export const useWrappedWebsocket = (socketUrl: string) => {
  const { sendMessage, lastMessage, readyState }: WebSocketHook = useWebSocket(
    socketUrl,
    { share: true }
  );

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
