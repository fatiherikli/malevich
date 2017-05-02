class Rectangle {
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.particles = Particle.create(30, this.position);
  }

  tick() {
    const { particles } = this;

    particles.forEach(particle => particle.tick());
  }

  draw(context) {
    const { particles } = this;

    // context.fillStyle = 'gray';
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);

    context.fillStyle = 'black';
    particles.forEach(particle => (
      context.fillRect(particle.position.x, particle.position.y, 2, 2)
    ));
  }
}
