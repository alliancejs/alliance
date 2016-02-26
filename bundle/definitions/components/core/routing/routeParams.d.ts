import * as express from 'express';
export declare class RouteParams {
    target: any;
    func: Function;
    request: express.Request;
    key: string;
    value: any;
    paramNames: string[];
    constructor(target: any, func: Function, request: express.Request, key: string);
    build(): any[];
    private pathVariable(arg);
    private requestParam(arg);
    private bodyParam(arg);
    private inject(arg);
}
