import { getAgeInYears, isLeapYear } from "./utils";

describe("getAgeInYears", () => {
  const testWithYearAndMonth = (
    yearNow: number,
    monthNow: number,
    yearBirth: number,
    monthBirth: number,
    result: number,
  ) => {
    expect(getAgeInYears(Date.UTC(yearNow, monthBirth, 1), Date.UTC(yearBirth, monthNow, 1))).toBe(
      result,
    );

    expect(
      getAgeInYears(Date.UTC(yearNow, monthBirth, 2), Date.UTC(yearBirth, monthNow, 1)),
    ).toBeGreaterThan(result);
    expect(
      getAgeInYears(Date.UTC(yearNow, monthBirth, 2), Date.UTC(yearBirth, monthNow, 1)),
    ).toBeCloseTo(result, 2);

    expect(
      getAgeInYears(Date.UTC(yearNow, monthBirth, 1), Date.UTC(yearBirth, monthNow, 2)),
    ).toBeLessThan(result);
    expect(
      getAgeInYears(Date.UTC(yearNow, monthBirth, 1), Date.UTC(yearBirth, monthNow, 2)),
    ).toBeCloseTo(result, 2);
  };

  test("birth date in distant past", () => {
    testWithYearAndMonth(2020, 0, 1970, 0, 50);
  });

  test("birth date in near past", () => {
    testWithYearAndMonth(2020, 0, 2019, 0, 1);
  });

  test("birth date in the middle of month", () => {
    testWithYearAndMonth(2020, 5, 2019, 5, 1);
  });
});

describe("isLeapYear", () => {
  test("recent years", () => {
    expect(isLeapYear(2015)).toBe(false);
    expect(isLeapYear(2016)).toBe(true);
    expect(isLeapYear(2017)).toBe(false);
    expect(isLeapYear(2018)).toBe(false);
    expect(isLeapYear(2019)).toBe(false);
    expect(isLeapYear(2020)).toBe(true);
  });

  test("years in the future", () => {
    expect(isLeapYear(2040)).toBe(true);
    expect(isLeapYear(2041)).toBe(false);
    expect(isLeapYear(2042)).toBe(false);
    expect(isLeapYear(2043)).toBe(false);
    expect(isLeapYear(2044)).toBe(true);
  });

  test("years in the past", () => {
    expect(isLeapYear(1904)).toBe(true);
    expect(isLeapYear(1905)).toBe(false);
    expect(isLeapYear(1906)).toBe(false);
    expect(isLeapYear(1907)).toBe(false);
    expect(isLeapYear(1908)).toBe(true);
  });
});
