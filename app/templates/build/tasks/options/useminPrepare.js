// useminPrepare.js
//
// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them

module.exports = {
  html: 'build/dist/index.html',
  options: {
    dest: 'build/dist',
    flow: {
      html: {
        steps: {
          css: ['cssmin']
        },
        post: {}
      }
    }
  }
}

