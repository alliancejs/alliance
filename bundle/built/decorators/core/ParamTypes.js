"use strict";

exports.allianceParams = Symbol("allianceParams");
exports.allianceBodyParser = Symbol("allianceBodyParser");
(function (allianceParamsType) {
    allianceParamsType[allianceParamsType["PathVariable"] = 0] = "PathVariable";
    allianceParamsType[allianceParamsType["RequestParam"] = 1] = "RequestParam";
    allianceParamsType[allianceParamsType["BodyParam"] = 2] = "BodyParam";
    allianceParamsType[allianceParamsType["Inject"] = 3] = "Inject";
})(exports.allianceParamsType || (exports.allianceParamsType = {}));
var allianceParamsType = exports.allianceParamsType;
//# sourceMappingURL=ParamTypes.js.map
