'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = (function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, null, [{
        key: 'info',
        value: function info() {
            if (allianceTaskOptions.debug) {
                var _console;

                for (var _len = arguments.length, message = Array(_len), _key = 0; _key < _len; _key++) {
                    message[_key] = arguments[_key];
                }

                (_console = console).log.apply(_console, [('[' + new Date().toLocaleString() + ']').gray].concat(message));
            }
        }
    }, {
        key: 'warning',
        value: function warning() {
            for (var _len2 = arguments.length, message = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                message[_key2] = arguments[_key2];
            }

            this.info(message.join(' ').yellow);
        }
    }, {
        key: 'error',
        value: function error() {
            for (var _len3 = arguments.length, message = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                message[_key3] = arguments[_key3];
            }

            this.info(message.join(' ').red);
        }
    }, {
        key: 'success',
        value: function success() {
            for (var _len4 = arguments.length, message = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                message[_key4] = arguments[_key4];
            }

            this.info(message.join(' ').green);
        }
    }]);

    return Logger;
})();

Logger.event = {
    warning: 'warning',
    error: 'error',
    info: 'message',
    request: 'request'
};
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map
