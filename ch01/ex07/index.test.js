import { Point } from "./index.js";

describe("Point", () => {
  describe("distance", () => {
    it("distance of (0, 1) is 1", () => {
      const point = new Point(0, 1);
      expect(point.distance()).toBeCloseTo(1);
    });

    it("distance of (3, 4) is 5", () => {
      const point = new Point(3, 4);
      expect(point.distance()).toBeCloseTo(5);
    });
  });

  describe("add", () => {
    it("add (-1, -2) and (2, 3) gives (1, 1)", () => {
      const point1 = new Point(-1, -2);
      const point2 = new Point(2, 3);
      const point3 = point1.add(point2);
      expect(point3.x).toBe(1);
      expect(point3.y).toBe(1);
    });
  });
});
