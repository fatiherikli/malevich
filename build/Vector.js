"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -Infinity;
    var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Infinity;

    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
    this.min = min;
    this.max = max;
  }

  _createClass(Vector, [{
    key: "limit",
    value: function limit(min, max) {
      return this.min = min, this.max = max, this;
    }
  }, {
    key: "applyLimit",
    value: function applyLimit() {
      this.x = this.x < this.min ? this.min : this.x;
      this.x = this.x > this.max ? this.max : this.x;
    }
  }, {
    key: "set",
    value: function set(x, y) {
      return this.x = x, this.y = y, this;
    }
  }, {
    key: "add",
    value: function add(_ref) {
      var x = _ref.x,
          y = _ref.y;

      this.x += x;
      this.y += y;
    }
  }, {
    key: "div",
    value: function div(scalar) {
      this.x /= scalar;
      this.y /= scalar;
    }
  }, {
    key: "sub",
    value: function sub(vector) {
      return this.x -= vector.x, this.y -= vector.y, this;
    }
  }, {
    key: "multiply",
    value: function multiply(scalar) {
      this.x *= scalar;
      this.y *= scalar;
    }
  }, {
    key: "scale",
    value: function scale(vector) {
      this.x *= vector.x;
      this.y *= vector.y;
    }
  }, {
    key: "distance",
    value: function distance(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;

      return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    }
  }, {
    key: "between",
    value: function between(a, b) {
      // console.log(a.distance(this) + this.distance(b) - a.distance(b));
      return a.distance(this) + this.distance(b) - a.distance(b) < 0.2;
    }
  }, {
    key: "intersects",
    value: function intersects(vectors) {
      // console.log('a', vectors)
      var n = vectors.length;
      for (var i = 0; i < n; i++) {
        var v1 = vectors[i];
        var v2 = vectors[i + 1];
        if (v2 && this.between(v1, v2)) {
          return {
            result: true,
            line: [v1, v2]
          };
        }
      }
      return {
        result: false,
        line: null
      };
    }
  }, {
    key: "collides",
    value: function collides(vectors) {
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
      // https://github.com/substack/point-in-polygon/blob/master/index.js
      var x = this.x,
          y = this.y;

      var colliding = false;

      for (var i = 0, j = vectors.length - 1; i < vectors.length; j = i++) {
        var _vectors$i = vectors[i],
            xi = _vectors$i.x,
            yi = _vectors$i.y;
        var _vectors$j = vectors[j],
            xj = _vectors$j.x,
            yj = _vectors$j.y;


        if (yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
          colliding = !colliding;
        }
      }

      return colliding;
    }
  }, {
    key: "dot",
    value: function dot(vector) {
      return this.x * vector.x + this.y * vector.y;
    }
  }, {
    key: "magnitude",
    value: function magnitude() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var magnitude = this.magnitude();
      return this.set(this.x / magnitude, this.y / magnitude);
    }
  }, {
    key: "walk",
    value: function walk() {
      var add = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      // random walk algorithm
      var coins = Math.floor(Math.random() * 4);
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
  }], [{
    key: "unit",
    value: function unit(vector) {
      return Vector.from(vector).normalize();
    }
  }, {
    key: "zero",
    value: function zero(times) {
      return new Vector();
    }
  }, {
    key: "random",
    value: function random(scale) {
      return new Vector(
      // 0.3,
      // 1,
      // Math.random() > 0.5 ? -1 : 1,
      // Math.random() > 0.5 ? -1 : 1
      (Math.random() * 2 - 1) * scale, (Math.random() * 2 - 1) * scale);
    }
  }, {
    key: "from",
    value: function from(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;

      // Clone a vector
      return new Vector(x, y);
    }
  }, {
    key: "centroid",
    value: function centroid(path) {
      var xs = path.map(function (_ref4) {
        var x = _ref4.x;
        return x;
      });
      var ys = path.map(function (_ref5) {
        var y = _ref5.y;
        return y;
      });

      return new Vector((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2);
    }
  }, {
    key: "new",
    value: function _new(_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          x = _ref7[0],
          y = _ref7[1];

      return new Vector(x, y);
    }
  }]);

  return Vector;
}();