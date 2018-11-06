import React, { useState, useEffect } from "react";
import * as time from "../../shared/time";

interface IConditionalUpdatedProps {
  updateEveryN: number;
  component: (time: number) => React.ReactNode;
}

const config = {
  // TODO: detect browser refresh rate?
  //       https://stackoverflow.com/questions/6131051
  maximumRefreshRate: time.second / 30 // 30 fps
};

const ConditionalUpdater = (props: IConditionalUpdatedProps) => {
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

  useEffect(
    () => {
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
    },
    [props.updateEveryN]
  );

  return <>{props.component(time)}</>;
};
export default ConditionalUpdater;

export function getNextTick(
  now: number,
  updateEveryN: number,
  minTickDelay = 0
): number {
  const nextTick = updateEveryN - (now % updateEveryN);
  return Math.max(nextTick, minTickDelay);
}
