import React from "react";
import { Timestamp } from "../../utils/timer-updater";
import { getYearProgress } from "./mod/utils";
import { Wrapper, ProgressBar, ProgressBarInner, Text } from "./mod/styled";

export const YearProgress: React.FC<{
  time: Timestamp;
  decimalPlaces: number;
}> = props => {
  const progress = getYearProgress(props.time);

  return (
    <Wrapper>
      <ProgressBar>
        <ProgressBarInner progress={progress} />
        <Text>{(progress * 100).toFixed(props.decimalPlaces)}%</Text>
      </ProgressBar>
    </Wrapper>
  );
};
