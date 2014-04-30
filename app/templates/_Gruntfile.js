module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash');

    function loadConfig(path) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(path + option);
        });

        return object;
    }

    var config = _.extend({}, {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env
    }, loadConfig('./build/tasks/options/'));

    grunt.initConfig(config);
    grunt.loadTasks('build/tasks');
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', [ 'jshint', 'build', 'connect']);
};