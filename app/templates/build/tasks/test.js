module.exports = function (grunt) {
	'use strict';

	var buildRequirejsConfig = function () {
		var requirejsTemplate = grunt.file.read('build/requirejs.json');
		return grunt.template.process(requirejsTemplate, { data : { path : '../' }});
	};

	grunt.registerTask('buildTest', function () {
		var testMainTemplate = grunt.file.read('build/test-main.js');

		var data = { requirejs : buildRequirejsConfig() };
		var processedIndex = grunt.template.process(testMainTemplate, { data : data });
		//json uses double quotes, and we are using single quotes for all js
		processedIndex = processedIndex.replace(/\"/gi, "'")
		grunt.file.write('test/unit/test-main.js', processedIndex);
	});
};

