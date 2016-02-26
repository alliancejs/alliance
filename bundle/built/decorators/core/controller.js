'use strict';

var router_1 = require('../../components/core/routing/router');
var route_1 = require('./route');
function Controller(target) {
    if (Reflect.hasMetadata(route_1.allianceRoutes, target.prototype)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Reflect.getMetadata(route_1.allianceRoutes, target.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var route = _step.value;

                var path = route.path;
                if (Reflect.hasOwnMetadata(route_1.allianceBasePath, target)) {
                    path = Reflect.getMetadata(route_1.allianceBasePath, target) + route.path;
                }
                new router_1.Route(path, target, route.key);
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
//# sourceMappingURL=controller.js.map
