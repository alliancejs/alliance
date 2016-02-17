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

import { AbstractController } from '../controller/AbstractController';

export interface ActionDecorator {
    key: string;
    decoratorFunc: Function;
}

export interface ActionDefinition {
    path: string;
    key: string;
    options: ActionOptions;
}

export interface ActionOptions {
    methods: Array<string>;
}

export interface RouteMeta {

}

export interface DecoratedController extends AbstractController {
    new();
}

export interface DecoratorsObject {
    [event: string]: Function[];
}
