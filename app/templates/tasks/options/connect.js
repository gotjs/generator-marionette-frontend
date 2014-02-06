module.exports = {
    server: {
        options: {
            port: 9001,
            keepalive : true,
            middleware: function (connect, options) {
                'use strict';

                return [
                    connect.static(options.base),
                    connect.directory(options.base)
                ];
            }
        }
    }
};