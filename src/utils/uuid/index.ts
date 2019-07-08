export const uuid = (() => {
  let id = 1;

  return (): string => {
    const res = `uuid-${String(id)}`;
    id += 1;

    return res;
  };
})();
