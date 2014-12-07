//  compass.js

module.exports = {
	options: {
		sassDir: 'frontend/static_files/styles',
		cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
		imagesDir: 'frontend/static_files/images',
		javascriptsDir: 'frontend/static_files/scripts',
		fontsDir: 'frontend/static_files/styles/fonts',
		importPath: 'frontend/bower_components',
		relativeAssets: true,
        raw: 'Sass::Script::Number.precision = 10\n'
	},
	dist: {},
	server: {
		options: {
			debugInfo: true
		}
	}
}
