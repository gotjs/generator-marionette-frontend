module.exports = function(grunt) {
    'use strict';

    var _ = require('lodash');
    var nconf = require('nconf');
    var path = require('path');

    var DEVELOPMENT = 'development';


    grunt.registerTask('buildTemplates', 'Builds templates site', function () {

        var target = grunt.config('target');
        var indexTemplate = grunt.file.read('templates/index.html.tmpl');

        /**
         * Load in target specific configuration file
         */
        if(target != DEVELOPMENT) {
            console.log('why we loding this?');
            nconf.file(target, path.join(__dirname, '..', 'config', target + '.json') );
        }
        nconf.file('environment', path.join(__dirname, '..', 'config', 'environment.json') );
        nconf.file(path.join(__dirname, '..', 'config', 'config.json'));

        var data = _.merge({},
            nconf.get('browser'), {
                target : target,
                version : grunt.config('tag'),
                settings : JSON.stringify(nconf.get('browser'))
            }
        );
        var processedIndex = grunt.template.process(indexTemplate, { data : data });
        grunt.file.write(grunt.config('target') + '/index.html', processedIndex);

    });

    grunt.registerTask('build', function () {

        var target = grunt.option('target') || DEVELOPMENT;
        var tag = grunt.option('tag') || +new Date();

        grunt.config('target', target);
        grunt.config('tag', tag);

        grunt.task.run(target);

    });

    grunt.registerTask('development', ['buildTemplates']);
    grunt.registerTask('staging', ['copy', 'cssmin', 'requirejs', 'buildTemplates']);


};