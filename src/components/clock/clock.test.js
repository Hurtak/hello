import * as ClockFunctions from "./clock.js";

const { it, expect } = global;

it("formatTime", () => {
  // regular time
  expect(ClockFunctions.formatTime(new Date(2015, 0, 1, 10, 30, 0, 0))).toBe(
    "10:30"
  );
  expect(ClockFunctions.formatTime(new Date(2015, 0, 1, 10, 30, 59, 999))).toBe(
    "10:30"
  );

  // edges
  expect(ClockFunctions.formatTime(new Date(2015, 0, 1, 0, 0, 0, 0))).toBe(
    "00:00"
  );
  expect(ClockFunctions.formatTime(new Date(2015, 0, 1, 23, 59, 59, 999))).toBe(
    "23:59"
  );

  // zero padding
  expect(ClockFunctions.formatTime(new Date(2015, 0, 1, 1, 1, 0, 0))).toBe(
    "01:01"
  );
  expect(ClockFunctions.formatTime(new Date(2015, 0, 1, 10, 1, 0, 0))).toBe(
    "10:01"
  );
  expect(ClockFunctions.formatTime(new Date(2015, 0, 1, 1, 10, 0, 0))).toBe(
    "01:10"
  );
});
