'use strict';

var shell_1 = require('./components/shell/shell');
var shell = new shell_1.ShellEngine();
function Shell(name, options) {
    return function (target, key) {
        shell.registerShell(target);
    };
}
exports.Shell = Shell;
function Command(target) {
    return function (target, key) {
        shell.registerCommand();
    };
}
exports.Command = Command;
//# sourceMappingURL=shell.js.map
