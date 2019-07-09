export function range(start: number, end: number): number[] {
  const items = [];
  for (let i = start; i <= end; i++) {
    items.push(i);
  }
  return items;
}
