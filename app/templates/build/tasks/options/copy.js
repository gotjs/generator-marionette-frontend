module.exports = {
	production: {
		files: [
		{
			expand: true,
			cwd : 'frontend/static_files/',
			src: ['**'], dest: 'build/dist/'
		},
		{
			expand: true,
			cwd: 'frontend/bower_components/bootstrap/dist',
			src: 'fonts/*',
			dest: 'build/dist'
		},
		{
			expand: true,
			cwd: '.tmp/images',
			dest: 'build/dist/images',
			src: ['generated/*']
		},
		{
			expand: true,
			cwd: '.',
			src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
			dest: 'build/dist'
		}
		]
	},
	styles: {
		expand: true,
		cwd: 'frontend/static_files',
		dest: '.tmp/styles/',
		src: [
		  'frontend/static_files/styles/{,*/}*.css',
		  'frontend/bower_components/**/*.css'
		]
	}
};

