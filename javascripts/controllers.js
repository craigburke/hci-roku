function MainController() {
    var self = this;
}

function HomeController($scope, $state, $modal, remoteButtons, HomeService, AlertService) {
	var self = this;
	self.channels = HomeService.getChannels();

	var pageState = {
		CHANNEL_SELECTED:'channelSelected',
		BUTTON_SELECTED:'buttonSelected',
		MOVE_SELECTED:'moveSelected',
		MOVING:'moving',
		DELETE_SELECTED:'deleteSelected',
		DELETE_CONFIRMIRMATION:'deleteConfirm'
	};
	
	self.pageState = pageState;
	self.state = pageState.CHANNEL_SELECTED;
	HomeService.selectFirstRow();

	self.isChannelSelected = function(channel) {
		return (channel == HomeService.getSelectedChannel());
	}

	self.showInfo = function(channel) {
		return (channel == HomeService.getSelectedChannel())
	}
	
	self.showArrows = function(channel) {
		return (self.isChannelSelected(channel) && self.state === pageState.MOVING);
	}

	self.showUpArrow = function() {
		return (!HomeService.onFirstRow());
	}
	
	self.showDownArrow = function() {
		return (!HomeService.onLastRow());
	}
	
	self.showLeftArrow = function() {
		return (!HomeService.onFirstRowChannel());
	}

	self.showRightArrow = function() {
		return (!HomeService.onLastRowChannel());
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
		return inEditMode() || self.state === pageState.DELETE_CONFIRMIRMATION;
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
				else if (self.state === pageState.CHANNEL_SELECTED) {
					$state.go('pbsChannel');
				}
				else if (self.state === pageState.MOVING) {
					setState(pageState.CHANNEL_SELECTED);
				}
				else if (self.state === pageState.MOVE_SELECTED) {
					setState(pageState.MOVING);
				}
				else if (self.state === pageState.DELETE_SELECTED) {					
					setState(pageState.DELETE_CONFIRMIRMATION);
					var deleteConfirmation = $modal.open({
						backdrop: false,
						controller: 'DeleteConfirmController as deleteConfirmCtrl',
						templateUrl:'partials/delete-confirmation.tpl.html'
					});	
					deleteConfirmation.result.then(function() {
						HomeService.deleteSelectedChannel();
						setState(pageState.CHANNEL_SELECTED);
						reloadChannels();
						AlertService.setMessage("Channel was succesfully deleted.");
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

	self.searchText = ""
	self.pageState = pageState;
	self.state = pageState.KEYBOARD_SELECTED;
	self.showResults = false;

	var setState = function(state) {
		self.state = state;
	}
	
	$scope.$on('remoteButtonPress', function(event, key) {
		switch(key) {
			case remoteButtons.RIGHT:
				if (self.state === pageState.KEYBOARD_SELECTED) {
					if (self.showResults && KeyboardService.atEndOfRow()) {
						setState(pageState.RESULT_SELECTED);
						KeyboardService.selectNone();					
					}
					else {
						KeyboardService.selectRight();
					}
				}
				else {
					setState(pageState.KEYBOARD_SELECTED);
					KeyboardService.selectAtBeginningOfRow();					
				}

				break;

			case remoteButtons.LEFT:	
				if (self.state === pageState.KEYBOARD_SELECTED) {
					if (self.showResults && KeyboardService.atBeginningOfRow()) {
						KeyboardService.selectNone();
						setState(pageState.RESULT_SELECTED);
					}
					else {
						KeyboardService.selectLeft();
					}
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
				else if (self.state === pageState.KEYBOARD_SELECTED) {
					self.searchText += KeyboardService.getSelectedKey();
					self.showResults = true;
				}
				else {
					$modal.open({ templateUrl:'partials/not-implemented.tpl.html' })				
				}

				break;

		}		
	});
}

function AddChannelController($scope, $state, remoteButtons, HomeService, AlertService) {
	var self = this;
	$scope.$on('remoteButtonPress', function(event, key) {
		if (key === remoteButtons.OK) {
			HomeService.addChannel();
			AlertService.setMessage('Successfully added the PBS channel');
			$state.go('home');
		}
	});
}

function DeleteConfirmController($scope, remoteButtons) {
	var self = this;
	
	var popupState = {
		OK_SELECTED:'okSelected',
		CANCEL_SELECTED:'cancelSelected'
	};

	self.state = popupState.OK_SELECTED;
	self.popupState = popupState;
	
	$scope.$on('remoteButtonPress', function(event, key) {
		if (key === remoteButtons.LEFT || key === remoteButtons.RIGHT) {
			self.state = self.state === popupState.OK_SELECTED ? popupState.CANCEL_SELECTED : popupState.OK_SELECTED;
		}
		if (key === remoteButtons.OK) {
			if (self.state === popupState.OK_SELECTED) {
				$scope.$close();
			}
			else {
				$scope.$dismiss();
			}
		}
		
	});
}

function PbsController($scope, $state, remoteButtons, PbsService) {
	var self = this;
	self.shows = PbsService.getShowRows();
	
	self.isShowSelected = function(show) {
		return (show == PbsService.getSelectedShow());
	}
	
	$scope.$on('remoteButtonPress', function(event, key) {
		if (key === remoteButtons.LEFT) {
			PbsService.selectLeft();
		}
		else if (key === remoteButtons.RIGHT) {
			PbsService.selectRight();
		}
		else if (key === remoteButtons.UP) {
			PbsService.selectUp();
		}
		else if (key === remoteButtons.DOWN) {
				PbsService.selectDown();
		}
		else if (key === remoteButtons.OK) {
			$state.go('pbsShow');
		}
	});
}

angular.module('rokuApp.controllers', [])
	.controller('MainController', MainController)
	.controller('HomeController', HomeController)
	.controller('StoreController', StoreController)
	.controller('SearchController', SearchController)
	.controller('AddChannelController', AddChannelController)
	.controller('DeleteConfirmController', DeleteConfirmController)
	.controller('PbsController', PbsController);
