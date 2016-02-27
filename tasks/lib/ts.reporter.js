var gutil = require('gulp-util');
var semanticCounterFix = 0;

function defaultFinishHandler(results) {
    var hasError = false;
    var showErrorCount = function (count, type) {
        if (count === 0)
            return;
        gutil.log('TypeScript:', gutil.colors.magenta(count.toString()), (type !== '' ? type + ' ' : '') + (count === 1 ? 'error' : 'errors'));
        hasError = true;
    };
    showErrorCount(results.transpileErrors, '');
    showErrorCount(results.syntaxErrors, 'syntax');
    showErrorCount(results.globalErrors, 'global');
    showErrorCount(results.semanticErrors - semanticCounterFix, 'semantic');
    showErrorCount(results.emitErrors, 'emit');
    if (results.emitSkipped) {
        gutil.log('TypeScript: emit', gutil.colors.red('failed'));
    }
    else if (hasError) {
        gutil.log('TypeScript: emit', gutil.colors.cyan('succeeded'), '(with errors)');
    }

    semanticCounterFix = 0;
}

var errorShowed = false;

module.exports = function() {
    return {
        error: function (error) {
            if ([2300, 2375, 2374].indexOf(error.diagnostic.code) < 0) {
                console.error(error.message);
            } else {
                semanticCounterFix++;
            }
        },
        finish: defaultFinishHandler
    };
}
