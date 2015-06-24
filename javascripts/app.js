angular.module('rokuApp', ['ui.router', 'ui.bootstrap', 'rokuApp.controllers', 'rokuApp.directives', 'rokuApp.services'])
	.constant('remoteButtons', {
		NOT_IMPLEMENTED: 'notImplemented',
		HOME: 'home',
		BACK: 'back',
		UP: 'up',
		DOWN: 'down',
		LEFT: 'left',
		RIGHT: 'right',
		OK: 'ok',
		STAR: 'star',
		UNDO: 'undo'
	});