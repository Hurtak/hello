import styled from "styled-components/macro";
import * as s from "../styles/styles";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const Icon = styled.div(
  ({ width = 24, height = 24, color = s.colors.black }: IconProps) => ({
    display: "inline-block",
    width: s.size(width),
    height: s.size(height),

    "& > svg": {
      width: "100%",
      height: "100%",
      fill: color,
    },
  }),
);
