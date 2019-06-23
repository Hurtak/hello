export function eventToAgeOfBirthValues(e: React.ChangeEvent<HTMLInputElement>) {
  const valueRaw = e.target.value;
  const valueValid = valueRaw.length > 0;

  const timestamp: number | null = (() => {
    if (!valueValid) return null;

    const [year, month, day] = valueRaw.split("-").map(Number);
    const timestamp = new Date(year, month - 1, day).getTime();
    return timestamp;
  })();

  return {
    ageDateOfBirthTimestamp: timestamp,
    ageDateOfBirthInputValue: valueRaw,
  };
}
