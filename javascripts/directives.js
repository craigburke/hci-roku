'use strict';

function rokuRemote($rootScope, $state, $modal, remoteButtons) {
    return {
        restrict: 'EA',
        replace: true,
        link: function($scope) {
			$scope.clickButton = function(key) {
				switch(key) {
					case remoteButtons.HOME:
						$state.go('home');
						break;
					case remoteButtons.NOT_IMPLEMENTED:
						$modal.open({
							templateUrl: 'partials/not-implemented.tpl.html'
						});
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

function rokuKeyboard(KeyboardService) {
	return {
		restrict: 'EA',
        replace: true,
		link: function($scope) {
			$scope.keyboardRows = KeyboardService.getKeyboardRows();
			$scope.selectedKey = KeyboardService.getSelectedKey();
			
			$scope.$on('remoteButtonPress', function() {
				$scope.selectedKey = KeyboardService.getSelectedKey();
			});
		
		},
        templateUrl: 'partials/keyboard.tpl.html'
	}
}

function alertMessage($timeout) {
    return {
        restrict: 'EA',
        replace: true,
        link: function($scope) {
			
			$scope.$on('message',  function(event, message) {
				$scope.message = message;
				$timeout(function() {
					$scope.message = '';
				}, 4000);
			});
			
        },
        templateUrl: 'partials/alert-message.tpl.html'
    }
}


angular.module('rokuApp.directives', [])
    .directive('rokuRemote', rokuRemote)
	.directive('rokuKeyboard', rokuKeyboard)
	.directive('alertMessage', alertMessage);