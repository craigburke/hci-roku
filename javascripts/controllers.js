function MainController() {
    var self = this;
}

function HomeController($scope, $state, $modal, remoteButtons, HomeService) {
	var self = this;
	self.channels = HomeService.getChannels();

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
	HomeService.selectFirstRow();

	self.isChannelSelected = function(channel) {
		return (channel == HomeService.getSelectedChannel())
	}

	var reloadChannels = function() {
		self.channels = HomeService.getChannels();
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
					HomeService.selectRight();
				}
				else if (self.state === pageState.MOVING) {
					HomeService.moveRight();
					reloadChannels();
				}
				else if (inEditMode())  {
					toggleActionButtons();
				}

				break;

			case remoteButtons.LEFT:
				if (self.state === pageState.CHANNEL_SELECTED) {
					HomeService.selectLeft();
				}
				else if (self.state === pageState.MOVING) {
					HomeService.moveLeft();
					reloadChannels();
				}				
				else if (inEditMode())  {
					toggleActionButtons();
				}
				break;

			case remoteButtons.UP:
				if (self.state === pageState.CHANNEL_SELECTED) {
					if (HomeService.onFirstRow()) {
						HomeService.selectNone();
						setState(pageState.BUTTON_SELECTED); 
					}
					else {
						HomeService.selectUp();
					}				
				}
				else if (self.state === pageState.MOVING) {
					HomeService.moveUp();
					reloadChannels();
				}
				else if (self.state === pageState.BUTTON_SELECTED) {
					setState(pageState.CHANNEL_SELECTED);
					HomeService.selectLastRow()
				}
			
				break;

			case remoteButtons.DOWN:
				if (self.state === pageState.CHANNEL_SELECTED) {
					if (HomeService.onLastRow()) {
						setState(pageState.BUTTON_SELECTED); 
						HomeService.selectNone();
					}
					else {
						HomeService.selectDown();
					}				
				}
				else if (self.state === pageState.MOVING) {
					HomeService.moveDown();
					reloadChannels();
				}
				else if (self.state === pageState.BUTTON_SELECTED) {
					setState(pageState.CHANNEL_SELECTED);
					HomeService.selectFirstRow()
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
						HomeService.deleteSelectedChannel();
						setState(pageState.CHANNEL_SELECTED);
						reloadChannels();
					});
				}

				break;

		}		
	});
}

function StoreController($scope, $state, $modal, remoteButtons, StoreService) {
	var self = this;
	self.channels = StoreService.getChannels();

	var pageState = {
		CHANNEL_SELECTED:'channelSelected',
		BUTTON_SELECTED:'buttonSelected'
	};

	self.pageState = pageState;
	self.state = pageState.BUTTON_SELECTED;
	StoreService.selectNone();

	self.isChannelSelected = function(channel) {
		return (channel == StoreService.getSelectedChannel())
	}

	var setState = function(state) {
		self.state = state;
	}

	$scope.$on('remoteButtonPress', function(event, key) {
		switch(key) {
			case remoteButtons.RIGHT:
				if (self.state === pageState.CHANNEL_SELECTED) {
					StoreService.selectRight();
				}

				break;

			case remoteButtons.LEFT:
				if (self.state === pageState.CHANNEL_SELECTED) {
					StoreService.selectLeft();
				}
				break;

			case remoteButtons.UP:
				if (self.state === pageState.CHANNEL_SELECTED) {
					if (StoreService.onFirstRow()) {
						StoreService.selectNone();
						setState(pageState.BUTTON_SELECTED); 
					}
					else {
						StoreService.selectUp();
					}				
				}
			
				break;

			case remoteButtons.DOWN:
				if (self.state === pageState.CHANNEL_SELECTED) {
					if (StoreService.onLastRow()) {
						setState(pageState.BUTTON_SELECTED); 
						StoreService.selectNone();
					}
					else {
						StoreService.selectDown();
					}				
				}
				else if (self.state === pageState.BUTTON_SELECTED) {
					setState(pageState.CHANNEL_SELECTED);
					StoreService.selectFirstRow()
				}


				break;


			case remoteButtons.OK:
				if (self.state === pageState.BUTTON_SELECTED) {
					$state.go('search');
				}
				else {
					$modal.open({ templateUrl:'partials/not-implemented.tpl.html' })				
				}

				break;

		}		
	});
}


function SearchController($scope, $state, $modal, remoteButtons, KeyboardService) {
	var self = this;

	var pageState = {
		KEYBOARD_SELECTED:'keyboardSelected',
		RESULT_SELECTED:'resultSelected'
	};

	self.searchText = "PBS"
	self.pageState = pageState;
	self.state = pageState.KEYBOARD_SELECTED;

	var setState = function(state) {
		self.state = state;
	}

	$scope.$on('remoteButtonPress', function(event, key) {
		switch(key) {
			case remoteButtons.RIGHT:
				if (self.state === pageState.KEYBOARD_SELECTED) {
					if (KeyboardService.atEndOfRow()) {
						setState(pageState.RESULT_SELECTED);
						KeyboardService.selectNone();					
					}
					else {
						KeyboardService.selectRight();
					}
				}

				break;

			case remoteButtons.LEFT:
				if (self.state === pageState.KEYBOARD_SELECTED) {
					KeyboardService.selectLeft();
				}
				else {
					setState(pageState.KEYBOARD_SELECTED);
					KeyboardService.selectAtEndOfRow();					
				}
				break;

			case remoteButtons.UP:
				if (self.state === pageState.KEYBOARD_SELECTED) {
					KeyboardService.selectUp();
				}
			
				break;

			case remoteButtons.DOWN:
				if (self.state === pageState.KEYBOARD_SELECTED) {
					KeyboardService.selectDown();				
				}


				break;


			case remoteButtons.OK:
				if (self.state === pageState.RESULT_SELECTED) {
					$state.go('addChannel');
				}
				else {
					$modal.open({ templateUrl:'partials/not-implemented.tpl.html' })				
				}

				break;

		}		
	});
}

function AddChannelController($scope, $state, remoteButtons, HomeService) {
	var self = this;
	$scope.$on('remoteButtonPress', function(event, key) {
		if (key === remoteButtons.OK) {
			HomeService.addChannel();
			$state.go('home');
		}
	});
}

angular.module('rokuApp.controllers', [])
	.controller('MainController', MainController)
	.controller('HomeController', HomeController)
	.controller('StoreController', StoreController)
	.controller('SearchController', SearchController)
	.controller('AddChannelController', AddChannelController);
