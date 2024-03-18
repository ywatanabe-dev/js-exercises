import { coordinate } from "./index.js";

describe("coordinate", () => {
  it("(1, 0)", () => {
    const p = Object.create(coordinate);
    p.x = 1.0;
    p.y = 0.0;
    expect(p.x).toBeCloseTo(1.0);
    expect(p.y).toBeCloseTo(0.0);
    expect(p.r).toBeCloseTo(1.0);
    expect(p.theta).toBeCloseTo(0.0);
  });

  it("(1/√2, 1/√2)", () => {
    const p = Object.create(coordinate);
    p.x = 1.0 / Math.sqrt(2);
    p.y = 1.0 / Math.sqrt(2);
    expect(p.x).toBeCloseTo(1.0 / Math.sqrt(2));
    expect(p.y).toBeCloseTo(1.0 / Math.sqrt(2));
    expect(p.r).toBeCloseTo(1.0);
    expect(p.theta).toBeCloseTo(Math.PI / 4);
  });

  it("(0, 1)", () => {
    const p = Object.create(coordinate);
    p.x = 0.0;
    p.y = 1.0;
    expect(p.x).toBeCloseTo(0.0);
    expect(p.y).toBeCloseTo(1.0);
    expect(p.r).toBeCloseTo(1.0);
    expect(p.theta).toBeCloseTo(Math.PI / 2);
  });

  it("(-1/√2, 1/√2)", () => {
    const p = Object.create(coordinate);
    p.x = -1.0 / Math.sqrt(2);
    p.y = 1.0 / Math.sqrt(2);
    expect(p.x).toBeCloseTo(-1.0 / Math.sqrt(2));
    expect(p.y).toBeCloseTo(1.0 / Math.sqrt(2));
    expect(p.r).toBeCloseTo(1.0);
    expect(p.theta).toBeCloseTo((Math.PI * 3) / 4);
  });

  it("(-1, 0)", () => {
    const p = Object.create(coordinate);
    p.x = -1.0;
    p.y = 0.0;
    expect(p.x).toBeCloseTo(-1.0);
    expect(p.y).toBeCloseTo(0.0);
    expect(p.r).toBeCloseTo(1.0);
    expect(p.theta).toBeCloseTo(Math.PI);
  });

  it("(-1/√2, -1/√2)", () => {
    const p = Object.create(coordinate);
    p.x = -1.0 / Math.sqrt(2);
    p.y = -1.0 / Math.sqrt(2);
    expect(p.x).toBeCloseTo(-1.0 / Math.sqrt(2));
    expect(p.y).toBeCloseTo(-1.0 / Math.sqrt(2));
    expect(p.r).toBeCloseTo(1.0);
    expect(p.theta).toBeCloseTo((Math.PI * 5) / 4);
  });

  it("(0, -1)", () => {
    const p = Object.create(coordinate);
    p.x = 0.0;
    p.y = -1.0;
    expect(p.x).toBeCloseTo(0.0);
    expect(p.y).toBeCloseTo(-1.0);
    expect(p.r).toBeCloseTo(1.0);
    expect(p.theta).toBeCloseTo((Math.PI * 3) / 2);
  });

  it("(1/√2, -1/√2)", () => {
    const p = Object.create(coordinate);
    p.x = 1.0 / Math.sqrt(2);
    p.y = -1.0 / Math.sqrt(2);
    expect(p.x).toBeCloseTo(1.0 / Math.sqrt(2));
    expect(p.y).toBeCloseTo(-1.0 / Math.sqrt(2));
    expect(p.r).toBeCloseTo(1.0);
    expect(p.theta).toBeCloseTo((Math.PI * 7) / 4);
  });
});
