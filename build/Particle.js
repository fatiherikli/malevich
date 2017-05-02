"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
  function Particle(position, path) {
    _classCallCheck(this, Particle);

    this.initialPosition = Vector.from(position);
    this.position = position;
    this.velocity = Vector.random(OPTIONS.particleSpeed);
    this.acceleration = Vector.zero();
    this.path = path;
    this.draw = this.draw.bind(this);

    var xCoords = this.path.map(function (_ref) {
      var x = _ref.x;
      return x;
    });
    var yCoords = this.path.map(function (_ref2) {
      var y = _ref2.y;
      return y;
    });

    this.boundaries = {
      min: new Vector(Math.min.apply(undefined, xCoords), Math.min.apply(undefined, yCoords)),
      max: new Vector(Math.max.apply(undefined, xCoords), Math.max.apply(undefined, yCoords))
    };
  }

  _createClass(Particle, [{
    key: "reset",
    value: function reset() {
      this.position.x = this.initialPosition.x;
      this.position.y = this.initialPosition.y;
      this.velocity = Vector.random();
      this.acceleration = Vector.zero();
    }
  }, {
    key: "tick",
    value: function tick() {
      this.velocity.x += this.acceleration.x;
      this.velocity.y += this.acceleration.y;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      var intersects = this.position.intersects(this.path);

      if (intersects.result) {
        var _intersects$line = _slicedToArray(intersects.line, 2),
            v1 = _intersects$line[0],
            v2 = _intersects$line[1];

        var delta = Vector.unit(Vector.from(v2).sub(v1));

        var normal = new Vector(-delta.y, delta.x);

        var incidence = Vector.from(this.velocity);

        incidence.multiply(-1);
        incidence.normalize();

        var dot = incidence.dot(normal);

        this.velocity.set(2 * normal.x * dot - incidence.x, 2 * normal.y * dot - incidence.y);

        this.velocity.multiply(OPTIONS.particleSpeed);
      }

      if (!this.position.collides(this.path)) {
        this.reset();
      }
    }
  }, {
    key: "draw",
    value: function draw(context) {
      context.fillRect(this.position.x, this.position.y, OPTIONS.particleSize, OPTIONS.particleSize);
    }
  }], [{
    key: "create",
    value: function create(times, position, path) {
      return new Array(times).fill(undefined).map(function () {
        return new Particle(Vector.from(position), path);
      });
    }
  }]);

  return Particle;
}();