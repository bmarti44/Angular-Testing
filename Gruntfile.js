/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global grunt: false, $: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

module.exports = function (grunt) {
	'use strict';
	
	grunt.initConfig({
		pkg: '<json:package.json>',
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
					'js/AppInit.js',
					'js/*.js'
				],
				dest: 'pkg/app.concat.js'
			},
			assets: {
				src: [
					'bower_components/jquery/jquery.min.js',
					'bower_components/jquery/jquery-migrate.min.js',
					'bower_components/angular/angular.min.js',
					'bower_components/angular-resource/angular-resource.min.js',
					'bower_components/**/*.min.js'
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
			gameflash: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					removeEmptyAttributes: true
				},
				files: {
					'index.html': 'html/index.html'
				}
			}
		},
		requirejs: {
			dev: {
				options: {
					findNestedDependencies: true,
					baseUrl: 'js',
					name: 'gameflash',
					mainConfigFile: 'js/config.js',
					optimize: 'uglify2',
					generateSourceMaps: true,
					out: "pkg/app.min.js"
				}
			},
			prod: {
				options: {
					findNestedDependencies: true,
					baseUrl: 'js',
					name: 'gameflash',
					mainConfigFile: 'js/config.js',
					out: "pkg/app.min.js"
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
				files: ['js/AppInit.js', 'js/*.js'],
				tasks: ['jshint', 'jasmine', 'concat:scripts', 'concat:assets', 'min', 'clean'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['css/*.css'],
				tasks: ['concat', 'cssmin', 'clean'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['html/*.html'],
				tasks: ['htmlmin'],
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
					'bower_components/jquery/jquery.min.js',
					'bower_components/jquery/jquery-migrate.min.js',
					'bower_components/angular/angular.min.js',
					'bower_components/angular-resource/angular-resource.min.js',
					'bower_components/angular-mocks/angular-mocks.js',
					'bower_components/**/*.min.js',
					'pkg/app.min.js'
				],
				options: {
					specs: 'spec/*Specs.js',
					helpers: 'spec/*Helpers.js'
				}
			}
		}
	});

	// Grunt tasks that this project depends on
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-yui-compressor');		// provides 'min' and 'cssmin' tasks
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');		// used for checking code quality (similar to JSLint)

	// default task -> run 'grunt' -> lints script files, minifies HTML shell, replaces shell var in script, minifies JS and CSS assets for deployment
	grunt.registerTask('default', ['jshint', 'htmlmin', 'concat', 'min', 'cssmin', 'clean', 'jasmine']);
};