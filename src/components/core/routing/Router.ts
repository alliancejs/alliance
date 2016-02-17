/**
 * Alliance : TypeScript framework for NodeJS (http://alliancejs.com)
 * Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 * @link          http://alliancejs.com Alliance Project
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

import * as express  from 'express';
import * as path from 'path';
import { controllerBuilder, server } from '../../Bundle';
import { RouteType } from '../../../decorators/core/Route';
import { Log } from '../debug/Log';
import {
    DecoratedController,
    ActionDefinition
} from '../interfaces/core';

export class Router {

    actionResult: Promise<any>;
    actionResultValue: any;
    context: Object;
    viewPath: string;

    constructor(public controller: any,
                public key: any,
                public req: express.Request,
                public res: express.Response,
                public next: any) {

        controller.request = req;
        controller.response = res;

        this.controller.app = server.express;
    }

    /**
     * Execute action method and call express next
     */
    public execute(): void {
        if (this.actionResult instanceof Promise) {
            this.actionResult.then(result => {
                this.actionResultValue = result;
                this.next();
            });
        } else {
            this.actionResultValue = this.actionResult;
            this.next();
        }
    }

    /**
     * Render view if action isn`t restful
     */
    public render(req: express.Request, res: express.Response): void {
        this.log(req, res);

        switch (typeof this.actionResultValue) {
            case "object":
                if (!this.actionResultValue.hasOwnProperty('statusCode')) {
                    res.end(JSON.stringify(this.actionResultValue));
                }
            break;
            case "number":
            case "string":
                res.end(this.actionResultValue);
            break;
            default:
                this.setContext();
                this.setViewParams();

                this.res.render(this.viewPath, this.context);
            break;
        }

    }

    /**
     * Set view params e.g. layout, template and view path
     */
    private setViewParams(): void {
        /*if (this.controller.options.hasOwnProperty('layout') &&
            !this.controller.hasOwnProperty('layout')) {
            this.controller['layout'] = this.controller.options.layout;
        }*/

        if (!this.controller.template) {
            this.controller.template = this.key.toLowerCase();
        }

        this.viewPath = path.join(
            this.controller.constructor.name.slice(0, -10).toLowerCase(),
            this.controller.template
        );
    }

    /**
     * Set context for handlebars
     */
    private setContext(): void {
        this.context = this.controller;

        for (const key in this.controller.renderVariables) {
            this.context[key] = this.controller.renderVariables[key];
        }
    }

    /**
     * Log request after response
     */
    private log(req, res): void {
        let status = res.statusCode.toString();

        if (res.statusCode >= 200 && res.statusCode < 300) {
            status = status.green;
        }
        else if (res.statusCode >= 300 && res.statusCode < 500) {
            status = status.yellow;
        }
        else if (res.statusCode >= 500) {
            status = status.red;
        }

        Log.message(req.method.cyan.bold, status, req.path);
    }

}
