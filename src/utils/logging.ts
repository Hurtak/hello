import { config } from "../config";

function formatMs(ms: number): string {
  const msFormatted = Math.trunc(ms)
    .toString()
    .padStart(4);

  return `${msFormatted}ms`;
}

function gerPerformanceMessage(startTimestamp: number, endTimestamp: number, message: string) {
  const startMark = startTimestamp - window.GLOBAL_PERF_TIMESTAMP;
  const endMark = endTimestamp - window.GLOBAL_PERF_TIMESTAMP;
  const timeTook = endMark - startMark;

  const textFrom = formatMs(startMark);
  const textTo = formatMs(endMark);
  const textDuration = formatMs(timeTook);

  return `[PERF] ${textDuration} | from ${textFrom} to ${textTo} | ${message}`;
}

export function logTimeElapsedSinceStart(message: string) {
  if (!config.logging.performance) return;

  const log = gerPerformanceMessage(window.GLOBAL_PERF_TIMESTAMP, Date.now(), message);
  console.log("-".repeat(log.length));
  console.log(log);
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
