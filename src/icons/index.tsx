import React from "react";
import styled from "styled-components/macro";
import { never } from "../utils/never";
import * as s from "../styles";

// Currently we prefer ease of use (prop type="ICON_TYPE") and do not do any code splitting
import { IconCog } from "./mod/cog";
import { IconGithub } from "./mod/github";
import { IconMail } from "./mod/mail";
import { IconTwitter } from "./mod/twitter";
import { IconWarning } from "./mod/warning";
import { IconCheck } from "./mod/check";

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
    default:
      return never(type);
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
  color = s.color.white,
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
