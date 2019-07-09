export function testItemsUniqueness(items: (string | number | null | undefined)[]) {
  const seenItems = new Set();

  for (let item of items) {
    const unique = seenItems.has(item);
    expect(unique).toBeFalsy();

    seenItems.add(item);
  }
}
