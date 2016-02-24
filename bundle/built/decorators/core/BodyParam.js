'use strict';

var ParamTypes_1 = require('./ParamTypes');
function BodyParam(target, propertyKey, parameterIndex) {
    var args = Reflect.getMetadata(ParamTypes_1.allianceParams, target, propertyKey) || [];
    args.push({
        type: ParamTypes_1.allianceParamsType.BodyParam,
        parameterIndex: parameterIndex
    });
    Reflect.defineMetadata(ParamTypes_1.allianceBodyParser, true, target, propertyKey);
    Reflect.defineMetadata(ParamTypes_1.allianceParams, args, target, propertyKey);
}
exports.BodyParam = BodyParam;
//# sourceMappingURL=BodyParam.js.map
