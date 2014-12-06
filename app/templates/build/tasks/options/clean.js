 // Empties folders to start fresh
module.exports = {
	production: {
	  files: [{
	    dot: true,
	    src: [
	      '.tmp',
	      'build/dist/{,*/}*',
	      'build/dist/.git{,*/}*'
	    ]
	  }]
	}
}
