import * as program from 'commander';

export class ShellEngine {

    commands: WeakMap<any, Set<any>> = new WeakMap();

    public registerShell(target: any): void {
        /*for (const command of this.commands.get(target)) {
            //
        }*/
    }

    public registerCommand(): void {
        //
    }

}
