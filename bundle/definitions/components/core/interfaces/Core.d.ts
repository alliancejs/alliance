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
    new (): any;
}
export interface DecoratorsObject {
    [event: string]: Function[];
}
