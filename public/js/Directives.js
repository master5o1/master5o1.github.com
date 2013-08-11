define(['angular'], function (angular) {
	'use strict';

	var app = angular.module('myApp.directives', []);
	
	app.directive('appVersion', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	});

	app.directive('compile', ['$compile', function ($compile) {

		return function (scope, element, attrs) {
			scope.$watch(function (scope) {
				return scope.$eval(attrs.compile);
			}, function (value) {
				element.html(value);

				$compile(element.contents())(scope);
			});
		};
	}]);
});