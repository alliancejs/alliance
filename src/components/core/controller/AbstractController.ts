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

import * as express from 'express';

export abstract class AbstractController {

    template: string = null;
    renderVariables: Object = {};
    context: Object;

    app: express.Express;
    response: express.Response;
    request: express.Request;
    meta: any = {};

    constructor () {}

    /**
     * Set local action`s variables for template
     */
    public set(key: string | Object, value?: string): void {
        if (typeof key === 'string')
            this.renderVariables[key] = value;
        else {
            for (let k in key) {
                this.renderVariables[k] = key[k];
            }
        }
    }

}
