import React from "react";
import styled from "styled-components/macro";
import * as s from "../styles";

import { IconCog } from "./components/cog";
import { IconGithub } from "./components/github";
import { IconMail } from "./components/mail";
import { IconTwitter } from "./components/twitter";
import { IconWarning } from "./components/warning";
import { IconCheck } from "./components/check";

export type IconType = "COG" | "GITHUB" | "MAIL" | "TWITTER" | "WARNING" | "CHECK";

function getIconComponent(type: IconType) {
  switch (type) {
    case "COG":
      return IconCog;
    case "GITHUB":
      return IconGithub;
    case "MAIL":
      return IconMail;
    case "TWITTER":
      return IconTwitter;
    case "WARNING":
      return IconWarning;
    case "CHECK":
      return IconCheck;
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
    display: "flex",
    width: s.grid(width),
    height: s.grid(height),

    "& > svg": {
      width: "100%",
      height: "100%",
      fill: color,
    },
  }),
);
