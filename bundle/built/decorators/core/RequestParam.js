'use strict';

var ParamTypes_1 = require('./ParamTypes');
function RequestParam(target, propertyKey, parameterIndex) {
    var args = Reflect.getMetadata(ParamTypes_1.allianceParams, target, propertyKey) || [];
    args.push({
        type: ParamTypes_1.allianceParamsType.RequestParam,
        parameterIndex: parameterIndex
    });
    Reflect.defineMetadata(ParamTypes_1.allianceParams, args, target, propertyKey);
}
exports.RequestParam = RequestParam;
//# sourceMappingURL=RequestParam.js.map
