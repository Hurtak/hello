const { it, expect } = global;

it("addLeadingZero", () => {
  expect(ClockFunctions.addLeadingZero("")).toBe("00");
  expect(ClockFunctions.addLeadingZero("1")).toBe("01");
  expect(ClockFunctions.addLeadingZero("11")).toBe("11");
});
