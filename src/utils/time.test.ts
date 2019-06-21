import { addLeadingZero, timestampToDateInputValue } from "./time";

it("addLeadingZero", () => {
  expect(addLeadingZero(1)).toBe("01");
  expect(addLeadingZero(11)).toBe("11");
  expect(addLeadingZero(111)).toBe("111");
});

it("timestampToDateInputValue", () => {
  expect(timestampToDateInputValue(Date.UTC(2000, 0, 1))).toBe("2000-01-01");
  expect(timestampToDateInputValue(Date.UTC(2000, 0, 1, 23, 59, 59, 999))).toBe("2000-01-01");
  expect(timestampToDateInputValue(Date.UTC(2010, 8, 8))).toBe("2010-09-08");
});
