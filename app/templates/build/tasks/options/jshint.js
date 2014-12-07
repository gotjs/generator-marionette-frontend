module.exports = {
    all    : [
		'Gruntfile.js',
		'frontend/app/**/*.js'
	],
    options: {
        jshintrc : '.jshintrc',
		reporter: require('jshint-stylish')
    },
	test: {
		src: ['test/unit/{,*/}*.js']
	}
};
