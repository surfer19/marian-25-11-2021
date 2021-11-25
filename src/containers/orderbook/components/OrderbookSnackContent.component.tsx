/* eslint-disable no-unused-vars */
import React, { ReactElement } from "react";
import { Button } from "../../../components/Button/Button.component";

export type SnackOrderbookContentProps = {
  subscribeOrderbook: () => void;
  showSnack: (prop: boolean) => void;
};

export const OrderbookSnackContent = ({
  subscribeOrderbook,
  showSnack,
}: SnackOrderbookContentProps): ReactElement => (
  <>
    <Button
      bgColor="violent"
      onClick={() => {
        subscribeOrderbook();
        showSnack(false);
      }}
    >
      Reconnect
    </Button>
  </>
);
