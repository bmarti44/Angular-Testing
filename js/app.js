/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global $: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

angular.module('gameflash', ['gameflashRequest']).run(['$rootScope', '$timeout', '$q', 'GetData', function($rootScope, $timeout, $q, GetData) {
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
    
}]);
