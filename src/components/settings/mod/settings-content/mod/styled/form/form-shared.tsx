import { CSSObject } from "styled-components";
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

  marginLeft: s.size(s.dimensions.formSpacing),
});

const inputPadding = s.gridNumber(0.25);
export const checkBoxRadioLabelStyles = (Input: StyledComponent<any, any>): CSSObject => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: s.size(inputPadding),
  margin: `0 ${s.size(-inputPadding)}`,
  cursor: "pointer",

  // TODO: use onFocusVisible React event once it becomes standardized
  [`${Input}${s.focusVisible} + &`]: {
    background: s.color.whiteTransparent20,
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
  width: s.size(s.dimensions.formInputBoxSize),
  height: s.size(s.dimensions.formInputBoxSize),
  boxShadow: s.shadow.formFieldInset,

  background: s.color.white,
  [`${Input}:checked + ${Label} &`]: {
    backgroundColor: s.color.blue,
  },
  [`${Input}:checked:active + ${Label} &`]: {
    backgroundColor: s.color.blueDark,
  },
  [`${Input}:active + ${Label} &`]: {
    backgroundColor: s.color.gray,
  },
  [`${Input}:disabled + ${Label} &`]: {
    backgroundColor: s.color.gray,
  },
});
