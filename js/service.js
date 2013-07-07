/*jslint devel: false, browser: true, maxerr: 50, indent: 4*/
/*global $: false, angular: false, jQuery: false, console: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

angular.module('gameflashRequest', ['ngResource']).factory('GetData', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
	'use strict';
	
	return {
		'query': function() { 
			return $q.all([
				$http.jsonp('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_playbyplaytvl.json?callback=JSON_CALLBACK'),
				$http.jsonp('http://data.sportsillustrated.cnn.com/jsonp/baseball/mlb/gameflash/2013/07/06/48732_boxscore.json?callback=JSON_CALLBACK')
			]);
		}
	};
}]);
