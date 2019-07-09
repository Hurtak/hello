export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const uuid = (() => {
  let id = 1;

  return (): string => {
    const res = `uuid-${String(id)}`;
    id += 1;

    return res;
  };
})();
