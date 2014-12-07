// connect.js

module.exports = {
	server: {
		options: {
			port: 9001,
			livereload: 35729,
			middleware: function (connect) {
				'use strict';

				var modRewrite = require('connect-modrewrite');
				var dir = 'frontend';

				var target = require('grunt').config('target');
				if (target !== 'development') {
				    dir = 'build/dist';
				}

				return [
					modRewrite([ '^[^\\.]*$ /index.html [L]' ]),
					connect.static(dir),
					connect.directory(dir),
					connect.static('.tmp'),
					connect().use(
					  '/bower_components',
					  connect.static('./bower_components')
					)
				];
			}
		},
		livereload: {
			options: {
				open: true,
				middleware: function (connect) {
				  return [
				    connect.static('.tmp'),
				    connect().use(
				      '/bower_components',
				      connect.static('./bower_components')
				    ),
				    connect.static('frontend/app')
				  ];
				}
			}
		},
		test: {
			options: {
			  port: 9001,
			  middleware: function (connect) {
			    return [
			      connect.static('.tmp'),
			      connect.static('test'),
			      connect().use(
			        '/bower_components',
			        connect.static('./bower_components')
			      ),
			      connect.static('frontend/app')
			    ];
			  }
			}
		}
	}
}

