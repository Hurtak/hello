export function getYearProgress(timestamp: number): number {
  const now = new Date(timestamp);
  const year = now.getFullYear();

  const tsNow = now.getTime();
  const tsYearStart = new Date(year, 0, 1, 0, 0, 0, 0).getTime();
  const tsYearEnd = new Date(year + 1, 0).getTime() - 1000;

  return (tsNow - tsYearStart) / (tsYearEnd - tsYearStart);
}
