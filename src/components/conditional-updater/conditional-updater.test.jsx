import * as ConditionalUpdaterFn from "./conditional-updater.jsx";

const { it, expect } = global;

it("getNextTick", () => {
  expect(
    ConditionalUpdaterFn.getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 0), 1000)
  ).toBe(1000);

  expect(
    ConditionalUpdaterFn.getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 1), 1000)
  ).toBe(999);

  expect(
    ConditionalUpdaterFn.getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 999), 1000)
  ).toBe(1);

  const day = 24 * 60 * 60 * 1000;
  expect(
    ConditionalUpdaterFn.getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 0), day)
  ).toBe(day);

  expect(
    ConditionalUpdaterFn.getNextTick(
      Date.UTC(2015, 0, 1, 0, 0, 0, 0) + day / 2,
      day
    )
  ).toBe(day / 2);

  expect(
    ConditionalUpdaterFn.getNextTick(Date.UTC(2015, 0, 1, 23, 59, 59, 999), day)
  ).toBe(1);

  // Test maximum refresh rate
  expect(
    ConditionalUpdaterFn.getNextTick(Date.UTC(2015, 0, 1, 0, 0, 0, 0), 1000)
  ).toBe(1000);
  expect(
    ConditionalUpdaterFn.getNextTick(
      Date.UTC(2015, 0, 1, 0, 0, 0, 0),
      1000,
      1000
    )
  ).toBe(1000);
  expect(
    ConditionalUpdaterFn.getNextTick(
      Date.UTC(2015, 0, 1, 0, 0, 0, 0),
      1000,
      1001
    )
  ).toBe(1001);
});
