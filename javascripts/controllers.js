function MainController() {
    var self = this;
}

function HomeController($scope, remoteButtons, ChannelService) {
    var self = this;
	self.channels = ChannelService.getChannels();

	var currentRow = 0;
	var currentChannel = 0;
	var channelsInCurrentRow = function() {
		return self.channels[currentRow].length;
	}

	self.isChannelSelected = function(channel) {
		return (channel == ChannelService.getSelectedChannel())
	}

	$scope.$on('remoteButtonPress', function(event, key) {
		switch(key) {
			case remoteButtons.RIGHT:
				ChannelService.moveRight();
				break;
			case remoteButtons.LEFT:
				ChannelService.moveLeft();
				break;
			case remoteButtons.UP: 
				ChannelService.moveUp();
				break;
			case remoteButtons.DOWN:
				ChannelService.moveDown();
				break;
		}		
	});
}

function PopupController($modalInstance) {
	var self = this;
	self.close = function() {
		$modalInstance.close();
	}
}

angular.module('rokuApp.controllers', [])
	.controller('MainController', MainController)
	.controller('HomeController', HomeController)
	.controller('PopupController', PopupController);