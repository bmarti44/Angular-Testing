/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global module: false, it: false, inject: false, expect: false, spyOn: false, beforeEach: false, $: false, describe: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

describe('gameflash', function() {
	'use strict';
	var createController,
		$rootScope,
		$httpBackend,
		$controller,
		$scope,
		mockService;
  
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
	beforeEach(module('gameflash'));
	
	describe('PlayerListControl', function() {
		var scope, ctrl, $httpBackend;
		
		beforeEach(inject(function($httpBackend, $rootScope, $controller) {
			$httpBackend.expectJSONP('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_playbyplaytvl.json?callback=JSON_CALLBACK').
				respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

			scope = $rootScope;
			ctrl = $controller('PlayerListControl', {$scope: scope});
		}));
		
		it('checking foo property', inject(function($scope, $rootScope, $controller) {
			expect($scope.foo).toEqual('fasdfasdfasdfasdfoo');
		}));
		
	});
  
});