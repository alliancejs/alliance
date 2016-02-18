import { DecoratorEvent } from './ControllerBuilder';
import { DecoratorsObject, DecoratedController } from '../interfaces/Core';
export declare class Action {
    action: DecoratorsObject;
    key: string;
    target: DecoratedController;
    result: any;
    event: DecoratorEvent;
    instance: DecoratedController;
    index: number;
    constructor(action: DecoratorsObject, key: string, target: DecoratedController);
    private context();
    private next(event, index);
    private reject();
    execute(): void;
}
