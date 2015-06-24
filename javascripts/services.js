'use strict';

function HomeService() {
	var MAX_ROW_LENGTH = 3;
	var homeService = {};
	var channelAdded = false;
	
	var channelList = [
		{name: 'Channel 1'}, {name: 'Channel 2'}, {name: 'Channel 3'}, {name: 'Channel 4'}, {name: 'Channel 5'}, {name: 'Channel 6'},
		{name: 'Channel 7'}, {name: 'Channel 8'}
	];

	var channelRows = [];
	function loadChannelRows() {
		channelRows = [];
		for (var i = 0; i < channelList.length; i = i + 3) {
    			channelRows.push(channelList.slice(i, i+3));
		}
	}
	loadChannelRows();	

	var rowPosition = 0;
	var channelPosition = 0;
	var isChannelSelected = true;
	var lastDeletedChannel = null;

	homeService.getSelectedChannel = function() {
		return isChannelSelected ? channelRows[rowPosition][channelPosition] : null;
	}

	var getChannelIndex = function() {
		return channelList.indexOf(homeService.getSelectedChannel());
	}

	var getChannelCountInRow = function() {
		return channelRows[rowPosition].length;
	}
	
	homeService.selectNone = function() {
		isChannelSelected = false;
	}

	homeService.selectFirstRow = function() {
		isChannelSelected = true;
		rowPosition = 0;
		channelPosition = 0;
	}
	
	homeService.selectLastRow = function() {
		isChannelSelected = true;
		rowPosition = channelRows.length - 1;
		channelPosition = 0;
	}

	homeService.onFirstRow = function() {
		return rowPosition === 0;
	}

	homeService.onLastRow = function() {
		return rowPosition === (channelRows.length - 1);
	}
	
	homeService.onFirstRowChannel = function() {
		return channelPosition === 0;
	}
	
	homeService.onLastRowChannel = function() {
		return channelPosition === (getChannelCountInRow() - 1)
	}

	homeService.selectRight = function() {
		if (channelPosition === (getChannelCountInRow() - 1)) {
			channelPosition = 0;
		}
		else {
			channelPosition++;
		}
	}
	
	homeService.selectLeft = function() {
		if (channelPosition == 0) {
			channelPosition = getChannelCountInRow() - 1;
		}
		else {
			channelPosition--;
		}
	}
	
	homeService.selectUp = function() {
		if (rowPosition == 0) {
			rowPosition = channelRows.length - 1;
		}
		else {
			rowPosition--;
		}
	}
	
	homeService.selectDown = function() {
		if (rowPosition == (channelRows.length - 1)) {
			rowPosition = 0;
		}
		else {
			rowPosition++;
			var maxChannelPosition = getChannelCountInRow() - 1;
			
			if (channelPosition > maxChannelPosition) {
				channelPosition = maxChannelPosition;
			}
		}
	}

	function moveChannel(from, to) {
		channelList.splice(to, 0, channelList.splice(from, 1)[0]);
		loadChannelRows();
	}

	homeService.moveRight = function() {
 		if (channelPosition !== (MAX_ROW_LENGTH - 1)) {
			var currentIndex = getChannelIndex();
			var newIndex = currentIndex + 1;
			moveChannel(currentIndex, newIndex);
			channelPosition++;
		}
	}
	
	homeService.moveLeft = function() {
	 	if (channelPosition !== 0) {
			var currentIndex = getChannelIndex();
			var newIndex = currentIndex - 1;
			moveChannel(currentIndex, newIndex);
			channelPosition--;
		}	
	}

	homeService.moveUp = function() {
		if (!homeService.onFirstRow()) {
			var currentIndex = getChannelIndex()
			var newIndex = Math.max(currentIndex - MAX_ROW_LENGTH, 0);
			moveChannel(currentIndex, newIndex);
			rowPosition--;
		}
	}

	homeService.moveDown = function() {
		if (!homeService.onLastRow()) {
			var currentIndex = getChannelIndex()
			var newIndex = Math.min(currentIndex + MAX_ROW_LENGTH, channelList.length - 1);
			moveChannel(currentIndex, newIndex);
			rowPosition++;
			var newRowChannelCount = getChannelCountInRow();
			if (channelPosition > newRowChannelCount - 1) {
				channelPosition = newRowChannelCount - 1;
			}
		}
	}

	homeService.getChannels = function() {
		return channelRows;
	}
	
	homeService.addChannel = function() {
		if (!channelAdded) {
			channelList.unshift({name: 'PBS'});
			loadChannelRows();
			channelAdded = true;
		}
	}
	
	homeService.deleteSelectedChannel = function() {
		lastDeletedChannel = angular.copy(homeService.getSelectedChannel());
		channelList.splice(getChannelIndex(), 1);
		loadChannelRows();
	}
	
	homeService.undoDelete = function() {
		if (lastDeletedChannel) {
			var channelClone = angular.copy(lastDeletedChannel);
			channelList.unshift(channelClone);
			lastDeletedChannel = null;
			loadChannelRows();
		}
	}

    return homeService;
}

