import * as time from "./utils/time";

export const config = {
  isDev: process.env.NODE_ENV !== "production",

  logging: {
    warnings: true,
    performance: true,
  },

  // Maximum number of re-renders per second in TimerUpdater component.
  // Eg.: if we have 60fps maximumRefreshRate, clock with seconds updates once a
  // second so it will not be affected. On the other hand if we had setting
  // of TimerUpdater that would update state 100 times a second (like age with
  // lots of decimal places), it would be capped at 60.
  maximumRefreshRate: time.second / 60,

  ageDecimalPlaces: 8,
  yearProgressDecimalPlaces: 8,

  localStorageKey: "__helloAppState",
};
