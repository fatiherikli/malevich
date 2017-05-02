'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shape = function () {
  function Shape(style, path) {
    var particles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    _classCallCheck(this, Shape);

    this.path = path;
    this.style = style;
    this.particlesCount = particles;
    this.createParticles();
  }

  _createClass(Shape, [{
    key: 'createParticles',
    value: function createParticles() {
      this.particles = Particle.create(this.particlesCount * OPTIONS.density, Vector.centroid(this.path), this.path);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.createParticles();
    }
  }, {
    key: 'tick',
    value: function tick() {
      var particles = this.particles;

      this.path.forEach(function (vector) {
        return vector.walk(OPTIONS.randomWalk);
      });
      particles.forEach(function (particle) {
        return particle.tick();
      });
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var _this = this;

      var particles = this.particles;


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
      particles.forEach(function (particle) {
        context.fillStyle = Math.random() < OPTIONS.stainProb ? 'white' : _this.style;
        particle.draw(context);
      });
    }
  }]);

  return Shape;
}();