import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../styles/styles";
import { IconWarning } from "../../../icons";

export const Warning: React.FC = ({ children }) => (
  <WarningTextWrapper>
    <WarningTextIcon>
      <IconWarning color={s.colors.orange} width={2} height={2} />
    </WarningTextIcon>
    <WarningText>{children}</WarningText>
  </WarningTextWrapper>
);

const WarningTextWrapper = styled.div({
  display: "flex",
  alignItems: "center",
});

const WarningTextIcon = styled.div({
  marginRight: s.grid(1),
});

const WarningText = styled.p({
  ...s.text(),

  display: "inline-block",
  color: s.colors.orange,
});
