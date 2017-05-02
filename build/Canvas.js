'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas(element) {
    _classCallCheck(this, Canvas);

    this.element = element;
    this.context = element.getContext('2d');
    this.running = true;
    this.shapes = [];
    this.setup();
  }

  _createClass(Canvas, [{
    key: 'setup',
    value: function setup() {
      var element = this.element,
          context = this.context;
      // context.translate((element.width / 2), (element.height / 2))    
    }
  }, {
    key: 'add',
    value: function add() {
      for (var _len = arguments.length, shapes = Array(_len), _key = 0; _key < _len; _key++) {
        shapes[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = shapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var shape = _step.value;
          this.shapes.push(shape);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      var shapes = this.shapes;


      shapes.forEach(function (shape) {
        return shape.tick();
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      var shapes = this.shapes,
          context = this.context;


      OPTIONS.redraw && this.clear();
      shapes.forEach(function (shape) {
        return shape.draw(context);
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _element = this.element,
          width = _element.width,
          height = _element.height,
          context = this.context;

      context.clearRect(0, 0, width, height);
    }
  }, {
    key: 'reset',
    value: function reset() {
      var shapes = this.shapes;

      this.clear();
      shapes.forEach(function (shape) {
        return shape.reset();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      var run = function run() {
        return requestAnimationFrame(function () {
          return _this.tick(), _this.draw(), _this.running && setTimeout(run, 1);
        });
      };

      this.running = true;

      run();
    }
  }]);

  return Canvas;
}();