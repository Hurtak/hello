export const second = 1000;
export const minute = 60 * second;
export const hour = 60 * minute;
export const day = 24 * hour;
export const year = 365 * day;

export function addLeadingZero(input) {
  input = String(input);
  while (input.length < 2) {
    input = "0" + input;
  }
  return input;
}

export function dateToDateInputValue(timestamp) {
  const date = new Date(timestamp);

  const value =
    date.getFullYear() +
    "-" +
    addLeadingZero(date.getMonth() + 1) +
    "-" +
    addLeadingZero(date.getDate());

  return value;
}
