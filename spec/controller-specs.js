/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global module: false, it: false, inject: false, expect: false, spyOn: false, beforeEach: false, $: false, describe: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

describe('Player List Controller', function() {
	'use strict';
	var $scope = null,
		controller = null,
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

	/* IMPORTANT!
	* this is where we're setting up the $scope and
	* calling the controller function on it, injecting
	* all the important bits, like our mockService */
	beforeEach(inject(function($rootScope, $controller) {
		//create a scope object for us to use.
		$scope = $rootScope.$new();

		//now run that scope through the controller function,
		//injecting any services or other injectables we need.
		controller = $controller('PlayerListControl', {
			$scope: $scope,
			someService: mockService
		});
		
	}));

	/* Test 1: The simplest of the simple.
	* here we're going to test that some things were 
	* populated when the controller function whas evaluated. */
	it ('should start with foo and bar populated', function($scope) {
    
		//just assert. $scope was set up in beforeEach() (above)
		expect($scope.foo).toEqual('foo');
		
	});
  
  
	/* Test 2: Still simple.
	* Now let's test a simple function call. */
	it('should add !!! to foo when test1() is called', function () {
		//set up.
		$scope.foo = 'x';
    
		//make the call.
		$scope.test1();
    
		//assert
		expect($scope.foo).toEqual('x!!!');
	});
  
  
	/* Test 3: Testing a $watch()
	* The important thing here is to call $apply() 
	* and THEN test the value it's supposed to update. */
	it('should update baz when bar is changed', function (){
		//change bar
		$scope.bar = 'test';
    
		//$apply the change to trigger the $watch.
		$scope.$apply();
    
		//assert
		expect($scope.baz).toEqual('testbaz');
	});
  
  
	/* Test 4a: Testing an asynchronous service call.
	* Here we don't really even need to worry about asynchronicity.
	* Since we make a mockService (above) and injected it,
	* We can take out the asynchronous stuff and just test that it's 
	* returning a value.  We can test the service's asynchronous behavior
	* when we test the service, it's not the controller's concern. */
	it('should update fizz asynchronously when test2() is called', function (){
		//just make the call
		$scope.test2();
    
		//assert
		expect($scope.fizz).toEqual('weee');    
	});
  
	/* Test 4b: Probably should test that the service method was
	* called as well. We'll use Jasmine's spyOn() method to do
	* this. */
	it('should make a call to someService.someAsyncCall() in test()', function (){
		//set up the spy.
		spyOn(mockService, 'someAsyncCall').andCallThrough();
    
		//make the call!
		$scope.test2();
    
		//assert!
		expect(mockService.someAsyncCall).toHaveBeenCalled();    
	});
});