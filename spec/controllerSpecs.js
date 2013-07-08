/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global afterEach: false, module: false, it: false, inject: false, expect: false, spyOn: false, beforeEach: false, $: false, describe: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

describe('gameflash', function() {
	'use strict';
	
	/**
	 * AppControl Unit Test
	 * This test will hold all other controller unit tests
	 */
	describe('AppControl', function() {
		var scope, ctrl, $httpBackend, createController;
		
		beforeEach(module('gameflash'));
		
		beforeEach(inject(function($injector, $rootScope) {
			var controller;
			
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenJSONP('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_playbyplaytvl.json?callback=JSON_CALLBACK').respond({'test': 'test'});
			$httpBackend.whenJSONP('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_boxscore.json?callback=JSON_CALLBACK').respond({'test': 'test'});
			scope = $rootScope;
			controller = $injector.get('$controller');
 
			createController = function() {
				return controller('AppControl', {
					'$scope' : scope
				});
			};
		}));
		
		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});
		
		it('checking foo property', function() {
			var controller;
			
			$httpBackend.expectJSONP('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_playbyplaytvl.json?callback=JSON_CALLBACK').respond(201, '');
			$httpBackend.expectJSONP('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_boxscore.json?callback=JSON_CALLBACK').respond(201, '');
			
			controller = createController();
			
			expect(scope.foo).toEqual('foo');
			
			$httpBackend.flush();
		});
		
		/**
		 * PlayerListControl Unit Test
		 * This will be a simple example unit test for the Player List Controller
		 * Add additional controller unit tests below this unit test
		 */
		describe('PlayerListControl', function() {
			var scope, appController, playerListController;
			
			beforeEach(inject(function($httpBackend, $controller, $rootScope) {
				// setup the root scope for all controllers
				scope = $rootScope;
				// modify the root scope to include everything added to AppControl
				appController = $controller('AppControl', {
					'$scope' : scope 
				});
				// flush out the $http requests
				$httpBackend.flush();
				// take the inherited AppControl scope and apply it to PlayerListControl's scope
				playerListController = $controller('PlayerListControl', {
					'$scope' : scope 
				});
				
			}));
			
			it('checking foo property', function() {
				// foo from the AppControl
				expect(scope.foo).toEqual('foo');
				// bar from the PlayerListControl
				expect(scope.bar).toEqual('bar');
			});
		
		});
	});
  
});