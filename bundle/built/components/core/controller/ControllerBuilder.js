'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('reflect-metadata');
var Action_1 = require('./Action');
(function (DecoratorEvent) {
    DecoratorEvent[DecoratorEvent["Before"] = 0] = "Before";
    DecoratorEvent[DecoratorEvent["After"] = 1] = "After";
})(exports.DecoratorEvent || (exports.DecoratorEvent = {}));
var DecoratorEvent = exports.DecoratorEvent;

var ControllerBuilder = (function () {
    function ControllerBuilder() {
        _classCallCheck(this, ControllerBuilder);

        this.actionDecorators = new WeakMap();
        this.controllerDecorators = new WeakMap();
    }

    _createClass(ControllerBuilder, [{
        key: 'build',
        value: function build(target) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.actionDecorators.get(target).entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var key = _step$value[0];
                    var pipes = _step$value[1];

                    if (this.controllerDecorators.has(target)) {
                        var _pipes;

                        pipes = (_pipes = {}, _defineProperty(_pipes, DecoratorEvent.Before, this.controllerDecorators.get(target)[DecoratorEvent.Before].concat(pipes[DecoratorEvent.Before])), _defineProperty(_pipes, DecoratorEvent.After, this.controllerDecorators.get(target)[DecoratorEvent.After].concat(pipes[DecoratorEvent.After])), _pipes);
                    }
                    var pipeline = new Action_1.Action(pipes, key, target);
                    pipeline.execute();
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
        key: 'registerActionDecorator',
        value: function registerActionDecorator(target, key, decoratorFunc, afterFunc) {
            target = target.constructor;
            if (!this.actionDecorators.has(target)) {
                this.actionDecorators.set(target, new Map());
            }
            if (!this.actionDecorators.get(target).has(key)) {
                var _actionDecorators$get;

                this.actionDecorators.get(target).set(key, (_actionDecorators$get = {}, _defineProperty(_actionDecorators$get, DecoratorEvent.Before, []), _defineProperty(_actionDecorators$get, DecoratorEvent.After, []), _actionDecorators$get));
            }
            this.actionDecorators.get(target).get(key)[DecoratorEvent.Before].unshift(decoratorFunc);
            if (afterFunc) {
                this.actionDecorators.get(target).get(key)[DecoratorEvent.After].unshift(afterFunc);
            }
        }
    }, {
        key: 'registerControllerDecorator',
        value: function registerControllerDecorator(target, decoratorFunc, afterFunc) {
            if (!this.controllerDecorators.has(target)) {
                var _controllerDecorators;

                this.controllerDecorators.set(target, (_controllerDecorators = {}, _defineProperty(_controllerDecorators, DecoratorEvent.Before, []), _defineProperty(_controllerDecorators, DecoratorEvent.After, []), _controllerDecorators));
            }
            this.controllerDecorators.get(target)[DecoratorEvent.Before].unshift(decoratorFunc);
            if (afterFunc) {
                this.controllerDecorators.get(target)[DecoratorEvent.After].unshift(afterFunc);
            }
        }
    }]);

    return ControllerBuilder;
})();

exports.ControllerBuilder = ControllerBuilder;
//# sourceMappingURL=ControllerBuilder.js.map
