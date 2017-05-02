class Shape {
  constructor(style, path, particles = 100) {
    this.path = path;
    this.style = style;
    this.particlesCount = particles;
    this.createParticles();
  }

  createParticles() {
    this.particles = Particle.create(
      this.particlesCount * OPTIONS.density,
      Vector.centroid(this.path),
      this.path
    );
  }

  reset() {
    this.createParticles();
  }

  tick() {
    const { particles } = this;
    this.path.forEach(vector => vector.walk(OPTIONS.randomWalk)); 
    particles.forEach(particle => particle.tick());
  }

  draw(context) {
    const { particles } = this;

    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.beginPath();

    // this.path.forEach(
    //   ({x, y}, index) => {
    //     if (index === 0) {
    //       context.moveTo(x, y);
    //     } else {
    //       context.lineTo(x, y);
    //     }
    //   }
    // );

    context.stroke();
    
    // context.fillStyle = this.style;
    particles.forEach(particle => {
      context.fillStyle = Math.random() < OPTIONS.stainProb ? 'white' : this.style;
      particle.draw(context)
    });
  }
}
