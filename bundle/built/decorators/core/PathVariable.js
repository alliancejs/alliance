'use strict';

var ParamTypes_1 = require('./ParamTypes');
function PathVariable(target, propertyKey, parameterIndex) {
    var args = Reflect.getMetadata(ParamTypes_1.allianceParams, target, propertyKey) || [];
    args.push({
        type: ParamTypes_1.allianceParamsType.PathVariable,
        parameterIndex: parameterIndex
    });
    Reflect.defineMetadata(ParamTypes_1.allianceParams, args, target, propertyKey);
}
exports.PathVariable = PathVariable;
//# sourceMappingURL=PathVariable.js.map
