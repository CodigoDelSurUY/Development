'use strict';

function RightPanelController ($scope, $http, notifyMessageSelectionService) {

	$scope.replying        = false;
	$scope.mask            = false;
	$scope.replyMessage    = "";
	$scope.maxCharsInTweet = 140;
	$scope.showError       = false;
	$scope.faqs            = [
		{
			text: 'Street Scene - Litter Report',
			message: 'Please fill out our online form at: ',
			link: 'http://tinyurl.com/u7wern'
		},
		{
			text: 'Waste - Missed bins Waste - Missed bins Waste - Missed bins Waste - Missed bins Waste - Missed bins Waste - Missed bins Waste - Missed bins',
			message: 'Please fill out our online form at: ',
			link: 'http://tinyurl.com/u7aasdf'
		}
	]

	$scope.$on('notifyMessageSelection', function($message) {
		$scope.cancelReply();
	});

	$scope.reply = function() {
		$scope.replying = !$scope.replying;
		$scope.showMask();
	}

	$scope.sendReply = function() {
		var toUserId, fromUserId;

		if ($scope.replyMessage.length > $scope.maxCharsInTweet) {
			alert("Message is too long");
		} else {
			// Send message to server. The server will be the one which communicates with Twitter.
			alert("Sending message to server");
			$scope.replyMessage = "";
			$scope.hideReplyBox();
		}
	}

	$scope.cancelReply = function() {
		$scope.replyMessage = "";
		$scope.hideReplyBox();
	}

	$scope.deleteMessage = function() {
		alert("delete message");
	}

	$scope.hideReplyBox = function() {
		$scope.replying = false;
		$scope.hideMask();
	}

	$scope.sendLinkAsResponse = function($faq) {
		$scope.replyMessage = $faq.message + " " + $faq.link;
		$scope.reply();
	}

	$scope.checkNumberOfChars = function() {
		if ($scope.replyMessage.length > $scope.maxCharsInTweet) {
			$scope.showError = true;
		} else {
			$scope.showError = false;
		}
	}

	$scope.markHandled = function() {
		alert('Marked as handled');
	}

	$scope.showMask = function() {
		$scope.mask = true;
	}

	$scope.hideMask = function() {
		$scope.mask = false;	
	}

}
