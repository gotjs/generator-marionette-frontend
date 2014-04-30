module.exports = {
    server: {
        options: {
            port: 9001,
            keepalive : true,
            middleware: function (connect, options) {
                'use strict';

                var grunt = require('grunt');

                var target = grunt.config('target');
                var dir = options.base;

                if (target !== 'development') {
                    dir = 'build/dist';
                }

                return [
                    connect.static(dir),
                    connect.directory(dir)
                ];
            }
        }
    }
};