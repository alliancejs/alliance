import { controllerBuilder } from '../../components/Bundle';

export function Controller(target: any) {
    controllerBuilder.build(target);
}
