/**
 *	SI.com Network Bar - Gruntfile.js
 *	Author: mstills
 *		Provides build instructions for Grunt - http://gruntjs.com
 */
module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			// these are the files to lint
			all: [
				'js/*.js',
				'spec/*.js'
			],
			// these are the JSHint options (more info here http://www.jshint.com/docs/)
			options: {
				passfail: false,	// 'false' means JSHint will not fail after the first error
				maxerr: 100,		// max errors allowed before JSHint will stop scanning
				predef: [],			// predefine extra globals here
				browser: true,		// defines global browser objects since this code is intended to run in browser
				devel: true,		// allows 'console.log' usage, set to false for PROD
				asi: false,			// 'false' enforces semi-colon usage
				curly: true,		// all blocks must use curly braces
				eqeqeq: true,		// require strict comparisons ('===' and '!==')
				eqnull: true,		// suppress '=== null' warnings as this is sometimes useful
				evil: false,		// don't allow eval()
				immed: true,		// immediately invoked functions ((function () {})()) must be wrapped in parens
				latedef: false,		// don't allow variable usage before definition (strict mode doesn't allow this)
				noempty: true,		// no empty code blocks
				onevar: true,		// require single 'var' keyword usage per function
				trailing: false,	// if false, do not allow trailing white space on lines
				laxbreak: true,		// relaxes line breaking on string concatenation (minification will take care of this for PROD)
				smarttabs: true,	// allows mixed spaces+tabs in certain situations (eg. for formatting alignment on complex string concats)
				indent: 4			// set indentation (by tab) width at 4 spaces
			}
		},
		concat: {
			scripts: {
				src: [
					'js/*.js'
				],
				dest: 'pkg/app.concat.js'
			},
			assets: {
				src: [
					'components/jquery/jquery.min.js',
					'components/jquery/jquery-migrate.min.js',
					'components/angular/angular.min.js',
					'components/angular-resource/angular-resource.min.js',
					'components/**/*.min.js'
				],
				dest: 'pkg/assets.js'
			},
			styles: {
				src: [
					'css/app.css',
					'css/*.css'
				],
				dest: 'pkg/app.concat.css'
			}
		},
		htmlmin: {
			prod: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'index.min.html': 'index.html'
				}
			}
		},
		min: {
			js: {
				src: 'pkg/app.concat.js',
				dest: 'pkg/app.min.js',
				nomunge: true
			}
		},
		cssmin: {
			css: {
				src: 'pkg/app.concat.css',
				dest: 'pkg/app.min.css'
			}
		},
		watch: {
			javascript: {
				files: ['!components/**/*.js', '!node_modules/**/*.js', 'js/*.js', 'css/*.css', '*.html', '!index.min.html'],
				tasks: ['jshint', 'htmlmin', 'concat', 'min', 'cssmin', 'clean'],
				options: {
					livereload: true
				}
			}
		},
		clean: [
			'pkg/app.concat.css', 
			'pkg/app.concat.js'
		],
		jasmine: {
			gameflash: {
				src: [
					'components/jquery/jquery.min.js',
					'components/jquery/jquery-migrate.min.js',
					'components/angular/angular.min.js',
					'components/angular-resource/angular-resource.min.js',
					'components/**/*.min.js',
					'js/*.js'
				],
				options: {
					specs: 'spec/*specs.js',
					helpers: 'spec/*helpers.js'
				}
			}
		}
	});

	// Grunt tasks that this project depends on
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-yui-compressor');		// provides 'min' and 'cssmin' tasks
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');		// used for checking code quality (similar to JSLint)

	// default task -> run 'grunt' -> lints script files, minifies HTML shell, replaces shell var in script, minifies JS and CSS assets for deployment
	grunt.registerTask('default', ['jshint', 'jasmine', 'htmlmin', 'concat', 'min', 'cssmin', 'clean']);
};