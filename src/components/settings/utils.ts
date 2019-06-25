export function eventToAgeOfBirthValues(
  e: React.ChangeEvent<HTMLInputElement>,
): {
  timestamp: number | null;
  inputValue: string;
} {
  const inputValue = e.target.value;
  const valueValid = inputValue.length > 0;

  const timestamp: number | null = (() => {
    if (!valueValid) return null;

    const [year, month, day] = inputValue.split("-").map(Number);
    const timestamp = new Date(year, month - 1, day).getTime();
    return timestamp;
  })();

  return {
    timestamp,
    inputValue,
  };
}
