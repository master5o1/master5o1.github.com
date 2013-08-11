define(['angular', 'Controllers', 'Filters', 'Services', 'Directives'],
       function(angular) {
	var app = angular.module('myApp', [
	  'myApp.controllers',
		'myApp.filters',
		'myApp.services',
		'myApp.directives'
	]);

	app.config(function ($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'partials/Welcome',
				controller: 'WelcomeCtrl'
			}).
			when('/Welcome', {
				templateUrl: 'partials/Welcome',
				controller: 'WelcomeCtrl'
			}).
			when('/Creations', {
				templateUrl: 'partials/Creations',
				controller: 'CreationsCtrl'
			}).
			when('/Posts', {
				templateUrl: 'partials/Posts',
				controller: 'PostsCtrl'
			}).
			when('/About', {
				templateUrl: 'partials/About',
				controller: 'AboutCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	});

	return app;
});