import { ShellEngine } from './components/shell/shell';

let shell = new ShellEngine();

export class AbstractShell {
    
}

export function Shell(name: string, options) {
    return (target, key) => {
        shell.registerShell(target);
    }
}

export function Command(target: any) {
    return (target, key) => {
        shell.registerCommand();
    }
}
