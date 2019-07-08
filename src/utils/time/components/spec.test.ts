import { addLeadingZero, timestampToDateInputValue } from "..";

test("addLeadingZero", () => {
  expect(addLeadingZero(1)).toBe("01");
  expect(addLeadingZero(11)).toBe("11");
  expect(addLeadingZero(111)).toBe("111");
});

test("timestampToDateInputValue", () => {
  expect(timestampToDateInputValue(new Date(2000, 0, 1).getTime())).toBe("2000-01-01");
  expect(timestampToDateInputValue(new Date(2000, 0, 1, 23, 59, 59, 999).getTime())).toBe(
    "2000-01-01",
  );
  expect(timestampToDateInputValue(new Date(2010, 8, 8).getTime())).toBe("2010-09-08");
});
