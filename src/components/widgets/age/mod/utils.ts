import { range } from "../../../../utils/array";
import * as time from "../../../../utils/time";
import { Timestamp } from "../../../utils/timer-updater";

export const getAgeInYears = (currentTime: Timestamp, birthDate: Timestamp): number => {
  const yearBirthDate = new Date(birthDate).getFullYear();
  const yearTime = new Date(currentTime).getFullYear();

  const checkBirthYear = birthDate <= new Date(yearBirthDate, 1, 29, 23, 59, 59, 999).getTime();
  const checkCurrentYear = currentTime >= new Date(yearTime, 1, 29, 0, 0, 0, 0).getTime();

  const numberOfLeapYears = range(
    yearBirthDate + (checkBirthYear ? 0 : 1),
    yearTime + (checkCurrentYear ? 0 : -1),
  ).reduce((leapYears, year) => (leapYears += isLeapYear(year) ? 1 : 0), 0);

  const leapAdjustMs = numberOfLeapYears * time.dayMs;
  const years = (currentTime - birthDate - leapAdjustMs) / time.yearMs;

  return years;
};

export const isLeapYear = (year: number): boolean => {
  // https://stackoverflow.com/questions/16353211/check-if-year-is-leap-year-in-javascript
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
