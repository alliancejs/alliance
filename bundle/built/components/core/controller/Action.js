'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ControllerBuilder_1 = require('./ControllerBuilder');

var PipelineCallbackResult = (function () {
    function PipelineCallbackResult(key, next, reject, result, instance) {
        _classCallCheck(this, PipelineCallbackResult);

        this.key = key;
        this.next = next;
        this.reject = reject;
        this.result = result;
        this.instance = instance;
    }

    _createClass(PipelineCallbackResult, [{
        key: 'context',
        get: function get() {
            return this.instance();
        }
    }]);

    return PipelineCallbackResult;
})();

var Action = (function () {
    function Action(action, key, target) {
        _classCallCheck(this, Action);

        this.action = action;
        this.key = key;
        this.target = target;
        this.result = void 0;
        this.event = ControllerBuilder_1.DecoratorEvent.Before;
        this.instance = void 0;
        this.index = 0;
    }

    _createClass(Action, [{
        key: 'context',
        value: function context() {
            if (!this.instance) {
                this.instance = new this.target();
            }
            return this.instance;
        }
    }, {
        key: 'next',
        value: function next(event, index) {
            var _this = this;

            if (event == ControllerBuilder_1.DecoratorEvent.After && index === 0) {
                this.result = this.context()[this.key]();
            }
            if (this.action[event][index]) {
                this.action[event][index](new PipelineCallbackResult(this.key, function () {
                    return _this.next(event, index + 1);
                }, function () {
                    return _this.reject();
                }, this.result, function () {
                    return _this.context();
                }));
            } else if (event === ControllerBuilder_1.DecoratorEvent.Before) {
                this.next(ControllerBuilder_1.DecoratorEvent.After, 0);
            } else if (event === ControllerBuilder_1.DecoratorEvent.After) {
                this.instance = void 0;
                this.result = void 0;
            }
        }
    }, {
        key: 'reject',
        value: function reject() {}
    }, {
        key: 'execute',
        value: function execute() {
            this.next(ControllerBuilder_1.DecoratorEvent.Before, 0);
        }
    }]);

    return Action;
})();

exports.Action = Action;
//# sourceMappingURL=Action.js.map
