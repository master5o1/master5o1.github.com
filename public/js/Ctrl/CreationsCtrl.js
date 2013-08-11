define(['angular'], function(angular) {
	return function(app) {
		return app.controller('CreationsCtrl', function ($scope) {
			// write Ctrl here
			$scope.page = 'creations';
		});
	};
});