function StoreService() {
	var MAX_ROW_LENGTH = 3;
	var storeService = {};
	
	var channelList = [
		{name: 'Channel 1'}, {name: 'Channel 2'}, {name: 'Channel 3'}, {name: 'Channel 4'}, {name: 'Channel 5'}, {name: 'Channel 6'},
		{name: 'Channel 7'}, {name: 'Channel 8'}
	];

	var channelRows = [];
	function loadChannelRows() {
		channelRows = [];
		for (var i = 0; i < channelList.length; i = i + 3) {
    			channelRows.push(channelList.slice(i, i+3));
		}
	}
	loadChannelRows();	

	var rowPosition = 0;
	var channelPosition = 0;
	var isChannelSelected = true;
	
	storeService.getSelectedChannel = function() {
		return isChannelSelected ? channelRows[rowPosition][channelPosition] : null;
	}

	var getChannelIndex = function() {
		return channelList.indexOf(homeService.getSelectedChannel());
	}

	var getChannelCountInRow = function() {
		return channelRows[rowPosition].length;
	}
	
	storeService.selectFirstRow = function() {
		isChannelSelected = true;
		rowPosition = 0;
		channelPosition = 0;
	}
	
	storeService.selectLastRow = function() {
		isChannelSelected = true;
		rowPosition = channelRows.length - 1;
		channelPosition = 0;
	}

	storeService.onFirstRow = function() {
		return rowPosition === 0;
	}

	storeService.onLastRow = function() {
		return rowPosition === (channelRows.length - 1);
	}

	storeService.selectNone = function() {
		isChannelSelected = false;
	}

	storeService.selectRight = function() {
		if (channelPosition === (getChannelCountInRow() - 1)) {
			channelPosition = 0;
		}
		else {
			channelPosition++;
		}
	}
	
	storeService.selectLeft = function() {
		if (channelPosition == 0) {
			channelPosition = getChannelCountInRow() - 1;
		}
		else {
			channelPosition--;
		}
	}
	
	storeService.selectUp = function() {
		if (rowPosition == 0) {
			rowPosition = channelRows.length - 1;
		}
		else {
			rowPosition--;
		}
	}
	
	storeService.selectDown = function() {
		if (rowPosition == (channelRows.length - 1)) {
			rowPosition = 0;
		}
		else {
			rowPosition++;
			var maxChannelPosition = getChannelCountInRow() - 1;
			
			if (channelPosition > maxChannelPosition) {
				channelPosition = maxChannelPosition;
			}
		}
	}

	storeService.getChannels = function() {
		return channelRows;
	}
	

    return storeService;
}

