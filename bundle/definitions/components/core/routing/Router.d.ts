import * as express from 'express';
export declare class Route {
    actionClass: any;
    constructor(path: any, context: any, key: any);
}
export declare class RouteResponse {
    target: any;
    key: any;
    req: express.Request;
    res: express.Response;
    next: any;
    controller: any;
    actionResult: Promise<any>;
    actionResultValue: any;
    context: Object;
    viewPath: string;
    constructor(target: any, key: any, req: express.Request, res: express.Response, next: any);
    execute(): void;
    render(req: express.Request, res: express.Response): void;
    private setViewParams();
    private setContext();
    private log(req, res);
}
