export declare const allianceParams: symbol;
export declare const allianceBodyParser: symbol;
export declare enum allianceParamsType {
    PathVariable = 0,
    RequestParam = 1,
    BodyParam = 2,
    Inject = 3,
}
export interface allianceParamAbstract {
    type: allianceParamsType;
    parameterIndex: number;
    target?: any;
}
