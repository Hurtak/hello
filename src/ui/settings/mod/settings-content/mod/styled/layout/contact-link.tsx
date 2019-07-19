import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../../../../../styles";
import { Icon, IconType } from "../../../../../../../icons";
import { Link } from "./link";

export const ContactLink: React.FC<{
  href: string;
  iconType: IconType;
  children: string;
}> = ({ href, iconType, children }) => {
  return (
    <ContactLinkStyled href={href}>
      <IconWrapper>
        <Icon type={iconType} width={2} height={2} />
      </IconWrapper>
      <Link as="div">{children}</Link>
    </ContactLinkStyled>
  );
};

const ContactLinkStyled = styled.a({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textDecoration: "none",
});

const IconWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginRight: s.grid(0.75),
});
