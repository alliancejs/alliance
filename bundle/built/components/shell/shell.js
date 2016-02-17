"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShellEngine = (function () {
    function ShellEngine() {
        _classCallCheck(this, ShellEngine);

        this.commands = new WeakMap();
    }

    _createClass(ShellEngine, [{
        key: "registerShell",
        value: function registerShell(target) {}
    }, {
        key: "registerCommand",
        value: function registerCommand() {}
    }]);

    return ShellEngine;
})();

exports.ShellEngine = ShellEngine;
//# sourceMappingURL=shell.js.map
