'use strict';

var _paramTypes_1 = require('./_paramTypes');
function BodyParam(target, propertyKey, parameterIndex) {
    var args = Reflect.getMetadata(_paramTypes_1.allianceParams, target, propertyKey) || [];
    args.push({
        type: _paramTypes_1.allianceParamsType.BodyParam,
        parameterIndex: parameterIndex
    });
    Reflect.defineMetadata(_paramTypes_1.allianceBodyParser, true, target, propertyKey);
    Reflect.defineMetadata(_paramTypes_1.allianceParams, args, target, propertyKey);
}
exports.BodyParam = BodyParam;
//# sourceMappingURL=bodyParam.js.map