function KeyboardService() {
	var keyboardService = {};
	var currentLetter = {row: 0, column: 0};
	var letterSelected = true;

	var keyboardRows = [
		['a', 'b', 'c', 'd', 'e', 'f'],
		['g', 'h', 'i', 'j', 'k', 'l'],
		['m', 'n', 'o', 'p', 'q', 'r'],
		['s', 't', 'u', 'v', 'w', 'x'],
		['y', 'z', '0', '1', '2', '3'],
		['4', '5', '6', '7', '8', '9'] 
	];

	keyboardService.onFirstRow = function() {
		return currentLetter.row === 0;
	}
	
	keyboardService.onLastRow = function() {
		return currentLetter.row === 5;
	}
	
	keyboardService.selectNone = function() {
		letterSelected = false;
	}
	
	keyboardService.selectAtBeginningOfRow = function() {
		letterSelected = true;
		currentLetter.row = 0;
		currentLetter.column = 0;
	}
	
	keyboardService.selectAtEndOfRow = function() {
		letterSelected = true;
		currentLetter.row = 0;
		currentLetter.column = 5;
	}
	
	keyboardService.selectAtStartOfLastRown = function() {
		letterSelected = true;
		currentLetter.row = 5;
		currentLetter.column = 0;
	}

	keyboardService.getKeyboardRows = function() {
		return keyboardRows;
	}

	keyboardService.getSelectedKey = function() {
		return letterSelected ? keyboardRows[currentLetter.row][currentLetter.column] : null;
	}
	
	keyboardService.atBeginningOfRow = function() {
		return (currentLetter.column === 0);
	}
	
	keyboardService.atEndOfRow = function() {
		return (currentLetter.column === 5);
	}

	keyboardService.selectUp = function() {
		if (currentLetter.row !== 0) {
			currentLetter.row--;
		}
	}

	keyboardService.selectDown = function() {
		if (currentLetter.row !== keyboardRows.length - 1) {
			currentLetter.row++;
		}
	}

	keyboardService.selectLeft = function() {
		if (currentLetter.column !== 0) {
			currentLetter.column--;
		}
	}
	
	keyboardService.selectRight = function() {
		if (!keyboardService.atEndOfRow()) {
			currentLetter.column++;
		}
	}

	return keyboardService;

}

function PbsService() {
	var pbsService = {};
	
	var showList = [
		{name: 'Show 1'}, {name: 'Show 2'}, {name: 'Show 3'}, {name: 'Show 4'}, {name: 'Show 5'}, {name: 'Show 6'}
	];
	
	var MAX_ROW_LENGTH = 3;

	var showRows = [];
	function loadShowRows() {
		showRows = [];
		for (var i = 0; i < showList.length; i = i + 3) {
    			showRows.push(showList.slice(i, i+3));
		}
	}
	loadShowRows();	
	
	var rowPosition = 0;
	var showPosition = 0;
	var selectedShow = showList[0];
	
	var getShowCountInRow = function() {
		return showRows[rowPosition].length;
	}
	
	pbsService.getSelectedShow = function() {
		return showRows[rowPosition][showPosition];
	}
	
	pbsService.selectRight = function() {
		if (showPosition === (getShowCountInRow() - 1)) {
			showPosition = 0;
		}
		else {
			showPosition++;
		}
	}
	
	pbsService.selectLeft = function() {
		if (showPosition == 0) {
			showPosition = getShowCountInRow() - 1;
		}
		else {
			showPosition--;
		}
	}
	
	pbsService.selectUp = function() {
		if (rowPosition == 0) {
			rowPosition = showRows.length - 1;
		}
		else {
			rowPosition--;
		}
	}
	
	pbsService.selectDown = function() {
		if (rowPosition == (showRows.length - 1)) {
			rowPosition = 0;
		}
		else {
			rowPosition++;
		}
	}
	
	pbsService.getShowRows = function() {
		return showRows;
	}	
	
	return pbsService;
}

function AlertService($rootScope) {
	var alertService = {};
	alertService.setMessage = function(message) {
		$rootScope.$broadcast('message', message);
	}
	return alertService;
}

angular.module('rokuApp.services', [])
	.factory('HomeService', HomeService)
	.factory('StoreService', StoreService)
	.factory('KeyboardService', KeyboardService)
	.factory('AlertService', AlertService)
	.factory('PbsService', PbsService);
