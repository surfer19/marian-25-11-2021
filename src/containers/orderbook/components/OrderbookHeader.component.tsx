import React, { FunctionComponent, memo } from "react";
import { Row } from "react-flexbox-grid";
import { theme } from "../../../theme/theme.constants";
import { StyledTitleCol } from "../Orderbook.styles";

export const OrderbookHeader: FunctionComponent<any> = memo(
  ({ spread, spreadPercentage, selectedPair }: any) => {
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
