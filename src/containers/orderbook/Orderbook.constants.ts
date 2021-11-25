import { ReadyState } from "react-use-websocket";

export const statuses = {
  [ReadyState.CONNECTING]: ReadyState.CONNECTING,
  [ReadyState.OPEN]: ReadyState.OPEN,
  [ReadyState.CLOSING]: ReadyState.CLOSING,
  [ReadyState.CLOSED]: ReadyState.CLOSED,
  [ReadyState.UNINSTANTIATED]: ReadyState.UNINSTANTIATED,
};
