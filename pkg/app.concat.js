/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global $: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

angular.module('gameflash', ['gameflashRequest']).run(function($rootScope, $timeout, $q, GetData) {
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
    
});

/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global $: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

angular.module('gameflashRequest', ['ngResource']).factory('GetData', function ($rootScope, $http, $q) {
	'use strict';
	
	return {
		'query': function() { 
			return $q.all([
				$http.jsonp('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_playbyplaytvl.json?callback=JSON_CALLBACK'),
				$http.jsonp('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_boxscore.json?callback=JSON_CALLBACK')
			]);
		}
	};
});

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
	
}]);
