import { FC } from "react";

import { Timestamp } from "../../utils/timer-updater";
import { ProgressBar, ProgressBarInner, Text, Wrapper } from "./mod/styled";
import { getYearProgress } from "./mod/utils";

export const YearProgress: FC<{
  time: Timestamp;
  decimalPlaces: number;
}> = (props) => {
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
