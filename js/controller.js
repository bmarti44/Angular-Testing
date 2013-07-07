/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global $: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

angular.module('gameflash').controller('PlayerListControl', ['$rootScope', '$scope', '$http', '$timeout', function ($rootScope, $scope, $http, $timeout) {
	'use strict';
	
	
	$rootScope.$on('gameflashData', function(event, data) {
		console.log(data);
		$scope.data = data;
	});
	
	$scope.doStuff = function(play, event) {
		console.log(play);
		console.log(event);
		play.description = 'non';
	};
	
	$scope.foo = 'foo';
}]);
