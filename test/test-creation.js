/*global describe, before, it*/
'use strict';

/**
 * Overwrite spawn function for tests. We need only stderr otherwise code coverage is messed.
 */
var oldSpawn = require('child_process').spawn;
require('child_process').spawn = function (command, args, options) {
    return oldSpawn(command, args, { stdio: ['pipe', 'pipe', process.stderr] });
};

var assert  = require('assert');
var glob = require('glob');
var helpers = require('yeoman-generator').test;
var jshint = require('jshint/src/cli').run;
var reporter = require('jshint-stylish').reporter;
var path = require('path');
var Fixture = require('fixture-stdout');

var fixtureOut = new Fixture({  stream: process.stdout });

describe('marionette-frontend generator', function () {

    var app;
    var tempDir  = path.join(__dirname, 'temp');

    before(function (done) {

        fixtureOut.capture(function onWrite() {
            // Prevent original write
            return false;
        });

        global.YEOMAN_MUTE = true;

        app = helpers.createGenerator('marionette-frontend:app', ['./plugin', './vendor', './module', './app']);

        var mockPrompts = {
            'applicationName': 'test'
        };

        helpers.mockPrompt(app, mockPrompts);

        app.options['skip-install'] = true;

        var runApp = function (err) {
            if (err) {
                return done(err);
            }
            app.run(done);
        };
        helpers.testDirectory(tempDir, runApp);
    });

    it('creates expected files', function () {
        var expected = [

            // Build

            'build/index.html',
            'build/requirejs.json',
            'build/test-main.js',
            'build/tasks/build.js',
            'build/tasks/test.js',
            'build/tasks/options/connect.js',
            'build/tasks/options/copy.js',
            'build/tasks/options/jshint.js',
            'build/tasks/options/karma.js',
            'build/tasks/options/requirejs.js',
            'build/tasks/options/watch.js',
            'build/config/config.json',
            'build/config/development.json',
            'build/config/production.json',

            // Frontend

            'frontend/bower.json',
            'frontend/app/app.js',
            'frontend/app/autoload/modules.js',
            'frontend/app/autoload/vendors.js',
            'frontend/app/autoload/plugins.js',
            'frontend/app/modules/home/module.js',
            'frontend/app/modules/home/controller.js',
            'frontend/app/modules/home/router.js',
            'frontend/app/modules/home/views/index.js',
            'frontend/app/modules/home/templates/index.hbs',
            'frontend/app/plugins/logger.js',
            'frontend/app/vendors/handlebars.js',

            // Tests

            'test/unit/appSpec.js',

            // Generic

            '.bowerrc',
            '.gitignore',
            '.jshintrc',
            'Gruntfile.js',
            'karma.conf.js',
            'package.json'
        ];
        expected.forEach(function (file) {
            helpers.assertFile(file);
        });
    });

    it('creates valid package.json', function () {
        helpers.assertFile('package.json', /"name": "test"/);
    });

    it('creates a stylish plugin', function () {
        var files = glob.sync('frontend/**/*.js');
        var options = {
            'show-non-errors': true,
            'reporter': reporter,
            'args' : files
        };
        var valid = jshint(options);
        assert.ok(valid);
    });


    describe('subgenerators:module', function () {

        it('should generate a new module and updated the autoloader file', function (done) {

            var appModule = helpers.createGenerator('marionette-frontend:module', ['./../../module']);

            appModule.conflicter.force = true;
            helpers.mockPrompt(appModule, {
                module : 'moduleName',
                force : true
            });
            appModule.run([], function () {

                var expected = [
                    'frontend/app/modules/moduleName/module.js',
                    'frontend/app/modules/moduleName/controller.js',
                    'frontend/app/modules/moduleName/router.js',
                    'frontend/app/modules/moduleName/views/index.js',
                    'frontend/app/modules/moduleName/templates/index.hbs'
                ];
                expected.forEach(function (file) {
                    helpers.assertFile(file);
                });

                helpers.assertFile('frontend/app/autoload/modules.js', /require\(\'modules\/moduleName\/module\'\)\(app\)/);
                done();
            });

        });

    });

    describe('subgenerators:plugin', function () {

        it('should generate a new plugin and updated the autoloader file', function (done) {

            var appModule = helpers.createGenerator('marionette-frontend:plugin', ['./../../plugin']);
            appModule.conflicter.force = true;
            helpers.mockPrompt(appModule, {
                plugin : 'test',
                force : true
            });
            appModule.run([], function () {
                helpers.assertFile('frontend/app/plugins/test.js', /app.test = {}/);
                helpers.assertFile('frontend/app/autoload/plugins.js', /require\(\'plugins\/test\'\)\(app\)/);
                done();
            });

        });

    });

    describe('subgenerators:vendor', function () {

        it('should generate a new vendor and updated the autoloader file', function (done) {

            var appModule = helpers.createGenerator('marionette-frontend:vendor', ['./../../vendor']);
            appModule.conflicter.force = true;
            helpers.mockPrompt(appModule, {
                vendor : 'test',
                force : true
            });
            appModule.run([], function () {
                helpers.assertFile('frontend/app/vendors/test.js', /Setup your 3rd party "test" script here/);
                helpers.assertFile('frontend/app/autoload/vendors.js', /require\(\'vendors\/test\'\)\(app\)/);
                done();
            });

        });

    });


    describe('Gruntfile', function () {

        var getGrunt = function () {
            var grunt = require(path.join(tempDir, 'node_modules/grunt'));
            grunt.option('gruntfile', path.join(tempDir, 'Gruntfile.js'));
            return grunt;
        };

        before(function (done) {
            this.timeout(60000);

            app.installDependencies({
                bower: true,
                npm: true,
                callback: function () {
                    done();
                }
            });
        });


        it('Should be able to run karma continuous tests', function (done) {
            this.timeout(30000);
            getGrunt().tasks(['test:continuous'], {}, done);
        });

        it('Should be able to build the site', function (done) {
            this.timeout(30000);
            getGrunt().tasks(['build'], { target : 'production' }, function (error) {
                helpers.assertFile('build/dist/index.html');
                helpers.assertFile('build/dist/javascript/build.min.js');
                helpers.assertFile('build/dist/javascript/build.min.js.map');
                helpers.assertFile('build/dist/static_files/favicon.ico');
                done(error);
            });
        });

    });

});