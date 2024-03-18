export const coordinate = {
  r: 0,
  theta: 0,

  get x() {
    return this.r * Math.cos(this.theta);
  },

  set x(value) {
    const y = this.y;
    if (value === 0 && y === 0) {
      this.r = 0;
      this.theta = 0;
      return;
    }
    this.r = Math.sqrt(value ** 2 + this.y ** 2);
    if (value >= 0) {
      this.theta = (Math.atan(y / value) + 2 * Math.PI) % (2 * Math.PI);
    } else {
      this.theta = Math.atan(y / value) + Math.PI;
    }
  },

  get y() {
    return this.r * Math.sin(this.theta);
  },

  set y(value) {
    const x = this.x;
    if (x === 0 && value === 0) {
      this.r = 0;
      this.theta = 0;
      return;
    }
    this.r = Math.sqrt(this.x ** 2 + value ** 2);
    if (this.x >= 0) {
      this.theta = (Math.atan(value / x) + 2 * Math.PI) % (2 * Math.PI);
    } else {
      this.theta = Math.atan(value / x) + Math.PI;
    }
  },
};
