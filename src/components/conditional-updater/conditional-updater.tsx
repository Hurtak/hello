import React, { useState, useEffect } from "react";
import * as time from "../../shared/time";

type ConditionalUpdatedProps = {
  updateEveryN: number;
  component: (time: number) => React.ReactNode;
};

const config = {
  maximumRefreshRate: time.second / 60 // 30 fps
};

export const ConditionalUpdater = (props: ConditionalUpdatedProps) => {
  // TODO: refactor effect?
  // ????????????????????
  // ????????????????????
  // ????????????????????
  // TODO: can I use setSomething hook in effect????
  // ????????????????????
  // ????????????????????
  // ????????????????????

  const now = Date.now();

  const [time, setTime] = useState(now);

  useEffect(() => {
    let timer: number | undefined = undefined;

    function updateTimeAndStartTimeout() {
      const now = Date.now();

      const timer = window.setTimeout(
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
