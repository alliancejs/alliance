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

import 'reflect-metadata';
import * as express  from 'express';
import * as http  from 'http';
import * as colors from 'colors';
import * as fs from 'fs';
import * as Exphbs from 'express-handlebars';
import * as path from 'path';
import { Action } from './Action';
import {
    ActionDecorator,
    ActionDefinition,
    ActionOptions,
    DecoratorsObject,
    DecoratedController
} from '../interfaces/Core';

export enum DecoratorEvent { Before, After }

export class ControllerBuilder {

    actionDecorators: WeakMap<DecoratedController, Map<string, DecoratorsObject>> = new WeakMap();
    controllerDecorators: WeakMap<DecoratedController, DecoratorsObject> = new WeakMap();

    /**
     * Each controller is a pipeline which sequentially executes every decorator
     * and can create just a single instance of controller class
     */
    public build(target: DecoratedController): void {

        for (let [key, pipes] of this.actionDecorators.get(target).entries()) {
            // merge action and controller pipes
            if (this.controllerDecorators.has(target)) {
                pipes = {

                    [DecoratorEvent.Before]: this.controllerDecorators.get(target)[DecoratorEvent.Before]
                                                                      .concat(pipes[DecoratorEvent.Before]),

                    [DecoratorEvent.After]: this.controllerDecorators.get(target)[DecoratorEvent.After]
                                                                     .concat(pipes[DecoratorEvent.After])

                };
            }

            // create and execute pipeline
            let pipeline = new Action(pipes, key, target);
            pipeline.execute();
        }

    }

    /**
     * Register action decorator
     *
     * This method will define new pipe for controller
     */
    public registerActionDecorator(target: any, key: any, decoratorFunc: Function, afterFunc?: Function): void {
        target = target.constructor;

        if (!this.actionDecorators.has(target)) {
            this.actionDecorators.set(target, new Map());
        }

        if (!this.actionDecorators.get(target).has(key)) {
            this.actionDecorators.get(target).set(key, {
                [DecoratorEvent.Before]: [],
                [DecoratorEvent.After]: []
            });
        }

        this.actionDecorators.get(target).get(key)[DecoratorEvent.Before].unshift(decoratorFunc);
        if (afterFunc) {
            this.actionDecorators.get(target).get(key)[DecoratorEvent.After].unshift(afterFunc);
        }
    }

    /**
     * Register controller decorator
     *
     * This function would be executed before each pipeline of decorated controller
     */
    public registerControllerDecorator(target: any, decoratorFunc: Function, afterFunc?: Function): void {
        if (!this.controllerDecorators.has(target)) {
            this.controllerDecorators.set(target, {
                [DecoratorEvent.Before]: [],
                [DecoratorEvent.After]: []
            });
        }

        this.controllerDecorators.get(target)[DecoratorEvent.Before].unshift(decoratorFunc);
        if (afterFunc) {
            this.controllerDecorators.get(target)[DecoratorEvent.After].unshift(afterFunc);
        }
    }
}
