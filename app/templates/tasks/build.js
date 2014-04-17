module.exports = function(grunt) {
    'use strict';

    var _ = require('lodash');
    var nconf = require('nconf');
    var path = require('path');

    grunt.registerTask('buildTemplates', 'Builds templates site', function () {

        var target = grunt.config('target');
        var indexTemplate = grunt.file.read('templates/index.html.tmpl');

        /**
         * Load in target specific configuration file
         */
        nconf.file('environment', path.join(__dirname, '..', 'config',  target + '.json'));
        nconf.file(path.join(__dirname, '..', 'config', 'config.json'));

        var data = _.merge({},
            nconf.get('browser'), {
                target : target,
                settings : JSON.stringify(nconf.get('browser'))
            }
        );
        var processedIndex = grunt.template.process(indexTemplate, { data : data });
        grunt.file.write(grunt.config('target') + '/index.html', processedIndex);

    });

    grunt.registerTask('build', function () {

        var target = grunt.option('target') || 'development';
        grunt.config('target', target);
        grunt.task.run(target);

    });

    grunt.registerTask('development', ['buildTemplates']);
    grunt.registerTask('production', ['copy', 'cssmin', 'requirejs', 'buildTemplates']);


};