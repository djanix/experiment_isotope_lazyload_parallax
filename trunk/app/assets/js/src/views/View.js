define([
	'mootools',
	'class.mutators'
], function () {
	var className = 'View';

	$[className] = new Class({
		jQuery: className,
		Implements: [Options, Events],
		options: {},

		initialize: function (el, options) {
			var self = this;

			self.el = $(el);

			self.setOptions(options);
			self.init();
		},

		//-- Vars
		//--------------------------------------------------------------
		header: null,

		//-- Init
		//--------------------------------------------------------------
		init: function () {
			var self = this;

			self.initHook();
			self.bindEvents();
		},

		//-- Hooks
		//--------------------------------------------------------------
		initHook: function () {
			var self = this;
			self.header = self.el.find('header nav');
			self.header.data('size','big');
		},

		//-- Functions
		//--------------------------------------------------------------
		bindEvents: function () {
			var self = this;
			var header = self.el.find('header');
			var footer = self.el.find('footer');

			var search = header.find('.search');
			var filters = header.find('.filters');

			header.find('.searchMenu').on('click', function (e) {
				e.preventDefault();
				filters.stop().slideUp(300, 'easeInOutQuad');
				search.stop().slideToggle(300, 'easeInOutQuad', function() {
					search.find('[type="search"]').focus();
				});
			});

			header.find('.filtersMenu').on('click', function (e) {
				e.preventDefault();
				search.stop().slideUp(300, 'easeInOutQuad');
				filters.stop().slideToggle(300, 'easeInOutQuad');
				$(this).stop().fadeOut(300);
			});

			search.find('.close').on('click', function (e) {
				e.preventDefault();
				search.stop().slideUp(300, 'easeInOutQuad');
				header.find('.filtersMenu').stop().fadeIn(300);
			});

			filters.find('.close').on('click', function (e) {
				e.preventDefault();
				filters.stop().slideUp(300, 'easeInOutQuad');
				header.find('.filtersMenu').stop().fadeIn(300);
			});

			search.find('[type="search"]').on('keyup', function () {
				if ($(this).val() === '') {
					search.find('.results').stop().slideUp(300, 'easeInOutQuad');
					search.find('.reset').stop().animate({opacity: 0}, 300, function() {
						$(this).hide();
					});
				} else {
					search.find('.results').stop().slideDown(300, 'easeInOutQuad');
					search.find('.reset').show().stop().animate({opacity: 1}, 300);
				}
			});

			search.find('.reset').on('click', function (e) {
				search.find('[type="search"]').val('').focus();
				search.find('.results').stop().slideDown(300, 'easeInOutQuad').height();
			});

			footer.find('.character img').on('click', function(e) {
				e.preventDefault();
				footer.find('.bubble').stop().fadeToggle(300, 'easeInOutQuad');
			});

			$(window).scroll(function(){
				if($(document).scrollTop() > 0) {
					if(self.header.data('size') == 'big') {
						self.header.addClass('small').data('size','small');
						self.header.stop().animate({
							paddingTop: '2px',
							paddingBottom: '2px'
						},300, 'easeInOutExpo');

						self.header.find('.home').stop().animate({
							fontSize: '28px'
						},300, 'easeInOutExpo');

						self.header.find('a:not(".home")').stop().animate({
							fontSize: '14px'
						},300, 'easeInOutExpo');

						self.header.find('.filtersMenu').stop().animate({
							bottom: '3px'
						},300, 'easeInOutExpo');
					}
				} else {
					self.header.removeClass('small').data('size','big');
					self.header.stop().animate({
						paddingTop: '60px',
						paddingBottom: '40px'
					},300, 'easeInOutExpo');

					self.header.find('.home').stop().animate({
						fontSize: '52px'
					},300, 'easeInOutExpo');

					self.header.find('a:not(".home")').stop().animate({
						fontSize: '18px'
					},300, 'easeInOutExpo');

					self.header.find('.filtersMenu').stop().animate({
						bottom: '20px'
					},300, 'easeInOutExpo');

					search.stop().slideUp(300, 'easeInOutQuad');
					filters.stop().slideDown(300, 'easeInOutQuad');
					header.find('.filtersMenu').stop().fadeOut(300);
				}

				if ($('body').height() <= ($(window).height() + $(window).scrollTop())) {
					footer.find('.bubble').fadeIn(300);
				} else {
					footer.find('.bubble').fadeOut(300);
				}
			});
		},

		empty: null
	});

	return $[className];
});