import { allianceParams, allianceParamsType, allianceParamAbstract } from './ParamTypes';

export function PathVariable(target: Object, propertyKey: string|symbol, parameterIndex: number) {

    let args: allianceParamAbstract[] = Reflect.getMetadata(allianceParams, target, propertyKey) || [];

    args.push({
        type: allianceParamsType.PathVariable,
        parameterIndex: parameterIndex
    });

    Reflect.defineMetadata(allianceParams, args, target, propertyKey);

}
