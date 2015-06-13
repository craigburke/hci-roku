'use strict';

function rokuRemote($rootScope, $state, remoteButtons) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {},
        link: function($scope) {
			var previousState = 'home';
			
			$rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
			    previousState = fromState.name;
			});
			
			$scope.clickButton = function(key) {
				switch(key) {
					case remoteButtons.BACK:
						$state.go(previousState);
					case remoteButtons.HOME:
						$state.go('home');
						break;
					case remoteButtons.NOT_IMPLEMENTED:
						$state.go('notImplented');
						break;
					default:
						$rootScope.$broadcast('remoteButtonPress', key);
						break;
				}
			}
			
			$scope.remoteButtons = remoteButtons;
        },
        templateUrl: 'partials/remote.tpl.html'
    }
}

angular.module('rokuApp.directives', [])
    .directive('rokuRemote', rokuRemote);