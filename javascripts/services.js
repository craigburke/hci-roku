'use strict';

function ChannelService() {
	var channelService = {};

	var channelAdded = false;
	
	var channels = [
		[{name: 'Channel 1'}, {name: 'Channel 2'}, {name: 'Channel 3'}],
		[{name: 'Channel 4'}, {name: 'Channel 5'}, {name: 'Channel 6'}],
		[{name: 'Channel 7'}, {name: 'Channel 8'}]
	];
	var rowPosition = 0;
	var channelPosition = 0;
	var getChannelsInRow = function() {
		return channels[rowPosition].length;
	}
	
	channelService.getSelectedChannel = function() {
		return channels[rowPosition][channelPosition];
	}
	
	channelService.moveRight = function() {
		if (channelPosition === (getChannelsInRow() - 1)) {
			channelPosition = 0;
		}
		else {
			channelPosition++;
		}
	}
	
	channelService.moveLeft = function() {
		if (channelPosition == 0) {
			channelPosition = getChannelsInRow() - 1;
		}
		else {
			channelPosition--;
		}
	}
	
	channelService.moveUp = function() {
		if (rowPosition == 0) {
			rowPosition = channels.length - 1;
		}
		else {
			rowPosition--;
		}
	}
	
	channelService.moveDown = function() {
		if (rowPosition == (channels.length - 1)) {
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
	
	
	channelService.getChannels = function() {
		return channels;
	}
	
	channelService.addChannel = function() {
		if (!channelAdded) {
			console.log("Added PBS");
		}
	}
	
	channelService.removeChannel = function() {
		
	}
	

    return channelService;
}

angular.module('rokuApp.services', [])
    .factory('ChannelService', ChannelService);