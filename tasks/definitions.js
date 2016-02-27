var process = require('process'),
    path = require('path'),
    dts = require('dts-bundle'),
    fs = require('fs-extra'),
    ts = require('gulp-typescript');

module.exports = function() {
    ['core', 'db', 'shell', 'views', 'config'].forEach(function(val) {
        dts.bundle({
            name: 'alliance/' + val,
            // removeSource: true,
            out: '../' + val + '.d.ts',
            main: path.join(__dirname, '..', 'bundle', 'definitions', 'sources', val + '.d.ts')
        });

        fs.remove(path.join(__dirname, '..', 'bundle', 'definitions', 'sources'), function (err) {
            if (err) {
                console.error(err);
            }
        });
    });
}
