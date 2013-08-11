define(['angular'], function(angular) {
	return function(app) {
		return app.controller('AboutCtrl', function ($scope) {
			$scope.page = 'about';

		});
	};
});