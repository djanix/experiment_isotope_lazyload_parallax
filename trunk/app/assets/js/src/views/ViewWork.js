define([
	'mootools',
	'class.mutators',
	'src/views/View',
	'src/models/ModelIsotope'
], function () {
	var className = 'ViewWork';

	$[className] = new Class({
		jQuery: className,
		Extends: $.View,
		options: {},

		//-- init
		//---------------------------------------------
		initialize: function (el, options) {
			el = $(el);
			var self = this;

			self.parent(el, options);
		},

		//-- Vars
		//--------------------------------------------------------------
		isotope: null,
		//-- Init
		//--------------------------------------------------------------
		initHook: function () {
			var self = this;
			self.parent();

			self.isotope = new $.ModelIsotope();
			self.isotope.initIsotope(self.el.find('#itemList'), "./assets/data/_fakeData_home.json", 'work');
			self.el.find('header .filters').stop().slideToggle(300, 'easeInOutQuad');
		},

		//-- Functions
		//--------------------------------------------------------------
		bindEvents: function () {
			var self = this;
			self.parent();

			self.el.find('.loadMore').on('click', function (e) {
				e.preventDefault();
				self.isotope.addItems();
				$(this).closest('.bubble').stop().fadeOut(300);
			});
		},

		empty: null
	});

	return $[className];
});