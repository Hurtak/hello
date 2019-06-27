import { config } from "../config";

let finalMeasureMeasured = false;

function formatMs(ms: number): string {
  const msFormatted = Math.trunc(ms)
    .toString()
    .padStart(4);

  return `${msFormatted}ms`;
}

function getPerformanceTimeOrigin() {
  // TODO: rename to match to function name
  return window.GLOBAL_PERF_TIMESTAMP;
}

function gerPerformanceMessage(startTimestamp: number, endTimestamp: number, message: string) {
  const timeOrigin = getPerformanceTimeOrigin();
  const startMark = startTimestamp - timeOrigin;
  const endMark = endTimestamp - timeOrigin;
  const timeTook = endMark - startMark;

  const textFrom = formatMs(startMark);
  const textTo = formatMs(endMark);
  const textDuration = formatMs(timeTook);

  return `[PERF] ${textDuration} | from ${textFrom} to ${textTo} | ${message}`;
}

export function logTimeElapsedSinceStart(message: string, finalMeasure: boolean = false) {
  if (!config.logging.performance) return;

  const timeOrigin = getPerformanceTimeOrigin();
  const log = gerPerformanceMessage(timeOrigin, Date.now(), message);
  if (finalMeasure) {
    console.log("-".repeat(log.length));
  }
  console.log(log);

  if (finalMeasure) {
    if (finalMeasureMeasured) {
      logWarning(`logTimeElapsedSinceStart with finalMeasure=true called more than once`);
    }
    finalMeasureMeasured = true;
  }
}

export function logWarning(message: string, ...rest: any) {
  if (!config.logging.warnings) return;

  console.warn(`[WARN] ${message}`, ...rest);
}

export class LogPerformance {
  startMark: number;
  message: string;
  measured: boolean;

  constructor(message: string) {
    this.message = message;
    this.startMark = Date.now();
    this.measured = false;
  }

  measure() {
    if (!config.logging.performance) return;
    if (this.measured) {
      logWarning(`Called measure twice on message "${this.message}"`);
      return;
    }

    console.log(gerPerformanceMessage(this.startMark, Date.now(), this.message));
    this.measured = true;
  }
}
