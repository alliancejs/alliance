import { allianceParams, allianceParamsType, allianceParamAbstract, allianceBodyParser } from './_paramTypes';

export function BodyParam(target: Object, propertyKey: string|symbol, parameterIndex: number) {

    let args: allianceParamAbstract[] = Reflect.getMetadata(allianceParams, target, propertyKey) || [];

    args.push({
        type: allianceParamsType.BodyParam,
        parameterIndex: parameterIndex
    });

    Reflect.defineMetadata(allianceBodyParser, true, target, propertyKey);
    Reflect.defineMetadata(allianceParams, args, target, propertyKey);

}
