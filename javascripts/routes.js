'use strict';

angular.module('rokuApp')
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
	
	$stateProvider
		.state('home', {
			url:'/home',
			controller: 'HomeController as homeCtrl',
			templateUrl:'partials/home.tpl.html'
		})
		.state('store', {
			url:'/store',
			controller: 'StoreController as storeCtrl',
			templateUrl:'partials/store.tpl.html'
		})
		.state('search', {
			url:'/search',
			controller: 'SearchController as searchCtrl',
			templateUrl:'partials/search.tpl.html'
		})
		.state('addChannel', {
			url:'/addChannel',
			controller: 'AddChannelController as addCtrl',
			templateUrl:'partials/add-channel.tpl.html'
		})
		.state('pbsChannel', {
			url:'/pbsChannel',
			controller: 'PbsController as pbsCtrl',
			templateUrl:'partials/pbs-channel.tpl.html'
		})
		.state('pbsShow', {
			url:'/pbsShow',
			controller: 'ShowController as showCtrl',
			templateUrl:'partials/pbs-show.tpl.html'
		});
});
