class Canvas {
  constructor(element) {
    this.element = element;
    this.context = element.getContext('2d');
    this.running = true;
    this.shapes = [];
    this.setup();
  }

  setup() {
    const { element, context } = this;
    // context.translate((element.width / 2), (element.height / 2))    
  }

  add(...shapes) {
    for (const shape of shapes) (
      this.shapes.push(shape)
    );
  }

  tick() {
    const { shapes } = this;

    shapes.forEach(shape => shape.tick());
  }

  draw() {
    const { shapes, context } = this;

    OPTIONS.redraw && this.clear();
    shapes.forEach(shape => shape.draw(context));
  }

  clear() {
    const {
      element: { width, height },
      context,
    } = this;
    context.clearRect(0, 0, width, height);
  }

  reset() {
    const { shapes } = this;
    this.clear();
    shapes.forEach(shape => shape.reset());
  }

  stop() {
    this.running = false;
  }

  start() {
    const run = () => requestAnimationFrame(
      () => (
        this.tick(),
        this.draw(),
        this.running && setTimeout(run, 1)
    ));

    this.running = true;

    run();
  }
}
