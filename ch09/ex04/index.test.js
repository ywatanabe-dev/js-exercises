import { Warrior, MagicWarrior, Warrior2, MagicWarrior2 } from "./index.js";

describe("Warrior", () => {
  test("set atk", () => {
    const warrior = new Warrior(10);
    expect(warrior.atk).toBe(10);
  });

  test("attack (atk = 10)", () => {
    const warrior = new Warrior(10);
    expect(warrior.attack()).toBe(20);
  });

  test("attack (atk = 15)", () => {
    const warrior = new Warrior(15);
    expect(warrior.attack()).toBe(30);
  });
});

describe("MagicWarrior", () => {
  test("set atk, mgc", () => {
    const warrior = new MagicWarrior(5, 10);
    expect(warrior.atk).toBe(5);
    expect(warrior.mgc).toBe(10);
  });

  test("attack (atk = 5, mgc = 10)", () => {
    const warrior = new MagicWarrior(5, 10);
    expect(warrior.attack()).toBe(20);
  });

  test("attack (atk = 5, mgc = 20)", () => {
    const warrior = new MagicWarrior(5, 20);
    expect(warrior.attack()).toBe(30);
  });
});

describe("Warrior2", () => {
  test("set atk", () => {
    const warrior = new Warrior2(10);
    expect(warrior.atk).toBe(10);
  });

  test("attack (atk = 10)", () => {
    const warrior = new Warrior2(10);
    expect(warrior.attack()).toBe(20);
  });

  test("attack (atk = 15)", () => {
    const warrior = new Warrior2(15);
    expect(warrior.attack()).toBe(30);
  });
});

describe("MagicWarrior2", () => {
  test("set atk, mgc", () => {
    const warrior = new MagicWarrior2(5, 10);
    expect(warrior.atk).toBe(5);
    expect(warrior.mgc).toBe(10);
  });

  test("attack (atk = 5, mgc = 10)", () => {
    const warrior = new MagicWarrior2(5, 10);
    expect(warrior.attack()).toBe(20);
  });

  test("attack (atk = 5, mgc = 20)", () => {
    const warrior = new MagicWarrior2(5, 20);
    expect(warrior.attack()).toBe(30);
  });
});
