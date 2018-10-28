import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import * as s from "../../shared/styles.js";
import * as constants from "../../shared/constants.js";

const YearProgress = props => {
  const progress = getYearProgress(props.time);

  return (
    <YearProgressWrapper>
      <YearProgressBar style={{ width: progress * 100 + "%" }} />
      <YearProgressText>
        {(progress * 100).toFixed(props.decimalPlaces)}%
      </YearProgressText>
    </YearProgressWrapper>
  );
};
YearProgress.propTypes = {
  time: constants.timePropType,
  decimalPlaces: propTypes.number.isRequired
};
export default YearProgress;

const YearProgressWrapper = styled.div({
  position: "relative",
  width: "100%",
  boxSizing: "border-box",
  height: s.grid(8),
  padding: s.grid(0.25),
  marginTop: s.grid(1),
  border: `${s.grid(0.25)} solid ${s.colors.whiteTransparentDefault}`
});

const YearProgressBar = styled.div({
  height: "100%",
  backgroundColor: s.colors.whiteTransparentDefault
});

const YearProgressText = styled.div({
  ...s.text.text,
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0
});

export function getYearProgress(timestamp) {
  const now = new Date(timestamp);
  const year = now.getFullYear();
  const tsNow = now.getTime();
  const tsYearStart = new Date(year, 0, 1, 0, 0, 0, 0).getTime();
  const tsYearEnd = new Date(year + 1, 0).getTime() - 1000;

  return (tsNow - tsYearStart) / (tsYearEnd - tsYearStart);
}
