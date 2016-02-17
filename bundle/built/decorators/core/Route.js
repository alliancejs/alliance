'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bundle_1 = require('../../components/Bundle');
var Router_1 = require('../../components/core/routing/Router');
(function (RouteType) {
    RouteType[RouteType["Action"] = 0] = "Action";
    RouteType[RouteType["Controller"] = 1] = "Controller";
})(exports.RouteType || (exports.RouteType = {}));
var RouteType = exports.RouteType;

var ActionDecorator = function ActionDecorator(target, key, before, after) {
    _classCallCheck(this, ActionDecorator);

    Bundle_1.controllerBuilder.registerActionDecorator(target, key, before, after);
    return function () {
        return void 0;
    };
};

exports.ActionDecorator = ActionDecorator;

var ControllerDecorator = function ControllerDecorator(target, before, after) {
    _classCallCheck(this, ControllerDecorator);

    Bundle_1.controllerBuilder.registerControllerDecorator(target, before, after);
    return function () {
        return void 0;
    };
};

exports.ControllerDecorator = ControllerDecorator;
function Route(path, options) {
    var actionClass = undefined;
    var actionPath = path;
    var callbacks = {
        before: function before(type) {
            return function (pipe) {
                if (type === RouteType.Action) {
                    if (pipe.context.meta._routeBasePath) {
                        actionPath = pipe.context.meta._routeBasePath + actionPath;
                    }
                    Bundle_1.server.express.all(actionPath, function (req, res, expressNext) {
                        actionClass = new Router_1.Router(pipe.context, pipe.key, req, res, expressNext);
                        pipe.next();
                    });
                } else {
                    pipe.context.meta._routeBasePath = path;
                    pipe.next();
                }
            };
        },
        after: function after(pipe) {
            actionClass.actionResult = pipe.result;
            Bundle_1.server.express.all(actionPath, function (req, res) {
                actionClass.render(req, res);
                pipe.next();
            });
            actionClass.execute();
        }
    };
    return function (target, key) {
        if (key) {
            new ActionDecorator(target, key, callbacks.before(RouteType.Action), callbacks.after);
        } else {
            new ControllerDecorator(target, callbacks.before(RouteType.Controller));
        }
    };
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map
