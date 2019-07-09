import React, { useRef } from "react";
import styled from "styled-components/macro";
import { uuid } from "../../../../../utils/random";
import * as s from "../../../../../styles";

export const Radio: React.FC<{
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = ({ name, checked, disabled = false, onChange, children }) => {
  const inputIdRef = useRef(uuid());

  return (
    <Wrapper>
      <Input
        id={inputIdRef.current}
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={onChange}
        type="radio"
      />
      <Label htmlFor={inputIdRef.current} checked={checked}>
        <RadioComponent>
          <RadioDot />
        </RadioComponent>
        <Text>{children}</Text>
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "row",
});

const Input = styled.input({
  ...s.visuallyHideInputFieldWhileStillInteractive,
});

const Label = styled.label((props: { checked: boolean }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: `${s.grid(0.25)} 0`,

  // TODO: use onFocusVisible React event once it becomes standardized
  [`${Input}${s.focusVisible} + &`]: {
    backgroundColor: s.colors.whiteTransparent20,
  },

  ...(!props.checked && {
    cursor: "pointer",
  }),
}));

const RadioComponent = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: s.grid(2),
  height: s.grid(2),
  borderRadius: "50%",
  boxShadow: s.shadows.formFieldInset,

  backgroundColor: s.colors.white,
  [`${Input}:checked + ${Label} &`]: {
    backgroundColor: s.colors.blue,
  },
  [`${Input}:checked:active + ${Label} &`]: {
    backgroundColor: s.colors.blueDark,
  },
  [`${Input}:active + ${Label} &`]: {
    backgroundColor: s.colors.grayMain,
  },
});

const RadioDot = styled.div({
  width: s.grid(0.75),
  height: s.grid(0.75),
  borderRadius: "50%",
  boxShadow: s.shadows.formField,

  visibility: "hidden",
  [`${Input}:checked + ${Label} &`]: {
    visibility: "visible",
    backgroundColor: s.colors.white,
  },
});

const Text = styled.span({
  ...s.text(),

  marginLeft: s.grid(1.25),
});
