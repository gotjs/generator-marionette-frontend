// wiredep.js
//
// Automatically inject Bower components into the app

module.exports = {
	app: {
		src: ['build/index.html'],
		cwd: 'frontend',
		exclude: [ /jquery/, 'bower_components/modernizer/modernizr.js' ],
		ignorePath: '\.\./frontend/',
		sass: {
			src: ['frontend/static_files/styles/{,*/}*.{scss,sass}'],
			ignorePath: /(\.\.\/){1,2}frontend\/bower_components\//
		}
	}
}


