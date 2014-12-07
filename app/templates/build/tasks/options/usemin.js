  // Performs rewrites based on filerev and the useminPrepare configuration
module.exports = {
  html: ['build/dist/{,*/}*.html'],
  css: ['build/dist/styles/{,*/}*.css'],
  options: {
	assetsDirs: ['build/dist','build/dist/images']
  }
}

