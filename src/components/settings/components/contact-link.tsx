import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../styles/styles";
import { IconGithub } from "../../../icons";

type LinkIcons = "GITHUB";

export const ContactLink: React.FC<{
  href: string;
  iconType: LinkIcons;
  children: string;
}> = ({ href, iconType, children }) => {
  const Icon = getContactIcon(iconType);

  return (
    <Wrapper href={href}>
      <IconWrapper>
        <Icon width={2} height={2} />
      </IconWrapper>
      <Text>{children}</Text>
    </Wrapper>
  );
};

function getContactIcon(type: LinkIcons) {
  switch (type) {
    case "GITHUB":
      return IconGithub;
  }
}

const Wrapper = styled.a({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textDecoration: "none",
});

const IconWrapper = styled.div({
  display: "block",
  marginRight: s.grid(1),
});

const Text = styled.div({
  ...s.text(),

  display: "inline-block",
  textDecoration: "none",

  borderBottomWidth: s.size(1),
  borderBottomStyle: "solid",
  borderBottomColor: s.colors.whiteTransparentBright,
});
