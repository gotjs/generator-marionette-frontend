// Karma configuration
// Generated on Thu Aug 22 2013 14:43:40 GMT+0300 (FLE Daylight Time)

module.exports = function (config) {
    'use strict';

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // frameworks to use
        frameworks: ['mocha', 'requirejs', 'chai'],

        // list of files / patterns to load in the browser
        files: [

            {pattern: 'node_modules/sinon/pkg/sinon.js' },
            {pattern: 'node_modules/chai-as-promised/lib/chai-as-promised.js', included: false, served : true },

            {pattern: 'bower_components/**/*.js', included: false },
            //App code
            {pattern: 'app/**/*.js', included: false },
            //App templates
            {pattern: 'app/**/*.hbs', included: false, served : true },
            {pattern: 'test/unit/**/*Spec.js', included: false },

            'test/unit/test-main.js'
        ],

        preprocessors : {
        },

        // list of files to exclude
        exclude: [
            'app/bootstrap.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['dots', 'junit'],

        junitReporter: {
            outputFile: 'test-results.xml'
        },

        // web server port
        port: 9877,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
