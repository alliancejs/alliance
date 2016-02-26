'use strict';

var _paramTypes_1 = require('./_paramTypes');
function RequestParam(target, propertyKey, parameterIndex) {
    var args = Reflect.getMetadata(_paramTypes_1.allianceParams, target, propertyKey) || [];
    args.push({
        type: _paramTypes_1.allianceParamsType.RequestParam,
        parameterIndex: parameterIndex
    });
    Reflect.defineMetadata(_paramTypes_1.allianceParams, args, target, propertyKey);
}
exports.RequestParam = RequestParam;
//# sourceMappingURL=requestParam.js.map
