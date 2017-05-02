class Vector {
  constructor(x = 0, y = 0, min = -Infinity, max = Infinity) {
    this.x = x;
    this.y = y;
    this.min = min;
    this.max = max;
  }

  limit(min, max) {
    return (
      this.min = min,
      this.max = max,
      this
    );
  }

  applyLimit() {
    this.x = this.x < this.min ? this.min : this.x;
    this.x = this.x > this.max ? this.max : this.x;
  }

  set(x, y) {
    return (
      this.x = x,
      this.y = y,
      this
    );
  }

  add({ x, y }) {
    this.x += x;
    this.y += y;
  }

  div(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }

  sub(vector) {
    return (
      this.x -= vector.x,
      this.y -= vector.y,
      this
    );
  }

  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  scale(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
  }

  distance({x, y}) {
    return (
      Math.sqrt(
          (this.x - x) ** 2 
        + (this.y - y) ** 2
      )
    );
  }

  between(a, b) {
    // console.log(a.distance(this) + this.distance(b) - a.distance(b));
    return (
      a.distance(this) + this.distance(b) - a.distance(b) < 0.2
    );
  }

  intersects(vectors) {
    // console.log('a', vectors)
    const n = vectors.length;
    for (let i = 0; i < n; i++) {
      const v1 = vectors[i];
      const v2 = vectors[i + 1];
      if (v2 && this.between(v1, v2)) {
        return {
          result: true,
          line: [v1, v2],
        };
      }
    }
    return {
      result: false,
      line: null,
    };
  }

  collides(vectors) {
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    // https://github.com/substack/point-in-polygon/blob/master/index.js
    const { x, y } = this;
    let colliding = false;

    for (
      let i = 0, j = vectors.length - 1;
      i < vectors.length;
      j = i++
    ) {
      const { x: xi, y: yi } = vectors[i];
      const { x: xj, y: yj } = vectors[j];

      if (
        (yi > y) != (yj > y) && (
          x < (xj - xi)
            * (y - yi)
            / (yj - yi)
            + xi
        )
      ) {
        colliding = !colliding;
      }
    }

    return colliding;
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize() {
    const magnitude = this.magnitude();
    return this.set(
      this.x / magnitude,
      this.y / magnitude,
    );
  }

  walk(add = 1) {
    // random walk algorithm
    const coins = Math.floor(Math.random() * 4);
    switch (coins) {
      case 0:
        this.x += add;
        break;

      case 1:
        this.x -= add;
        break;

      case 2:
        this.y += add;
        break;

      default: 
        this.y -= add;
    }
  }

  static unit(vector) {
    return Vector.from(vector).normalize();
  }

  static zero(times) {
    return new Vector;
  }

  static random(scale) {
    return new Vector(
      // 0.3,
      // 1,
      // Math.random() > 0.5 ? -1 : 1,
      // Math.random() > 0.5 ? -1 : 1
      ((Math.random()) * 2 - 1) * scale,
      ((Math.random()) * 2 - 1) * scale
    )
  }

  static from({ x, y }) {
    // Clone a vector
    return new Vector(x, y);
  }

  static centroid(path) {
    const xs = path.map(({ x }) => x);
    const ys = path.map(({ y }) => y);

    return new Vector(
      (min(xs) + max(xs)) / 2,
      (min(ys) + max(ys)) / 2,
    );
  }

  static new([x, y]) {
    return new Vector(x, y);
  }
}
