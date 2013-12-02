var App;

(function () {
	requirejs.config({
		paths: {
			'jquery': [
				'//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
				'./vendor/jquery/jquery.min'
			],
			'mootools': './vendor/mootools-core-1.4.5',
			'class.mutators': './vendor/Class.Mutators.jQuery',
			'isotope': 'vendor/isotope/jquery.isotope.min',
			'isotope-centering': 'vendor/isotope-centering-fix'
		},
		shim: {
			'src/App': {
				deps: [
					'jquery'
				]
			},
			'class.mutators': {
				deps: [
					'mootools'
				],
				exports: 'classmutators'
			},
			'isotope-centering': {
				deps: [
					'isotope'
				]
			}
		},
		waitSeconds: 15
	});

	requirejs([
		'jquery',
		'./src/App'
	], function () {
		$(function () {
			App = new $.App($('#site'));
		});
	});

})();