var process = require('process'),
    path = require('path'),
    dts = require('dts-bundle'),
    ts = require('gulp-typescript');

module.exports = function() {
    ['core', 'db', 'shell', 'views', 'config'].forEach(function(val) {
        dts.bundle({
            name: 'alliance/' + val,
            main: path.join(__dirname, '..', 'bundle', 'definitions', val + '.d.ts')
        });
    });
}
