import { counterGroup } from "./index.js";

describe("counterGroup", () => {
  describe("Counter", () => {
    describe("#count", () => {
      test("It returns incremented value", () => {
        const cg = counterGroup();
        const counter = cg.newCounter();
        expect(counter.count()).toBe(0);
        expect(counter.count()).toBe(1);
        expect(counter.count()).toBe(2);
      });
    });

    describe("#reset", () => {
      test("It resets incrementedd value", () => {
        const cg = counterGroup();
        const counter = cg.newCounter();
        expect(counter.count()).toBe(0);
        counter.reset();
        expect(counter.count()).toBe(0);
      });
    });

    describe("Isolation between Counter", () => {
      test("States in counters are isolated", () => {
        const cg = counterGroup();
        const c1 = cg.newCounter();
        const c2 = cg.newCounter();

        expect(c1.count()).toBe(0);
        expect(c1.count()).toBe(1);
        expect(c1.count()).toBe(2);
        expect(c2.count()).toBe(0);
        expect(c2.count()).toBe(1);
        expect(c1.count()).toBe(3);
      });
    });
  });

  describe("#total", () => {
    test("It returns total amount of all counters in CounterGroup", () => {
      const cg = counterGroup();
      expect(cg.total()).toBe(0);
      const c1 = cg.newCounter();
      c1.count();
      c1.count();
      c1.count();
      expect(cg.total()).toBe(3);
      const c2 = cg.newCounter();
      c2.count();
      c2.count();
      expect(cg.total()).toBe(5);
      const c3 = cg.newCounter();
      c3.count();
      expect(cg.total()).toBe(6);
    });
  });

  describe("Isolation between CounterGroup", () => {
    test("States in CounterGroups are isolated", () => {
      const cg1 = counterGroup();

      const c11 = cg1.newCounter();
      c11.count();
      c11.count();
      c11.count();
      const c12 = cg1.newCounter();
      c12.count();
      c12.count();

      const cg2 = counterGroup();
      const c21 = cg2.newCounter();
      c21.count();
      const c22 = cg2.newCounter();
      c22.reset();

      expect(cg1.total()).toBe(5);
      expect(cg2.total()).toBe(1);
    });
  });
});
