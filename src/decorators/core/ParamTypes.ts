export const allianceParams = Symbol("allianceParams");
export const allianceBodyParser = Symbol("allianceBodyParser");
export enum allianceParamsType {
    PathVariable, RequestParam, BodyParam, Inject
}

export interface allianceParamAbstract {
    type: allianceParamsType;
    parameterIndex: number;
    target?: any;
}
