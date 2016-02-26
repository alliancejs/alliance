import * as express from 'express';

import { getParamNames } from '../../lib/paramNames';
import { allianceParams, allianceParamsType, allianceParamAbstract } from '../../../decorators/core/_paramTypes';

export class RouteParams {

    value: any;
    paramNames: string[];

    constructor(public target: any, public func: Function, public request: express.Request, public key: string) {
        // return args;
    }

    public build(): any[] {
        let args = [];

        if (Reflect.hasMetadata(allianceParams, this.target, this.key)) {
            this.paramNames = getParamNames(this.func);

            let argsList = <allianceParamAbstract[]> Reflect.getMetadata(allianceParams, this.target, this.key).sort((a, b) => {
                return a.parameterIndex > b.parameterIndex;
            });

            for (let arg of argsList) {
                switch (arg.type) {
                    case allianceParamsType.PathVariable:
                        this.pathVariable(arg);
                    break;
                    case allianceParamsType.RequestParam:
                        this.requestParam(arg);
                    break;
                    case allianceParamsType.BodyParam:
                        this.bodyParam(arg);
                    break;
                    case allianceParamsType.Inject:
                        this.inject(arg);
                    break;
                }

                args.push(this.value);
            }
        }

        return args;
    }

    private pathVariable(arg: allianceParamAbstract): void {
        this.value = this.request.params[ this.paramNames[arg.parameterIndex] ];
    }

    private requestParam(arg: allianceParamAbstract): void {
        this.value = this.request.query[ this.paramNames[arg.parameterIndex] ];
    }

    private bodyParam(arg: allianceParamAbstract): void {
        this.value = this.request.body[ this.paramNames[arg.parameterIndex] ];
    }

    private inject(arg: allianceParamAbstract): void {
        this.value = new arg.target();
    }

}
