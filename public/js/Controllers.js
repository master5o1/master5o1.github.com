define(['angular', 'Ctrl/WelcomeCtrl', 'Ctrl/CreationsCtrl', 'Ctrl/PostsCtrl', 'Ctrl/AboutCtrl'],
       function(angular, WelcomeCtrl, CreationsCtrl, PostsCtrl, AboutCtrl) {
	'use strict';

	/* Controllers */

	var app = angular.module('myApp.controllers', []);

	WelcomeCtrl(app);
	CreationsCtrl(app);
	PostsCtrl(app);
	AboutCtrl(app);
});