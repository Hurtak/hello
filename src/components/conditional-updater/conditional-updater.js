import React from "react";
import propTypes from "prop-types";
import * as time from "../../shared/time.js";

export default class ConditionarUpdater extends React.Component {
  static config = {
    // TODO: detect browser refresh rate?
    //       https://stackoverflow.com/questions/6131051
    maximumRefreshRate: time.second / 60 // 60 fps
  };

  static propTypes = {
    updateEveryN: propTypes.number.isRequired,
    component: propTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const now = Date.now();
    const timer = setTimeout(() => {
      this.updateTimeAndStartTimeout();
    }, getNextTick(now, this.props.updateEveryN, ConditionarUpdater.config.maximumRefreshRate));

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
        ConditionarUpdater.config.maximumRefreshRate
      )
    );

    this.timer = timer;
    this.setState({
      time: now
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      clearTimeout(this.timer);
      this.updateTimeAndStartTimeout();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return <section>{this.props.component(this.state.time)}</section>;
  }
}

export function getNextTick(now, updateEveryN, minTickDelay) {
  const nextTick = updateEveryN - now % updateEveryN;

  return typeof minTickDelay === "number"
    ? Math.max(nextTick, minTickDelay)
    : nextTick;
}
