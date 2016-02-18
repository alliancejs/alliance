import * as express from 'express';
export declare abstract class AbstractController {
    template: string;
    renderVariables: Object;
    context: Object;
    app: express.Express;
    response: express.Response;
    request: express.Request;
    meta: Object;
    constructor();
    set(key: string | Object, value?: string): void;
}
