import { FC, ReactNode } from "react";
import styled from "styled-components/macro";

import * as s from "../../../../../../../styles";
import { SpacedItems } from "./spacer";

export const List: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <StyledList>
      <SpacedItems spacing={0.5}>{children}</SpacedItems>
    </StyledList>
  );
};

const StyledList = styled.ul({
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const ListItem: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <LiWrapper>
      <LiDotWrapper>
        <LiDot />
      </LiDotWrapper>
      <LiText>{children}</LiText>
    </LiWrapper>
  );
};

const LiWrapper = styled.li({
  display: "flex",
  flexDirection: "row",
});

const LiDotWrapper = styled.span({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: s.size(s.dimensions.formInputBoxSize),
  height: s.size(20), // To match the line height
  marginRight: s.size(s.dimensions.formSpacing),
});

const LiDot = styled.span({
  width: s.grid(0.75),
  height: s.grid(0.75),
  background: s.color.white,
  borderRadius: "50%",
});

const LiText = styled.span({
  ...s.text({}),
});
