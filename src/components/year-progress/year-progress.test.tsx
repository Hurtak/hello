import * as YearProgressFuntions from "./year-progress";

it("shouldBeUpdated", () => {
  expect(
    YearProgressFuntions.getYearProgress(
      new Date(2015, 0, 1, 0, 0, 0, 0).getTime()
    )
  ).toBe(0);

  const yearLength = 365 * 24 * 60 * 60 * 1000;
  const yearStart = new Date(2015, 0).getTime(); // 2015 is not leap year
  expect(
    YearProgressFuntions.getYearProgress(yearStart + yearLength / 2)
  ).toBeCloseTo(0.5, 7);

  const leapYearLength = 366 * 24 * 60 * 60 * 1000;
  const leapYearStart = new Date(2016, 0).getTime(); // 2016 is leap year
  expect(
    YearProgressFuntions.getYearProgress(leapYearStart + leapYearLength / 2)
  ).toBeCloseTo(0.5, 7);

  expect(
    Math.floor(
      YearProgressFuntions.getYearProgress(
        new Date(2015, 11, 30, 23, 59, 59, 999).getTime()
      ) * 100
    )
  ).toBe(99);
});
