import React, { useState } from "react";
import styled from "styled-components/macro";
import * as s from "../../../../styles/styles";

export const Radio: React.FC<{
  name: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  children: string;
}> = ({ name, checked, disabled = false, onChange, children }) => {
  const [inputId] = useState(getInputId());
  const [labelHovered, setLabelHovered] = useState(false);

  return (
    <Wrapper>
      <Input
        id={inputId}
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={onChange}
        type="radio"
      />
      <Label
        htmlFor={inputId}
        onMouseEnter={() => setLabelHovered(true)}
        onMouseLeave={() => setLabelHovered(false)}
        checked={checked}
      >
        <Checkbox checked={checked} hovered={labelHovered}></Checkbox>
        <Text>{children}</Text>
      </Label>
    </Wrapper>
  );
};

const getInputId = (() => {
  let id = 0;

  return (): string => {
    id += 1;

    return String(id);
  };
})();

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "row",
});

const Input = styled.input({
  // Make sure the input is still there for screen readers and for the browser
  // and for the "focus" events, but hide him visually.
  position: "absolute",
  zIndex: -1,
  pointerEvents: "none",
  opacity: 0,
});

const Label = styled.label((props: { checked: boolean }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: `${s.grid(0.25)} 0`,

  [`${Input}${s.focusVisible} + &`]: {
    backgroundColor: s.colors.whiteTransparent20,
  },

  ...(!props.checked && {
    cursor: "pointer",
  }),
}));

const Checkbox: React.FC<{
  checked: boolean;
  hovered: boolean;
}> = ({ checked, hovered }) => {
  const dotVisible = checked || hovered;
  const dotTransparent = dotVisible && hovered && !checked;

  return (
    <CheckboxWrapper>{dotVisible && <CheckboxDot transparent={dotTransparent} />}</CheckboxWrapper>
  );
};

const CheckboxWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: s.grid(2),
  height: s.grid(2),
  borderRadius: "50%",
  background: s.colors.blue,
  boxShadow: s.shadows.formFieldInset,
});

const CheckboxDot = styled.div((props: { transparent: boolean }) => ({
  width: s.grid(0.75),
  height: s.grid(0.75),
  borderRadius: "50%",
  background: s.colors.white,
  boxShadow: s.shadows.formField,

  ...(props.transparent && {
    opacity: s.opacity.opacity50,
  }),
}));

const Text = styled.span({
  ...s.text(),

  marginLeft: s.grid(1.25),
});
