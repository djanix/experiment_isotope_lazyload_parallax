define([
	'mootools',
	'class.mutators',
	'src/models/Model',
	'isotope-centering'
], function () {
	var className = 'ModelIsotope';

	$[className] = new Class({
		jQuery: className,
		Extends: $.Model,
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
		listEl: null,
		listItems: null,
		parallaxEl: null,
		windowHeight: null,

		movementDirection: -1,
		movementStrength: 250,

		height: 0,
		scrollTop: 0,

		//-- Init
		//--------------------------------------------------------------
		initHook: function () {
			var self = this;
			self.parent();

			self.windowHeight = $(window).height();
			self.height = self.movementStrength / self.windowHeight;
		},

		//-- Functions
		//--------------------------------------------------------------
		bindEvents: function () {
			var self = this;
			self.parent();

			$(document).on('scroll', function () {
				self.scrollTop = $(document).scrollTop();
				self.calcItemsPos();
			});

			$(window).resize(function () {
				self.scrollTop = $(document).scrollTop();
				self.windowHeight = $(window).height();
				self.calcItemsPos();
			});
		},

		initIsotope: function(container, url, filter) {
			var self = this;

			self.listEl = container;
			self.parallaxEl = container.find('.deeper .content');

			self.loadItems(url, function(err, res) {
				if (err) { return console.log(err); }

				var options = {
					itemSelector: '.item',
					masonry: {
						columnWidth: 255
					}
				};

				if (filter) {
					options.filter = '.' + filter + ', .hidden, .quote';
				}

				self.listItems = res;
				self.listEl.isotope(options);

				self.addItems();

				self.listEl.find('.item').on('mouseenter', function () {
					if ($(this).find('.hover').length !== 0) {
						$(this).find('a').hide();
						$(this).find('a.hover').show();
					}
				});

				self.listEl.find('.item').on('mouseleave', function () {
					$(this).find('a').show();
					$(this).find('a.hover').hide();
				});
			});
		},

		loadItems: function(url, callback) {
			$.ajax({
				url: url,
				dataType: 'json',
				type: 'POST'
			})
			.done(function(data, textStatus, jqXHR){
				var result = ((typeof data) == "string") ? $.parseJSON(data) : data;
				return callback(null, result);
			})
			.fail(function(jqXHR, textStatus, errorThrown){
				return callback(['fail', errorThrown], null);
			});
		},

		addItems: function () {
			var self = this;
			var html = "";

			$.each(self.listItems, function(index, item) {
				var image = '';

				if (item.type != 'hidden') {
					image = '<a href="' + item.link + '"><img src="./assets/img/' + item.image + '" alt="' + item.title + '"/></a>';
				}

				if (item.imageHover !== '') {
					image += '<a class="hover" href="' + item.link + '"><img src="./assets/img/' + item.imageHover + '" alt="' + item.title + '"/></a>';
				}

				html +=
					'<div class="item ' + item.type + ' w' + item.width + ' h' + item.height + '" data-hover-img="' + item.imageHover + '">' +
						'<div class="content">' +
							image +
						'</div>' +
					'</div>';
			});

			self.listEl.isotope('insert', $(html));
			self.listEl.find('img').bind("load", function () { $(this).fadeIn(); });
			self.parallaxEl = self.listEl.find('.quote .content');

//			TODO: remove dirty setTimeout, only for a quick fix
			setTimeout(function(){
				self.calcItemsPos();
			},100);
		},

		updateFilter: function (newFilter) {
			var self = this;
			self.listEl.isotope({ filter: newFilter });
		},

		calcItemsPos: function () {
			var self = this;

			$.each(self.parallaxEl, function (index, value) {
				var elPosition = $(value).offset().top - self.scrollTop;
				var pageY = elPosition - (self.windowHeight / 2);
				var offset = $(value).height() * self.movementStrength / 1200;
				var newValueY = ((self.height * pageY) + offset) * self.movementDirection;

				$(value).css("top", newValueY + "px");
			});
		},

		empty: null
	});

	return $[className];
});