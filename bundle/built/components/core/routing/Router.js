'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var bodyParser = require('body-parser');
var _paramTypes_1 = require('../../../decorators/core/_paramTypes');
var routeParams_1 = require('./routeParams');
var bundle_1 = require('../../bundle');
var logger_1 = require('../debug/logger');

var Route = function Route(path, context, key) {
    var _this = this;

    _classCallCheck(this, Route);

    if (Reflect.hasMetadata(_paramTypes_1.allianceBodyParser, context.prototype, key)) {
        bundle_1.server.express.use(path, bodyParser.json());
    }
    bundle_1.server.express.all(path, function (req, res, next) {
        _this.actionClass = new RouteResponse(context, key, req, res, next);
        _this.actionClass.execute();
    });
    bundle_1.server.express.all(path, function (req, res) {
        _this.actionClass.render(req, res);
    });
};

exports.Route = Route;

var RouteResponse = (function () {
    function RouteResponse(target, key, req, res, next) {
        _classCallCheck(this, RouteResponse);

        this.target = target;
        this.key = key;
        this.req = req;
        this.res = res;
        this.next = next;
        this.controller = new target();
        this.controller.request = req;
        this.controller.response = res;
        this.controller.app = bundle_1.server.express;
    }

    _createClass(RouteResponse, [{
        key: 'execute',
        value: function execute() {
            var _controller,
                _this2 = this;

            this.actionResult = (_controller = this.controller)[this.key].apply(_controller, _toConsumableArray(new routeParams_1.RouteParams(this.target.prototype, this.controller[this.key], this.controller.request, this.key).build()));
            if (this.actionResult instanceof Promise) {
                this.actionResult.then(function (result) {
                    _this2.actionResultValue = result;
                    _this2.next();
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
            logger_1.Logger.info(req.method.cyan.bold, status, req.path);
        }
    }]);

    return RouteResponse;
})();

exports.RouteResponse = RouteResponse;
//# sourceMappingURL=router.js.map
