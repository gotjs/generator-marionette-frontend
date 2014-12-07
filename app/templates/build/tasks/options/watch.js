// watch.js
//
module.exports = {
	options: {
		livereload : true
	},
	scripts: {
		files: ['build/index.html', 'build/requirejs.json', 'build/config/config.json', 'build/config/development.json',  'build/config/production.json'],
		tasks: ['build'],
		options: {
		    spawn: false
		}
	},
	tests: {
		files: ['build/test-main.js', 'build/requirejs.json'],
		tasks: ['buildTest'],
		options: {
		    spawn: false
		}
	},
	compass: {
		files: ['frontend/static_files/styles/{,*/}*.{scss,sass}'],
		tasks: ['compass']
	},
	bower: {
		files: ['frontend/bower.json'],
		tasks: ['wiredep']
	},
	js: {
		files: ['frontend/static_files/scripts/{,*/}*.js'],
		tasks: ['newer:jshint:all']
	},
	jsTest: {
		files: ['test/unit/{,*/}*.js'],
		tasks: ['newer:jshint:test', 'karma']
	},
	styles: {
		files: ['frontend/app/static_files/styles/{,*/}*.css'],
		tasks: ['newer:copy:styles']
	},
	gruntfile: {
		files: ['Gruntfile.js']
	},
	livereload: {
		options: {
			livereload: true
		},
		files: [
		  'frontend/app/{,*/}*.html',
		  'frontend/static_files/index.html',
		  '.tmp/styles/{,*/}*.css',
		  'frontend/static_files/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
		]
	}
};
