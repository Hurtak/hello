import React, { useRef } from "react";
import styled from "styled-components/macro";
import { uuid } from "../../../../../utils/random";
import * as s from "../../../../../styles";
import { Icon } from "../../../../../icons";
import { formBoxStyles, formLabelStyles, Wrapper, Input, Text } from "./form-styles";

export const InputCheckBox: React.FC<{
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = ({ checked, disabled = false, onChange, children }) => {
  const inputIdRef = useRef(uuid());

  return (
    <Wrapper>
      <Input
        type="checkbox"
        id={inputIdRef.current}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <Label htmlFor={inputIdRef.current}>
        <CheckboxComponent>
          <CheckboxCheckWrapper>
            <Icon type="CHECK" width={1.25} height={1.25} color={s.colors.white} />
          </CheckboxCheckWrapper>
        </CheckboxComponent>
        <Text>{children}</Text>
      </Label>
    </Wrapper>
  );
};

const Label = styled.label(() => ({
  ...formLabelStyles,

  cursor: "pointer",

  // TODO: use onFocusVisible React event once it becomes standardized
  [`${Input}${s.focusVisible} + &`]: {
    backgroundColor: s.colors.whiteTransparent20,
  },
}));

const CheckboxComponent = styled.div({
  ...formBoxStyles(Input, Label),

  borderRadius: s.grid(0.25),
});

const CheckboxCheckWrapper = styled.div({
  visibility: "hidden",
  [`${Input}:checked + ${Label} &`]: {
    visibility: "visible",
  },
});
