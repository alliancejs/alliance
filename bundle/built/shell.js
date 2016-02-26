'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var shell_1 = require('./components/shell/shell');
var shell = new shell_1.ShellEngine();

var AbstractShell = function AbstractShell() {
    _classCallCheck(this, AbstractShell);
};

exports.AbstractShell = AbstractShell;
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
