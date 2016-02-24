import * as express from 'express';
export declare class RouteArgs {
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
}
