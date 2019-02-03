import React, { useState, useEffect } from "react";
import { config } from "../../config";

export type Timestamp = number;

type TimerUpdatedProps = {
  updateEveryN: number;
  component: (time: Timestamp) => React.ReactNode;
};

export const TimerUpdater = (props: TimerUpdatedProps) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    let timer: number | undefined;

    function updateTimeAndStartTimeout() {
      const now = Date.now();

      timer = window.setTimeout(
        updateTimeAndStartTimeout,
        getNextTick(now, props.updateEveryN, config.maximumRefreshRate)
      );

      setTime(now);

      return timer;
    }

    updateTimeAndStartTimeout();

    return () => {
      window.clearTimeout(timer);
    };
  }, [props.updateEveryN]);

  return <>{props.component(time)}</>;
};

export function getNextTick(
  now: number,
  updateEveryN: number,
  minTickDelay = 0
): number {
  const nextTick = updateEveryN - (now % updateEveryN);
  return Math.max(nextTick, minTickDelay);
}
