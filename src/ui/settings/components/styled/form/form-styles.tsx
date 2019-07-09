import styled, { StyledComponent } from "styled-components/macro";
import * as s from "../../../../../styles";

export const Wrapper = styled.div({
  display: "flex",
  flexDirection: "row",
});

export const Input = styled.input({
  ...s.visuallyHideInputFieldWhileStillInteractive,
});

export const Text = styled.span({
  ...s.text({ selectable: false }),

  marginLeft: s.grid(1.25),
});

export const formLabelStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: `${s.grid(0.25)} 0`,
};

export const formBoxStyles = (
  Input: StyledComponent<any, any>,
  Label: StyledComponent<any, any>,
) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: s.grid(2),
  height: s.grid(2),
  boxShadow: s.shadows.formFieldInset,

  background: s.colors.white,
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
