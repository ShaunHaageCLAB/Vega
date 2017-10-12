var VEGA = {
	init : function($) {
		"use strict";

        var $cache = { 
            body: 			$('body'),
            navigation: 	$("#secondary-navigation"),
            nav_wrapper: 	$("#site-navigation"),
            header:			$("#site-header"),  
            content: 		$('#s4-workspace'), 
			footer: 		$('#site-footer'),
			carousel :		$('.js-mobile-carousel'),
			panels : 		$('.js-panel-animation')
		};
		
		var panels = {
			top : [],
			id : [],
			animatedCount : 0,
			animationOffset : 0,
			windowHeight : 0
		};

		
		$('html').removeClass('no-js').addClass('js');

		// Homepage animation
		// -----------------------------------------------------------
		// Get initial page dimensions
		getPanelDimensions();

		// Update panel dimensions on page resize
		$(window).resize(function() {
			panels.top = []; //empty our array
			getPanelDimensions();
		});		
		
		function getPanelDimensions() {
			panels.animationOffset = $(window).height() / 3;

			panels.windowHeight = $(window).height();

			$cache.panels.each( function() {
				panels.top.push($(this).offset().top);
				panels.id.push($(this).attr('id'));
			});
		}


		// Mobile Flyout menu
		// -----------------------------------------------------------
		var menulevel = 1;
		$('#site-navigation').on('click', '.js-has-children', function () {
			var $el 	= $(this),
				$parent = $el.parent('li');
			
			menulevel++;
			$parent.addClass('is-expanded');
			$cache.navigation.attr('data-menu', menulevel);
			
			return false;			
		});

		$('#site-navigation').on('click', '.js-menu-back', function () {
			var $el 	= $(this),
				$parent = $el.parent('li');
			
			menulevel--;
			$parent.removeClass('is-expanded');
			$cache.navigation.attr('data-menu', menulevel);
			
			return false;			
		});



		// Scroll Events
		// -----------------------------------------------------------
		
		// Set inital page scroll location
		scrollPanels();

		// Update on page scroll
		$(window).scroll(function() {
			scrollPanels();
		});

		function scrollPanels() {
			// Fixed Navigation bar
			var scrollposition = $(window).scrollTop();

		   if(scrollposition > panels.windowHeight/2) {
			   $cache.body.addClass('has-reduced-menu');
		   } else {
			   $cache.body.removeClass('has-reduced-menu');
		   }

		   // Animated Homepage panels
		   if(panels.animatedCount <= panels.top.length) {
			   for (var index = 0; index < panels.top.length; index++) {
				   var $element = $('#' + panels.id[index]);					

				   if(scrollposition >= panels.top[index] - panels.animationOffset) {
					   if( !$element.hasClass('is-animated') ) {
						   $element.addClass('is-animated');
						   panels.animatedCount++;							
						   updatePanelNavigation(index);
					   }
				   } 
				   
				   if(scrollposition <= panels.top[index] - panels.animationOffset) {				
					   if( $element.hasClass('is-animated') ) {
						   $element.removeClass('is-animated');
						   panels.animatedCount--;							
						   updatePanelNavigation(index - 1);
					   }						
				   }
			   }
		   }
		}

		function updatePanelNavigation(index) {			
			console.log(index);
			if(index < 0) index = 0;
			
			$('#panel-navigation')
				.find('.panel_navigation__item:eq('+ index  +')')
				.addClass('is-active').siblings('li').removeClass('is-active');
		}

		

		// Floating fixed panel navigation
		// -----------------------------------------------------------
		$cache.content.on('click', '.js-panel_navigation__link', function() {
			var $el 		= $(this),
				$parent		= $el.parents('li'),
				$siblings 	= $parent.siblings('li'),
				target 		= $(this.hash);
				
			$parent.addClass('is-active');
			$siblings.removeClass('is-active');

			
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 500);

			event.preventDefault();			

		});
		
		// Specialisations menu
		// -----------------------------------------------------------
		$cache.content.on('mouseenter', '.js-specialisation-hover', function() {
			var $el 		= $(this),
				$container 	= $('#home-specialisations'),
				data 		= $el.data();
			
			$container.css({
				backgroundColor : '#'+data.color
			});
		});

		// Accordian Menu
		// -----------------------------------------------------------
		$cache.content.on('click', '.js-accordion .accordion__title', function() {
			var $el = $(this),
				$parent = $el.parents('.accordion__item'),
				$siblings = $parent.siblings();
			
			$parent.toggleClass('is-active');
			$siblings.removeClass('is-active');
		
			return false; 
		});



		// Toggle Navigation menu for mobile and Tablet portrait
		// -----------------------------------------------------------
		$cache.header.on('click', '.js-toggle-menu', function() {
			$cache.body.toggleClass('has-navigation-active');
			return false; 
		});
		
		
		// Toggle Search form
		// -----------------------------------------------------------
		$cache.header.on('click', '.js-toggle-search', function() {
			$cache.body.toggleClass('has-search-active');
			return false;
		});
		

		// Back to top
		// -----------------------------------------------------------
		$cache.footer.on('click', '.js-btn-back-to-top', function(event) {
			var target =  $(this.hash);
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 500);

			event.preventDefault();
		});


		// Carousel for news items and brand challenge
		// -----------------------------------------------------------
		$cache.carousel.slick({
			dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			mobileFirst : true,
			prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-chevron-left" aria-hidden="true"></i> </button>',
			nextArrow: '<button type="button" class="slick-next"> <i class="fa fa-chevron-right" aria-hidden="true"></i> </button>',
			responsive: [
			  {
				breakpoint: 480,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1
				}
			  },
			  {
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				  }
			  },
			  {
				breakpoint: 1023,
				settings: "unslick"
			  }
			  // You can unslick at a given breakpoint now by adding:
			  // settings: "unslick"
			  // instead of a settings object
			]
		  });



        // Google maps
        // ------------------------------------------------------------------
        var map = null;
        $('.js-google-map').each(function() {
            // create map
            map = new_map($(this));
        });




        // This function will render a Google Map onto the selected jQuery element
        // ------------------------------------------------------------------
        function new_map($el) {
            // var
            var $markers = $el.find('.marker');

            // vars
            var args = {
                center: new google.maps.LatLng(0, 0),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: false,
                disableDefaultUI: true,
                zoom: 10, 
                styles: [{
                    stylers: [{
                        saturation: -100
                    }]
                }] 
            };
            // create map
            var map = new google.maps.Map($el[0], args);
            // add a markers reference
            map.markers = [];
            // add markers
            $markers.each(function() {
                add_marker($(this), map);
            });
            // center map
            center_map(map);
            // return
            return map;
        }


        // This function will add a marker to the selected Google Map
        // ------------------------------------------------------------------
        function add_marker($marker, map) {
            // var
            var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
            // create marker
            var marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
            // add to array
            map.markers.push(marker);
            // if marker contains HTML, add it to an infoWindow
            if ($marker.html()) {
                // create info window
                var infowindow = new google.maps.InfoWindow({
                    content: $marker.html()
                });
                // show info window when marker is clicked
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });
            }
        }


        // This function will center the map, showing all markers attached to this map
        // ------------------------------------------------------------------
        function center_map(map) {
            // vars
            var bounds = new google.maps.LatLngBounds();
            // loop through all markers and create bounds
            $.each(map.markers, function(i, marker) {
                var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                bounds.extend(latlng);
            });

            // only 1 marker?
            if (map.markers.length == 1) {
                // set center of map
                map.setCenter(bounds.getCenter());
                map.setZoom(14);
            } else {
                // fit to bounds
                map.fitBounds(bounds);
            }
        }


	}
};

(function($) {
	"use strict";
	VEGA.init($);
})(jQuery);