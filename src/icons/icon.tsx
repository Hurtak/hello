import styled from "styled-components/macro";
import * as s from "../styles/styles";

export type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const Icon = styled.div(({ width = 3, height = 3, color = s.colors.white }: IconProps) => ({
  display: "inline-block",
  width: s.grid(width),
  height: s.grid(height),

  "& > svg": {
    width: "100%",
    height: "100%",
    fill: color,
  },
}));
