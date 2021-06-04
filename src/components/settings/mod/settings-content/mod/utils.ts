export function eventToAgeOfBirthValues(inputValue: string): {
  timestamp: number | null;
  inputValue: string;
} {
  // inputValue from input type date is UTC string, eg "2019-10-30" (yyyy-mm-dd).
  const timestamp: number | null = (() => {
    const valueValid = inputValue.length > 0;
    if (!valueValid) return null;

    const timestamp = new Date(inputValue).getTime();
    if (Number.isNaN(timestamp)) return null;

    return timestamp;
  })();

  return {
    timestamp,
    inputValue,
  };
}
