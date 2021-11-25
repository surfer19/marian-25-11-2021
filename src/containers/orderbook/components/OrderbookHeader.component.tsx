/* eslint-disable react/prop-types */
import React, { FunctionComponent, memo } from "react";
import { Row } from "react-flexbox-grid";
import { ProductId } from "../../../api/orderbook/orderbook.types";
import { theme } from "../../../theme/theme.constants";
import { StyledTitleCol } from "../Orderbook.styles";

export type OrderbookHeaderProps = {
  spread: number;
  spreadPercentage: number;
  selectedPair: ProductId;
};

export const OrderbookHeader: FunctionComponent<OrderbookHeaderProps> = memo(
  ({ spread, spreadPercentage, selectedPair }) => {
    return (
      <Row>
        <StyledTitleCol md={2} color={theme.colors.arcticBlue}>
          <span>Order Book - {selectedPair}</span>
        </StyledTitleCol>
        <StyledTitleCol md={10}>
          <span>
            <strong>
              Spread: {spread} ({spreadPercentage}%)
            </strong>
          </span>
        </StyledTitleCol>
      </Row>
    );
  }
);

OrderbookHeader.displayName = "OrderbookHeader";
