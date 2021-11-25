import { Col, ColProps } from "react-flexbox-grid";
import styled from "styled-components";
import { Theme } from "../../theme/theme.constants";

export const StyledTable = styled("div")``;

export type StyledTitleColProps = {
  color?: any;
  theme?: Theme;
} & ColProps;

export const StyledTitleCol = styled(Col)<StyledTitleColProps>`
  color: ${({ theme: { colors: defaultColors }, color }) =>
    color ? color : defaultColors.standardBlue};
  border-bottom: ${({ theme: { colors: defaultColors } }) =>
    `1px solid ${defaultColors.standardBlue}`};

  span {
    display: block;
    padding: 0.5rem 1rem;
  }
`;

export const OrderBookWrapper = styled("div")`
  background: ${({ theme: { colors } }) => colors.darkBlue};
  button {
    margin: 1rem 0;
  }
`;

export const GridContainer = styled("div")`
  display: flex;
`;

export const GridCol = styled("div")`
  flex: 1 1 0%;
`;

export type StyledChartIndicatorContainerProps = {
  align?: string;
};
export const StyledChartIndicatorContainer = styled(
  "div"
)<StyledChartIndicatorContainerProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${({ align }) => (align ? align : "flex-end")};
  @media (max-width: 768px) {
    justify-content: ${() => "flex-start"};
  }
`;

export const StyledChartIndicator = styled("div").attrs(
  ({ width }: { width: string }) => ({
    style: {
      width: width ? width + "%" : "0%",
    },
  })
)<any>`
  background: ${({ theme: { colors: defaultColors }, bgColor }) =>
    bgColor ? bgColor : defaultColors.hulkGreenStandard};
  height: 100%;
  border-radius: inherit;
  align-items: right;
`;
