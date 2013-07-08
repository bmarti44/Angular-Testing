/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global afterEach: false, module: false, it: false, inject: false, expect: false, spyOn: false, beforeEach: false, $: false, describe: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

describe('gameflash', function() {
	'use strict';
	var mockService;
  
	/* A mocked version of our service, someService
	* we're mocking this so we have total control and we're
	* testing this in isolation from any calls it might
	* be making.
	*/
	mockService = {
		someAsyncCall: function (x) {
			return 'weee';
		}
	};
  
	//you need to indicate your module in a test
	
	
	describe('PlayerListControl', function() {
		var scope, ctrl, $httpBackend, createController, $controller;
		
		beforeEach(module('gameflash'));
		
		beforeEach(inject(function($injector, $rootScope, $controller) {
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenJSONP('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_playbyplaytvl.json?callback=JSON_CALLBACK').respond({'test': 'test'});
			$httpBackend.whenJSONP('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_boxscore.json?callback=JSON_CALLBACK').respond({'test': 'test'});
			scope = $rootScope;
			$controller = $injector.get('$controller');
 
			createController = function() {
				return $controller('PlayerListControl', {
					'$scope' : $rootScope 
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
		
	});
  
});