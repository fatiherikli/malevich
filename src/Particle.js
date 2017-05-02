class Particle {
  constructor(position, path) {
    this.initialPosition = Vector.from(position);
    this.position = position;
    this.velocity = Vector.random(OPTIONS.particleSpeed);
    this.acceleration = Vector.zero();
    this.path = path;
    this.draw = this.draw.bind(this);

    const xCoords = this.path.map(({ x }) => x);
    const yCoords = this.path.map(({ y }) => y);

    this.boundaries = {
      min: new Vector(
        Math.min.apply(undefined, xCoords),
        Math.min.apply(undefined, yCoords)
      ),
      max: new Vector(
        Math.max.apply(undefined, xCoords),
        Math.max.apply(undefined, yCoords)
      ),
    }
  }

  static create(times, position, path) {
    return (
      new Array(times)
        .fill(undefined)
        .map(
          () => new Particle(
            Vector.from(position),
            path
          )
        )
    );
  }

  reset() {
    this.position.x = this.initialPosition.x;
    this.position.y = this.initialPosition.y;
    this.velocity = Vector.random();
    this.acceleration = Vector.zero();
  }

  tick() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    const intersects = this.position.intersects(this.path);

    if (intersects.result) {

      const [v1, v2] = intersects.line;

      const delta = Vector.unit(
        Vector.from(v2).sub(v1)
      );


      const normal = new Vector(-delta.y, delta.x);

      const incidence = Vector.from(this.velocity);

      incidence.multiply(-1);
      incidence.normalize();
      
      const dot = incidence.dot(normal);

      this.velocity.set(
        2 * normal.x * dot - incidence.x,
        2 * normal.y * dot - incidence.y
      );

      this.velocity.multiply(OPTIONS.particleSpeed);
    }

    if (!this.position.collides(this.path)) {
      this.reset();
    }
  }

  draw(context) {
    context.fillRect(
      this.position.x, this.position.y,
      OPTIONS.particleSize, OPTIONS.particleSize
    );
  }
}
