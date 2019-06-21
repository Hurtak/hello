export function eventToAgeOfBirthValues(e: React.ChangeEvent<HTMLInputElement>) {
  const valueRaw = e.target.value;
  const valueValid = valueRaw.length > 0;

  const timestamp = (() => {
    if (!valueValid) return null;

    const [year, month, day] = valueRaw.split("-").map(Number);
    const timestamp = Date.UTC(year, month - 1, day);
    return timestamp;
  })();

  return {
    ageDateOfBirthTimestamp: timestamp,
    ageDateOfBirthInputValue: valueRaw,
  };
}
