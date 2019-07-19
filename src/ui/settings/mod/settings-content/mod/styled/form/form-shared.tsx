import styled, { StyledComponent } from "styled-components/macro";
import * as s from "../../../../../../../styles";

export const CheckBoxRadioWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
});

export const CheckBoxRadioInput = styled.input({
  ...s.visuallyHideInputFieldWhileStillInteractive,
});

export const CheckBoxRadioText = styled.span({
  ...s.text({ selectable: false }),

  marginLeft: s.dimensions.formSpacing,
});

const inputPadding = s.gridRawToRawSize(0.25);
export const checkBoxRadioLabelStyles = (
  Input: StyledComponent<any, any>,
): React.CSSProperties => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: s.size(inputPadding),
  margin: `0 ${s.size(-inputPadding)}`,
  cursor: "pointer",

  // TODO: use onFocusVisible React event once it becomes standardized
  [`${Input}${s.focusVisible} + &`]: {
    background: s.colors.whiteTransparent20,
  },

  [`${Input}:disabled + &`]: {
    cursor: "auto",
  },
});

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
  [`${Input}:disabled + ${Label} &`]: {
    backgroundColor: s.colors.grayMain,
  },
});
