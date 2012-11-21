'use strict';

function MainPanelController ($scope, $http, notifyMessageSelectionService) {

	$scope.feeds = [];
	$scope.messageSelected = {};
	$scope.messageDIV = null;

	$http({method: 'GET', url: '/TwitterApi/server/feeds.php'}).
	  success(function(data, status, headers, config) {
	  	$scope.feeds = data;
	  }).
	  error(function(data, status, headers, config) {
	  	
	  });

	$scope.setMessageSelected = function($message) {
		$scope.messageSelected.selected = false;
		$message.selected = true;
		$scope.messageSelected = $message;
		if (!$scope.messageDIV) {
			$scope.messageDIV = document.getElementById('message');
		}
		$scope.messageDIV.scrollIntoView(true);
	}

	$scope.notifyMessageSelection = function($message) {
		$scope.setMessageSelected($message);
		notifyMessageSelectionService.broadcast($message);
	}

}
