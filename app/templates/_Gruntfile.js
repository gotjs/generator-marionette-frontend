'use strict';
process.umask(0);

var nconf = require('nconf');
var path = require('path');

nconf.file('config', path.join(__dirname, 'config', 'config.json'));
nconf.file('environment', path.join(__dirname, 'config', 'environment.json'));

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all    : ['app/**/*.js', '!app/settings.js', '!bower_components'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive : true,
                    middleware: function (connect, options) {
                        return [
                            connect.static(options.base),
                            connect.directory(options.base),
                        ];
                    }
                }
            }
        },
        requirejs: {
            production: {
                options: {
                    out                    : '<%- target %>/static_files/javascript/build.min.js',
                    name                   : '../bower_components/requirejs/require',
                    include                : 'bootstrap',
                    mainConfigFile         : './app/settings.js',
                    preserveLicenseComments: false,
                    generateSourceMaps     : true,
                    optimize               : 'uglify2'
                }
            }
        },
        copy: {
            production: {
                files: [
                    { expand: true, src: ['static_files/**/*'], dest: '<%- target %>/' }, // includes files in path and its subdirs
                ]
            }
        },
        cssmin: {
            styles: {
                expand: true,
                cwd: '<%- target %>/static_files/img',
                src: ['*.css'],
                dest: '<%- target %>/static_files/img'
            },
            fonts: {
                expand: true,
                cwd: '<%- target %>/static_files/fonts',
                src: ['*.css'],
                dest: '<%- target %>/static_files/fonts'
            }
        }
    });

    grunt.registerTask('build', function () {

        var target = grunt.option('target') || 'development';
        var tag = grunt.option('tag') || +new Date();

        grunt.config('target', target);
        grunt.config('tag', tag);

        grunt.task.run(target);

    });

    grunt.registerTask('development', ['buildTemplates']);
    grunt.registerTask('staging', ['copy', 'cssmin', 'requirejs', 'buildTemplates']);
    grunt.registerTask('default', ['build', 'connect']);

    grunt.registerTask('buildTemplates', 'Builds templates site', function () {

        var target = grunt.config('target');
        var indexTemplate = grunt.file.read('templates/index.html.tmpl');

        var data = grunt.util._.merge(
            nconf.get('browser'), {
                target : target,
                version : grunt.config('tag'),
                settings : JSON.stringify(nconf.get('browser'))
            }
        );
        var processedIndex = grunt.template.process(indexTemplate, { data : data});

        grunt.file.write(grunt.config('target') + '/index.html', processedIndex);

    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
};