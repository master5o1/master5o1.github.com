define(['angular'], function(angular) {
	return function(app) {
		return app.controller('WelcomeCtrl', function ($scope) {
			// write Ctrl here
			$scope.page = 'welcome';
		});
	};
});