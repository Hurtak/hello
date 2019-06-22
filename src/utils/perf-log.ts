function formatMs(number: number): string {
  return `${Math.trunc(number)}ms`;
}

export function logCurrentTime(message: string) {
  const msElapsed = Date.now() - window.GLOBAL_PERF_TIMESTAMP;

  const log = `[PERF] at ${formatMs(msElapsed).padStart(8)} | ${message}`;
  console.log("-".repeat(log.length));
  console.log(log);
}

export class PerfTimer {
  startMark: number;
  message: string;

  constructor(message: string) {
    this.message = message;
    this.startMark = Date.now();
    // console.log(`[PERF] ${this.message} --- start timer`);
  }

  measure() {
    const timeTook = Date.now() - this.startMark;
    console.log(`[PERF] took ${formatMs(timeTook).padStart(6)} | ${this.message}`);
  }
}
