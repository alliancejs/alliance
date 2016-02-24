export declare const allianceArgs: symbol;
export declare enum allianceArgsType {
    PathVariable = 0,
    RequestParam = 1,
}
export interface allianceArgAbstract {
    type: allianceArgsType;
    parameterIndex: number;
}
