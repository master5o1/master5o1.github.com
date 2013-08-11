/*

define([googlePlusUrl], function(GooglePlus) {
	return GooglePlus;
});
*/


define(['angular',''], function(angular) {
	return function(app) {
		return app.controller('PostsCtrl', function ($scope) {
			var apiKey = 'AIzaSyD6waxLgpwHd0QXrExGwBMigr-01mQ4Lr4';
			var googlePlusUrl = 'https://www.googleapis.com/plus/v1/people/107744372254752109523/activities/public?&key=' + apiKey + '&fields=items(title,published,updated,url,actor,verb,object)&callback=define';

			$scope.page = 'posts';

			$scope.loadGooglePlus = function() {
				require([googlePlusUrl], function(data) {
					console.log(data);
					$scope.Posts = data.items;
				});
			};

			var init = function() {
				$scope.posts = [];
				$scope.loadGooglePlus();
			};

			init();
		});
	};
});