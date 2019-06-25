import { getNextTick } from "./utils";
import { day } from "../../utils/time";

it("getNextTick", () => {
  expect(getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 0), 1000)).toBe(1000);

  expect(getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 1), 1000)).toBe(999);

  expect(getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 999), 1000)).toBe(1);

  expect(getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 0), day)).toBe(day);

  expect(getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 0) + day / 2, day)).toBe(day / 2);

  expect(getNextTick(Date.UTC(2015, 0, 1, 23, 59, 59, 999), day)).toBe(1);

  // Test maximum refresh rate
  expect(getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 0), 1000)).toBe(1000);
  expect(getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 0), 1000, 1000)).toBe(1000);
  expect(getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 0), 1000, 1001)).toBe(1001);
});
