export function testItemsUniqueness(items: (string | number | null | undefined)[]) {
  const seenItems = new Set();

  for (const item of items) {
    const unique = seenItems.has(item);
    expect(unique).toBeFalsy();

    seenItems.add(item);
  }
}
