define(function () {
    'use strict';

    var noop = function () {};
    var console = window.console || {
        info : noop,
        debug : noop,
        error : noop,
        log : noop
    };

    return function (app) {
        app.logger = {
            info : function () {
                console.info.apply(console, arguments);
            },
            debug : function () {
                console.debug.apply(console, arguments);
            },
            error : function () {
                console.error.apply(console, arguments);
            },
            exception : function (exception) {
                console.error(exception, exception.stack);
            },
            log : function () {
                console.log.apply(console, arguments);
            }
        };
    };
});






