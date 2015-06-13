'use strict';

angular.module('rokuApp')
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
	
	$stateProvider
		.state('home', {
			url:'/home',
			templateUrl:'partials/home.tpl.html'
		})
		.state('store', {
			url:'/store',
			templateUrl:'partials/store.tpl.html'
		})
		.state('search', {
			url:'/search',
			templateUrl:'partials/search.tpl.html'
		});
});