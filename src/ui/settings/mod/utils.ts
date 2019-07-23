export function eventToAgeOfBirthValues(
  inputValue: string,
): {
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

export function scrollTop(el: HTMLElement) {
  // TODO: which one oto use, .scroll. scrollBy or .scrollTo
  el.scrollTo({ left: 0, top: 0, behavior: "smooth" });
}

export function scrollBottom(el: HTMLElement) {
  el.scrollTo({ left: 0, top: el.scrollHeight, behavior: "smooth" });
}
