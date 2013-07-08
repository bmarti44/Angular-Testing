/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global $: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

angular.module('gameflash').controller('PlayerListControl', ['$rootScope', '$scope', '$http', '$timeout', 'GetData', function ($rootScope, $scope, $http, $timeout, GetData) {
	'use strict';
	
	(function tick() {
		GetData.query().then(function(data) {
			var result = {
				'playbyplay': data[0].data.playbyplay,
				'boxscore': data[1].data.boxscore
			};
			
			if ($rootScope.gameData !== JSON.stringify(angular.toJson(result))) {
				$rootScope.$emit('gameflashData', result);
				$rootScope.gameData = JSON.stringify(angular.toJson(result));
			}
			
			$timeout(tick, 5000);
		});
		
    }());
	
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
