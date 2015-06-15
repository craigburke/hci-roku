'use strict';

function ChannelService() {
	var MAX_ROW_LENGTH = 3;
	var channelService = {};
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

	channelService.getSelectedChannel = function() {
		return isChannelSelected ? channelRows[rowPosition][channelPosition] : null;
	}

	var getChannelIndex = function() {
		return channelList.indexOf(channelService.getSelectedChannel());
	}

	var getChannelCountInRow = function() {
		return channelRows[rowPosition].length;
	}
	
	channelService.selectNone = function() {
		isChannelSelected = false;
	}

	channelService.selectFirstRow = function() {
		isChannelSelected = true;
		rowPosition = 0;
		channelPosition = 0;
	}
	
	channelService.selectLastRow = function() {
		isChannelSelected = true;
		rowPosition = channelRows.length - 1;
		channelPosition = 0;
	}

	channelService.onFirstRow = function() {
		return rowPosition === 0;
	}

	channelService.onLastRow = function() {
		return rowPosition === (channelRows.length - 1);
	}

	channelService.selectRight = function() {
		if (channelPosition === (getChannelCountInRow() - 1)) {
			channelPosition = 0;
		}
		else {
			channelPosition++;
		}
	}
	
	channelService.selectLeft = function() {
		if (channelPosition == 0) {
			channelPosition = getChannelCountInRow() - 1;
		}
		else {
			channelPosition--;
		}
	}
	
	channelService.selectUp = function() {
		if (rowPosition == 0) {
			rowPosition = channelRows.length - 1;
		}
		else {
			rowPosition--;
		}
	}
	
	channelService.selectDown = function() {
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

	channelService.moveRight = function() {
 		if (channelPosition !== (MAX_ROW_LENGTH - 1)) {
			var currentIndex = getChannelIndex();
			var newIndex = currentIndex + 1;
			moveChannel(currentIndex, newIndex);
			channelPosition++;
		}
	}
	
	channelService.moveLeft = function() {
	 	if (channelPosition !== 0) {
			var currentIndex = getChannelIndex();
			var newIndex = currentIndex - 1;
			moveChannel(currentIndex, newIndex);
			channelPosition--;
		}	
	}

	channelService.moveUp = function() {
		if (!channelService.onFirstRow()) {
			var currentIndex = getChannelIndex()
			var newIndex = Math.max(currentIndex - MAX_ROW_LENGTH, 0);
			moveChannel(currentIndex, newIndex);
			rowPosition--;
		}
	}

	channelService.moveDown = function() {
		if (!channelService.onLastRow()) {
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

	channelService.getChannels = function() {
		return channelRows;
	}
	
	channelService.addChannel = function() {
		if (!channelAdded) {
			console.log("Added PBS");
		}
	}
	
	channelService.deleteSelectedChannel = function() {
		channelList.splice(getChannelIndex(), 1);
		loadChannelRows();
	}
	

    return channelService;
}

angular.module('rokuApp.services', [])
    .factory('ChannelService', ChannelService);
