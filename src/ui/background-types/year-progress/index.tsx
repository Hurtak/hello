import React from "react";
import { Timestamp } from "../../timer-updater";
import { getYearProgress } from "./components/utils";
import { Wrapper, ProgressBar, ProgressBarInner, Text } from "./components/styled";

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
