import { allianceParams, allianceParamsType, allianceParamAbstract, allianceBodyParser } from './ParamTypes';

/**
 * Inject (Autowired) decorator
 */
export function Inject(target: any, propertyKey: string|symbol, parameterIndex?: number) {
    let injectedTarget = Reflect.getMetadata("design:type", target, propertyKey);

    if (parameterIndex) {
        let args: allianceParamAbstract[] = Reflect.getMetadata(allianceParams, target, propertyKey) || [];

        args.push({
            type: allianceParamsType.Inject,
            target: Reflect.getMetadata("design:paramtypes", target, propertyKey)[parameterIndex],
            parameterIndex: parameterIndex
        });

        Reflect.defineMetadata(allianceParams, args, target, propertyKey);
    } else {
        let getter = function () {
            let k = `_allianceInjected${propertyKey}`;

            if (!this[k]) {
                this[k] = new injectedTarget();
            }

            return this[k];
        };

        // Create new property with getter and setter
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, {
                get: getter,
                enumerable: true,
                configurable: true
            });
        }
    }

}
