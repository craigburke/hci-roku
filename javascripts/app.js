angular.module('rokuApp', ['ui.router', 'rokuApp.controllers', 'rokuApp.directives'])
	.constant('remoteButtons', {
		HOME: 'home',
		BACK: 'back',
		UP: 'up',
		DOWN: 'down',
		LEFT: 'left',
		RIGHT: 'right',
		OK: 'ok',
		STAR: 'star'
	});