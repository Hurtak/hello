import React from "react";
import * as time from "../../shared/time";

interface IConditionalUpdatedProps {
  updateEveryN: number;
  component: (time: number) => JSX.Element; // TODO: proper types
}

interface IConditionalUpdatedState {
  time: number;
}

export default class ConditionalUpdater extends React.Component<
  IConditionalUpdatedProps,
  IConditionalUpdatedState
> {
  static config = {
    // TODO: detect browser refresh rate?
    //       https://stackoverflow.com/questions/6131051
    maximumRefreshRate: time.second / 30 // 30 fps
  };

  timer: NodeJS.Timeout;

  constructor(props: IConditionalUpdatedProps) {
    super(props);

    const now = Date.now();
    const timer = setTimeout(() => {
      this.updateTimeAndStartTimeout();
    }, getNextTick(now, this.props.updateEveryN, ConditionalUpdater.config.maximumRefreshRate));

    this.timer = timer;
    this.state = {
      time: now
    };
  }

  updateTimeAndStartTimeout = () => {
    const now = Date.now();

    const timer = setTimeout(
      this.updateTimeAndStartTimeout,
      getNextTick(
        now,
        this.props.updateEveryN,
        ConditionalUpdater.config.maximumRefreshRate
      )
    );

    this.timer = timer;
    this.setState({
      time: now
    });
  };

  componentWillReceiveProps(nextProps: IConditionalUpdatedProps) {
    if (this.props === nextProps) return;

    clearTimeout(this.timer);
    this.updateTimeAndStartTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.props.component(this.state.time);
  }
}

export function getNextTick(
  now: number,
  updateEveryN: number,
  minTickDelay = 0
): number {
  const nextTick = updateEveryN - (now % updateEveryN);
  return Math.max(nextTick, minTickDelay);
}
