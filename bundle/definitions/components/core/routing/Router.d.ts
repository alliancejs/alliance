import * as express from 'express';
export declare class Router {
    controller: any;
    key: any;
    req: express.Request;
    res: express.Response;
    next: any;
    actionResult: Promise<any>;
    actionResultValue: any;
    context: Object;
    viewPath: string;
    constructor(controller: any, key: any, req: express.Request, res: express.Response, next: any);
    execute(): void;
    render(req: express.Request, res: express.Response): void;
    private setViewParams();
    private setContext();
    private log(req, res);
}
