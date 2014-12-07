// htmlmin.js
//

module.exports = {
	dist: {
		options: {
		  collapseWhitespace: true,
		  conservativeCollapse: true,
		  collapseBooleanAttributes: true,
		  removeCommentsFromCDATA: true,
		  removeOptionalTags: true
		},
		files: [{
		  expand: true,
		  cwd: 'build/dist',
		  src: ['*.html', 'views/{,*/}*.html'],
		  dest: 'build/dist'
		}]
	}
}


