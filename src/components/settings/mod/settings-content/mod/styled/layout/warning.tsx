import { FC, ReactNode } from "react";
import styled from "styled-components/macro";
import * as s from "../../../../../../../styles";
import { Icon } from "../../../../../../../icons";

export const Warning: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <WarningTextWrapper>
    <WarningTextIcon>
      <Icon type="WARNING" color={s.color.orange} width={2} height={2} />
    </WarningTextIcon>
    <WarningText>{children}</WarningText>
  </WarningTextWrapper>
);

const WarningTextWrapper = styled.div({
  display: "flex",
  alignItems: "center",
});

const WarningTextIcon = styled.div({
  marginRight: s.size(s.dimensions.formSpacing),
});

const WarningText = styled.p({
  ...s.text(),

  display: "inline-block",
  color: s.color.orange,
});
