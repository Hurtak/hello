import { uuid } from "..";

test("uuid", () => {
  const ids = [];
  for (let i = 1; i <= 10; i++) {
    ids.push(uuid());
  }

  for (const id of ids) {
    expect(ids.filter(item => item === id).length).toBe(1);
  }
});
