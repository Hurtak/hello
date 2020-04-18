export const secondMs = 1000;
export const minuteMs = 60 * secondMs;
export const hourMs = 60 * minuteMs;
export const dayMs = 24 * hourMs;
export const yearMs = 365 * dayMs;

export function addLeadingZero(input: number) {
  return String(input).padStart(2, "0");
}

export function timestampToDateInputValue(timestamp: number): string {
  const date = new Date(timestamp);

  const value =
    date.getFullYear() +
    "-" +
    addLeadingZero(date.getMonth() + 1) +
    "-" +
    addLeadingZero(date.getDate());

  return value;
}
