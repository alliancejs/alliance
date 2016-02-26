import { allianceParams, allianceParamsType, allianceParamAbstract } from './_paramTypes';

export function RequestParam(target: Object, propertyKey: string|symbol, parameterIndex: number) {

    let args: allianceParamAbstract[] = Reflect.getMetadata(allianceParams, target, propertyKey) || [];

    args.push({
        type: allianceParamsType.RequestParam,
        parameterIndex: parameterIndex
    });

    Reflect.defineMetadata(allianceParams, args, target, propertyKey);

}
