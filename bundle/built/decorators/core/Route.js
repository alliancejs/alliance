"use strict";

exports.allianceRoutes = Symbol("allianceRoutes");
exports.allianceBasePath = Symbol("allianceBasePath");
function Route(path) {
    var methods = arguments.length <= 1 || arguments[1] === undefined ? ['GET'] : arguments[1];

    return function (target, key, descriptor) {
        if (key) {
            var routes = Reflect.getMetadata(exports.allianceRoutes, target) || [];
            routes.push({
                path: path,
                key: key
            });
            Reflect.defineMetadata(exports.allianceRoutes, routes, target);
        } else {
            Reflect.defineMetadata(exports.allianceBasePath, path, target);
        }
    };
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map
