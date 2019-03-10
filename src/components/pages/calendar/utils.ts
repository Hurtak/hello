export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function range(start: number, end: number): number[] {
  const items = [];
  for (let i = start; i <= end; i++) {
    items.push(i);
  }
  return items;
}
