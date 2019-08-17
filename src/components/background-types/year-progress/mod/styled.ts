import styled from "styled-components/macro";
import * as s from "../../../../styles";

export const Wrapper = styled.div({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
});

export const ProgressBar = styled.div({
  position: "absolute",
  top: "80%",
  boxSizing: "border-box",
  width: s.sizeFixed(400),
  height: s.gridFixed(8),
  border: `${s.gridFixed(0.5)} solid ${s.boxBackground.backgroundColor}`,
  backdropFilter: s.boxBackground.backdropFilter,
  borderRadius: s.borderRadius.default,
});

type ProgressBarProps = { progress: number };

export const ProgressBarInner = styled.div.attrs((props: ProgressBarProps) => ({
  style: {
    width: props.progress * 100 + "%",
  },
}))((_: ProgressBarProps) => ({
  backgroundColor: s.boxBackground.backgroundColor,
  height: "100%",
}));

export const Text = styled.div({
  ...s.text({ family: "NUMBERS", selectable: false }),

  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: s.gridFixed(3),
  opacity: s.opacity.default,
});
