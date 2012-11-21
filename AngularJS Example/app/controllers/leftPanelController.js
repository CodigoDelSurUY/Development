'use strict';

function LeftPanelController ($scope, $http, notifyMessageSelectionService) {

	$scope.messages = [];
	$scope.working = false;
	$scope.numberOfItems = 20;

	$scope.$on('notifyMessageSelection', function($message) {
		
	});

	$scope.showAlert = function($feed) {
		alert($feed.id);
	}

	$scope.getMessages = function($feed) {
		var feedsArray, url, index;

		feedsArray = [];

		for (index in $scope.feeds) {
			if ($scope.feeds[index].checked) {
				feedsArray.push($scope.feeds[index].id);
			}
		}

		var url = '/TwitterApi/server/mentions.php?feeds=' + JSON.stringify(feedsArray) + '&entities=false&quantity=' + $scope.numberOfItems;

		$scope.working = true;
		$http({method: 'GET', url: url}).
		  success(function(data, status, headers, config) {
		  	$scope.working = false;
		  	$scope.messages = data;
		  }).
		  error(function(data, status, headers, config) {
		  	$scope.working = false;
		  });
	}

	$scope.scrollCallback = function($event) {
		var element;

		element = $event.target;
		if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
			$scope.scrolledToBottom($event);
		}
	}

	$scope.scrolledToBottom = function() {
		console.log("scrolled to bottom");
		$scope.getNextPage();
	}

	$scope.getNextPage = function() {
		var newMessages;

		newMessages = [
			{
				message: 'Message 11',
				senderscreenname: '@Juancho',
				mstatus: 'New'
			},
			{
				message: 'Message 12',
				senderscreenname: '@Juancho',
				mstatus: 'New'
			},
			{
				message: 'Message 13',
				senderscreenname: '@Juancho',
				mstatus: 'New'
			},
			{
				message: 'Message 14',
				senderscreenname: '@Juancho',
				mstatus: 'New'
			},
			{
				message: 'Message 15',
				senderscreenname: '@Juancho',
				mstatus: 'New'
			},
			{
				message: 'Message 16',
				senderscreenname: '@Juancho',
				mstatus: 'New'
			}
		]
		$scope.messages = $scope.messages.concat(newMessages);
	}

	$scope.pollForMessagesUpdates = function() {
		setTimeout(function() {
		    $.ajax({
		    	url: '/TwitterApi/server/updateMessagesStatus.php',
		    	success: function(data) {
		        	console.log("success polling: " + data);

				},
				error: function(data) {
		        	console.log("error");
				},
				complete: function(data) {
					$scope.pollForMessagesUpdates()
				},
				timeout: 5000
			});
		}, 5000);
	}
	
	$scope.pollForMessagesUpdates();

}
