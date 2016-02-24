'use strict';

var Router_1 = require('../../components/core/routing/Router');
var Route_1 = require('./Route');
function Controller(target) {
    if (Reflect.hasMetadata(Route_1.allianceRoutes, target.prototype)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Reflect.getMetadata(Route_1.allianceRoutes, target.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var route = _step.value;

                var path = route.path;
                if (Reflect.hasOwnMetadata(Route_1.allianceBasePath, target)) {
                    path = Reflect.getMetadata(Route_1.allianceBasePath, target) + route.path;
                }
                new Router_1.Route(path, target, route.key);
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
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map
