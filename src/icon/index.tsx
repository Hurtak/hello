import React from "react";
import styled from "styled-components/macro";
import * as s from "../styles/styles";

import { IconCog } from "./icons/cog";
import { IconGithub } from "./icons/github";
import { IconWarning } from "./icons/warning";

export type IconType = "COG" | "GITHUB" | "WARNING";

function getIconComponent(type: IconType) {
  switch (type) {
    case "COG":
      return IconCog;
    case "GITHUB":
      return IconGithub;
    case "WARNING":
      return IconWarning;
  }
}

export type IconProps = {
  type: IconType;
  width?: number;
  height?: number;
  color?: string;
};

export const Icon: React.FC<IconProps> = ({
  type,
  width = 3,
  height = 3,
  color = s.colors.white,
}) => {
  const Svg = getIconComponent(type);

  return (
    <Wrapper width={width} height={height} color={color}>
      <Svg />
    </Wrapper>
  );
};

const Wrapper = styled.div(
  ({ width, height, color }: { width: number; height: number; color: string }) => ({
    display: "inline-block",
    width: s.grid(width),
    height: s.grid(height),

    "& > svg": {
      width: "100%",
      height: "100%",
      fill: color,
    },
  }),
);
