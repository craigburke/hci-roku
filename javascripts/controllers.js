function MainController() {
    var self = this;
}

function HomeController($scope, $state, $modal, remoteButtons, ChannelService) {
	var self = this;
	self.channels = ChannelService.getChannels();

	var pageState = {
		CHANNEL_SELECTED:'channelSelected',
		BUTTON_SELECTED:'buttonSelected',
		MOVE_SELECTED:'moveSelected',
		MOVING:'moving',
		DELETE_SELECTED:'deleteSelected',
		DELETE_CONFIRM_OK:'deleteConfirmOk',
		DELETE_CONFIRM_CANCEL:'deleteConfirmCancel'
	};
	self.pageState = pageState;
	self.state = pageState.CHANNEL_SELECTED;
	ChannelService.selectFirstRow();

	self.isChannelSelected = function(channel) {
		return (channel == ChannelService.getSelectedChannel())
	}

	var reloadChannels = function() {
		self.channels = ChannelService.getChannels();
	}

	var setState = function(state) {
		self.state = state;
	}

	var toggleActionButtons = function() {
		if (self.state === pageState.MOVE_SELECTED) {
			setState(pageState.DELETE_SELECTED);
		}
		else {
			setState(pageState.MOVE_SELECTED);
		}
	}

	var inEditMode = function() {
		return (self.state === pageState.MOVE_SELECTED || self.state === pageState.DELETE_SELECTED);
	}

	self.showActionButtons = function() {
		return inEditMode();
	}

	var inDeleteConfirmMode = function() {
		return (self.state === pageState.DELETE_CONFIRM_OK || self.state === pageState.DELETE_CONFIRM_CANCEL);
	}

	$scope.$on('remoteButtonPress', function(event, key) {
		switch(key) {
			case remoteButtons.RIGHT:
				if (self.state === pageState.CHANNEL_SELECTED) {
					ChannelService.selectRight();
				}
				else if (self.state === pageState.MOVING) {
					ChannelService.moveRight();
					reloadChannels();
				}
				else if (inEditMode())  {
					toggleActionButtons();
				}

				break;

			case remoteButtons.LEFT:
				if (self.state === pageState.CHANNEL_SELECTED) {
					ChannelService.selectLeft();
				}
				else if (self.state === pageState.MOVING) {
					ChannelService.moveLeft();
					reloadChannels();
				}				
				else if (inEditMode())  {
					toggleActionButtons();
				}
				break;

			case remoteButtons.UP:
				if (self.state === pageState.CHANNEL_SELECTED) {
					if (ChannelService.onFirstRow()) {
						ChannelService.selectNone();
						setState(pageState.BUTTON_SELECTED); 
					}
					else {
						ChannelService.selectUp();
					}				
				}
				else if (self.state === pageState.MOVING) {
					ChannelService.moveUp();
					reloadChannels();
				}
				else if (self.state === pageState.BUTTON_SELECTED) {
					setState(pageState.CHANNEL_SELECTED);
					ChannelService.selectLastRow()
				}
			
				break;

			case remoteButtons.DOWN:
				if (self.state === pageState.CHANNEL_SELECTED) {
					if (ChannelService.onLastRow()) {
						setState(pageState.BUTTON_SELECTED); 
						ChannelService.selectNone();
					}
					else {
						ChannelService.selectDown();
					}				
				}
				else if (self.state === pageState.MOVING) {
					ChannelService.moveDown();
					reloadChannels();
				}
				else if (self.state === pageState.BUTTON_SELECTED) {
					setState(pageState.CHANNEL_SELECTED);
					ChannelService.selectFirstRow()
				}


				break;

			case remoteButtons.STAR:
				if (self.state === pageState.CHANNEL_SELECTED) {
					setState(pageState.MOVE_SELECTED);			
				}
				else {
					setState(pageState.CHANNEL_SELECTED);
				}
				break;

			case remoteButtons.OK:
				if (self.state === pageState.BUTTON_SELECTED) {
					$state.go('store');
				}
				else if (self.state === pageState.MOVING) {
					setState(pageState.CHANNEL_SELECTED);
				}
				else if (self.state === pageState.MOVE_SELECTED) {
					setState(pageState.MOVING);
				}
				else if (self.state === pageState.DELETE_SELECTED) {
					var deleteConfirmation = $modal.open({
						templateUrl:'partials/delete-confirmation.tpl.html'
					});	
					deleteConfirmation.result.then(function() {
						ChannelService.deleteSelectedChannel();
						setState(pageState.CHANNEL_SELECTED);
						reloadChannels();
					});
				}

				break;

		}		
	});
}

angular.module('rokuApp.controllers', [])
	.controller('MainController', MainController)
	.controller('HomeController', HomeController);
