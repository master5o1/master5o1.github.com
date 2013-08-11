require.config({
	baseUrl: "/js",
	paths: {
		angular: "/js/angular.min",
		jquery: "/js/jquery-1.10.2.min",
		bootstrap: "/js/bootstrap.min"
	},
	shim: {
		angular: { exports: "angular", deps: ["jquery"] },
		jquery: { exports: "jQuery", deps: [] },
		bootstrap: { deps: ['jquery'] },
	},
	priority: ["angular", "jquery"],
	packages: [
		{
			'name': 'angular',
			'location': '/js',
			'main': 'angular.min'
		},
		{
			'name': 'jquery',
			'location': '/js',
			'main': 'jquery-1.10.2.min'
		}

	]
})