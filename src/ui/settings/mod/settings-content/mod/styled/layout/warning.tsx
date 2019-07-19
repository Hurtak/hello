import React from "react";
import styled from "styled-components/macro";
import * as s from "../../../../../../../styles";
import { Icon } from "../../../../../../../icons";

export const Warning: React.FC = ({ children }) => (
  <WarningTextWrapper>
    <WarningTextIcon>
      <Icon type="WARNING" color={s.colors.orange} width={2} height={2} />
    </WarningTextIcon>
    <WarningText>{children}</WarningText>
  </WarningTextWrapper>
);

const WarningTextWrapper = styled.div({
  display: "flex",
  alignItems: "center",
});

const WarningTextIcon = styled.div({
  marginRight: s.dimensions.formSpacing,
});

const WarningText = styled.p({
  ...s.text(),

  display: "inline-block",
  color: s.colors.orange,
});
