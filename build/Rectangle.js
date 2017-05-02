'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
  function Rectangle(position, width, height) {
    _classCallCheck(this, Rectangle);

    this.position = position;
    this.width = width;
    this.height = height;
    this.particles = Particle.create(30, this.position);
  }

  _createClass(Rectangle, [{
    key: 'tick',
    value: function tick() {
      var particles = this.particles;


      particles.forEach(function (particle) {
        return particle.tick();
      });
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var particles = this.particles;

      // context.fillStyle = 'gray';
      // context.fillRect(this.position.x, this.position.y, this.width, this.height);

      context.fillStyle = 'black';
      particles.forEach(function (particle) {
        return context.fillRect(particle.position.x, particle.position.y, 2, 2);
      });
    }
  }]);

  return Rectangle;
}();