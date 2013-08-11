require.config({
	baseUrl: "/js",
	paths: {
		angular: "/js/lib/angular/angular.min",
		jquery: "/js/lib/jquery/jquery-1.10.2.min",
		bootstrap: "/js/lib/bootstrap/bootstrap.min"
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
			'location': '/js/lib/angular',
			'main': 'angular.min'
		},
		{
			'name': 'jquery',
			'location': '/js',
			'main': 'jquery-1.10.2.min'
		}

	]
})