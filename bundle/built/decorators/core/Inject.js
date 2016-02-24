"use strict";

var ParamTypes_1 = require('./ParamTypes');
function Inject(target, propertyKey, parameterIndex) {
    var injectedTarget = Reflect.getMetadata("design:type", target, propertyKey);
    if (parameterIndex) {
        var args = Reflect.getMetadata(ParamTypes_1.allianceParams, target, propertyKey) || [];
        args.push({
            type: ParamTypes_1.allianceParamsType.Inject,
            target: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
            parameterIndex: parameterIndex
        });
        Reflect.defineMetadata(ParamTypes_1.allianceParams, args, target, propertyKey);
    } else {
        var getter = function getter() {
            var k = "_allianceInjected" + propertyKey;
            if (!this[k]) {
                this[k] = new injectedTarget();
            }
            return this[k];
        };
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                enumerable: true,
                configurable: true
            });
        }
    }
}
exports.Inject = Inject;
//# sourceMappingURL=Inject.js.map
