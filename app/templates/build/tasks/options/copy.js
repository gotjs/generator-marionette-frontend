module.exports = {
    production: {
        files: [
        {
			expand: true,
			cwd : 'frontend/static_files/',
			src: ['**'], dest: 'build/dist/'
		}, // includes files in path and its subdirs
        ]
    }
};
