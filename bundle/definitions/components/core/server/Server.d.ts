import * as http from 'http';
import * as express from 'express';
export declare class Server {
    express: express.Express;
    srv: http.Server;
    handlebars: any;
    baseViewsDir: string;
    constructor();
}
