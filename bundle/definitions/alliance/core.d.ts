// Generated by dts-bundle v0.4.3
// Dependencies for this module:
//   ../../express

declare module 'alliance/core' {
    export { Application } from 'alliance/core/decorators/core/Application';
    export { Inject } from 'alliance/core/decorators/core/Inject';
    export { Controller } from 'alliance/core/decorators/core/Controller';
    export { Route } from 'alliance/core/decorators/core/Route';
    export { PathVariable } from 'alliance/core/decorators/core/PathVariable';
    export { RequestParam } from 'alliance/core/decorators/core/RequestParam';
    export { BodyParam } from 'alliance/core/decorators/core/BodyParam';
    export { AbstractController } from 'alliance/core/components/core/controller/AbstractController';
    export { Log } from 'alliance/core/components/core/debug/Log';
}

declare module 'alliance/core/decorators/core/Application' {
    export function Application(target: any): void;
}

declare module 'alliance/core/decorators/core/Inject' {
    export function Inject(target: any, propertyKey: string | symbol, parameterIndex?: number): void;
}

declare module 'alliance/core/decorators/core/Controller' {
    export function Controller(target: any): void;
}

declare module 'alliance/core/decorators/core/Route' {
    export const allianceRoutes: symbol;
    export const allianceBasePath: symbol;
    export interface allianceRoute {
        path: string;
        key: string;
    }
    export function Route(path: string, methods?: string[]): (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => void;
}

declare module 'alliance/core/decorators/core/PathVariable' {
    export function PathVariable(target: Object, propertyKey: string | symbol, parameterIndex: number): void;
}

declare module 'alliance/core/decorators/core/RequestParam' {
    export function RequestParam(target: Object, propertyKey: string | symbol, parameterIndex: number): void;
}

declare module 'alliance/core/decorators/core/BodyParam' {
    export function BodyParam(target: Object, propertyKey: string | symbol, parameterIndex: number): void;
}

declare module 'alliance/core/components/core/controller/AbstractController' {
    import * as express from 'express';
    export abstract class AbstractController {
        template: string;
        renderVariables: Object;
        context: Object;
        app: express.Express;
        response: express.Response;
        request: express.Request;
        meta: any;
        constructor();
        set(key: string | Object, value?: string): void;
    }
}

declare module 'alliance/core/components/core/debug/Log' {
    export class Log {
        static message(...message: any[]): void;
        static warning(...message: any[]): void;
        static error(...message: any[]): void;
        static success(...message: any[]): void;
        static event: {
            warning: string;
            error: string;
            info: string;
            request: string;
        };
    }
}

