import { DecoratorEvent } from './ControllerBuilder';
import {
    ActionDecorator,
    DecoratorsObject,
    DecoratedController
} from '../interfaces/Core';

class PipelineCallbackResult {
    constructor(
        public key: string,
        public next: Function,
        public reject: Function,
        public result: any,
        public instance: any
    ) {
        //
    }

    get context(): DecoratedController {
        return this.instance();
    }
}

export class Action {

    result: any = void 0;
    event: DecoratorEvent = DecoratorEvent.Before;
    instance: DecoratedController = void 0;
    index: number = 0;

    constructor(public action: DecoratorsObject,
                public key: string,
                public target: DecoratedController) {
    }

    /**
     * Create and return context for current pipeline
     */
    private context(): DecoratedController {
        if (!this.instance) {
            this.instance = new this.target();
        }

        return this.instance;
    }

    /**
     * Execute next pipe if exists otherwise execute action method
     */
    private next(event, index): void {
        if (event == DecoratorEvent.After && index === 0) {
            // execute action method
            this.result = this.context()[this.key]();
        }

        if (this.action[event][index]) {
            // set arguments to pass to decorator callback
            this.action[event][index](new PipelineCallbackResult(
                this.key,
                () => this.next(event, index + 1),
                () => this.reject(),
                this.result,
                () => this.context()
            ));
        }
        else if (event === DecoratorEvent.Before) {
            this.next(DecoratorEvent.After, 0);
        }
        else if (event === DecoratorEvent.After) {
            this.instance = void 0;
            this.result = void 0;
        }
    }

    /**
     * Reject pipeline execution
     */
    private reject(): void {
        // reject
    }

    /**
     * Execute current pipeline
     */
    public execute(): void {
        this.next(DecoratorEvent.Before, 0);
    }
}
