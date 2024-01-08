export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }
}
