import React from "react";
import { Wrapper, ProgressBar, ProgressBarInner, Text } from "./components/styled";
import { getYearProgress } from "./components/utils";
import { Timestamp } from "../../timer-updater";

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
