'use strict';

var AchieveServiceSocialMedia = angular.module('AchieveServiceSocialMedia', ['ui'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('', {
            templateUrl: 'views/mainPanelView.html'
            // controller: MainPanelController
        })
        // .otherwise({
        //     redirectTo: ''
        // });
}]);

AchieveServiceSocialMedia.factory('notifyMessageSelectionService', function($rootScope) {
    var notifyMessageSelection;

    notifyMessageSelection = {

        broadcast: function() {
            $rootScope.$broadcast('notifyMessageSelection');    
        }

    }

    return notifyMessageSelection;
})
