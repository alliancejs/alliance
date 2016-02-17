'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var Bundle_1 = require('../../Bundle');
var Log_1 = require('../logger/Log');

var RouteDecorator = (function () {
    function RouteDecorator(controller, key, req, res, next) {
        _classCallCheck(this, RouteDecorator);

        this.controller = controller;
        this.key = key;
        this.req = req;
        this.res = res;
        this.next = next;
        controller.request = req;
        controller.response = res;
        this.controller.app = Bundle_1.server.express;
    }

    _createClass(RouteDecorator, [{
        key: 'execute',
        value: function execute() {
            var _this = this;

            if (this.actionResult instanceof Promise) {
                this.actionResult.then(function (result) {
                    _this.actionResultValue = result;
                    _this.next();
                });
            } else {
                this.actionResultValue = this.actionResult;
                this.next();
            }
        }
    }, {
        key: 'render',
        value: function render(req, res) {
            this.log(req, res);
            switch (_typeof(this.actionResultValue)) {
                case "object":
                    if (!this.actionResultValue.hasOwnProperty('statusCode')) {
                        res.end(JSON.stringify(this.actionResultValue));
                    }
                    break;
                case "number":
                case "string":
                    res.end(this.actionResultValue);
                    break;
                default:
                    this.setContext();
                    this.setViewParams();
                    this.res.render(this.viewPath, this.context);
                    break;
            }
        }
    }, {
        key: 'setViewParams',
        value: function setViewParams() {
            if (!this.controller.template) {
                this.controller.template = this.key.toLowerCase();
            }
            this.viewPath = path.join(this.controller.constructor.name.slice(0, -10).toLowerCase(), this.controller.template);
        }
    }, {
        key: 'setContext',
        value: function setContext() {
            this.context = this.controller;
            for (var key in this.controller.renderVariables) {
                this.context[key] = this.controller.renderVariables[key];
            }
        }
    }, {
        key: 'log',
        value: function log(req, res) {
            var status = res.statusCode.toString();
            if (res.statusCode >= 200 && res.statusCode < 300) {
                status = status.green;
            } else if (res.statusCode >= 300 && res.statusCode < 500) {
                status = status.yellow;
            } else if (res.statusCode >= 500) {
                status = status.red;
            }
            Log_1.Log.message(req.method.cyan.bold, status, req.path);
        }
    }]);

    return RouteDecorator;
})();

exports.RouteDecorator = RouteDecorator;
//# sourceMappingURL=Route.js.map
