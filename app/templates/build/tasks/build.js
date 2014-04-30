module.exports = function (grunt) {
    'use strict';

    var nconf = require('nconf');
    var path = require('path');

    grunt.registerTask('buildTemplates', 'Builds templates site', function () {

        var target = grunt.config('target');
        var indexTemplate = grunt.file.read('build/index.html');

        /**
         * Load in target specific configuration file
         */
        nconf.file('environment', path.join(__dirname, '..', 'config', target + '.json'));
        nconf.file('config', path.join(__dirname, '..', 'config', 'config.json'));

        var data = {
            target : target,
            config : nconf.get()
        };

        var processedIndex = grunt.template.process(indexTemplate, { data : data });

        grunt.file.write('index.html', processedIndex);
        if (target !== 'development') {
            grunt.file.write('build/dist/index.html', processedIndex);

        }

    });

    grunt.registerTask('build', function () {

        var target = grunt.option('target') || 'development';
        grunt.config('target', target);
        grunt.task.run(target);

    });

    grunt.registerTask('development', ['buildTemplates']);
    grunt.registerTask('production', ['copy', 'cssmin', 'requirejs', 'buildTemplates']);


};