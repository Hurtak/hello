import React from "react";
import { YearProgressWrapper, YearProgressBar, YearProgressText } from "./styled";
import { getYearProgress } from "./utils";
import { Timestamp } from "../../timer-updater";

export const YearProgress: React.FC<{
  time: Timestamp;
  decimalPlaces: number;
}> = props => {
  const progress = getYearProgress(props.time);

  return (
    <YearProgressWrapper>
      <YearProgressBar style={{ width: progress * 100 + "%" }} />
      <YearProgressText>{(progress * 100).toFixed(props.decimalPlaces)}%</YearProgressText>
    </YearProgressWrapper>
  );
};
