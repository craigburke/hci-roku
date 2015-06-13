function MainController($scope, remoteButtons) {
    var self = this;

	$scope.$on('remoteButtonPress', function(event, key) {
		console.log("FROM CONTROLLER:" + key);
	});
}

angular.module('rokuApp.controllers', [])
	.controller('MainController', MainController);