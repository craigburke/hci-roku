'use strict';

function ChannelService() {
	var channelService = {};
	var channelAdded = false;
	
	var channelList = [
		{name: 'Channel 1'}, {name: 'Channel 2'}, {name: 'Channel 3'}, {name: 'Channel 4'}, {name: 'Channel 5'}, {name: 'Channel 6'},
		{name: 'Channel 7'}, {name: 'Channel 8'}
	];

	function getChannelRows() {
		var result = [];
		for (var i = 0; i < channelList.length; i = i + 3) {
    			result.push(channelList.slice(i, i+3));
		}
		return result;
	}
	var channelRows = getChannelRows();


	var rowPosition = 0;
	var channelPosition = 0;
	var isChannelSelected = true;

	var getChannelsInRow = function() {
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
	
	channelService.getSelectedChannel = function() {
		return isChannelSelected ? channelRows[rowPosition][channelPosition] : null;
	}

	channelService.selectRight = function() {
		if (channelPosition === (getChannelsInRow() - 1)) {
			channelPosition = 0;
		}
		else {
			channelPosition++;
		}
	}
	
	channelService.selectLeft = function() {
		if (channelPosition == 0) {
			channelPosition = getChannelsInRow() - 1;
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
			var maxChannelPosition = getChannelsInRow() - 1;
			
			if (channelPosition > maxChannelPosition) {
				channelPosition = maxChannelPosition;
			}
		
		}
	}
	
	channelService.moveRight = function() {
		
	}
	
	channelService.moveLeft = function() {
		
	}

	channelService.moveUp = function() {
		
	}

	channelService.moveDown = function() {
		
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
		var channelIndex = channelList.indexOf(channelService.getSelectedChannel());
		channelList.splice(channelIndex, 1);
		channelRows = getChannelRows();
	}
	

    return channelService;
}

angular.module('rokuApp.services', [])
    .factory('ChannelService', ChannelService);
