var BLSA = {
	init : function($) {
		"use strict";


        var $cache = { 
            body: 		$('body'),
            navigation: $("#site-navigation"),
            header:		$("#site-header"),  
            content: 	$('#site-content'), 
            footer: 	$('#site-footer')
        };


		$('.js-masonry__grid').masonry({
			// set itemSelector so .grid-sizer is not used in layout
			itemSelector: '.masonry__item',
			// use element for option
			columnWidth: '.masonry__item-sizer',
			percentPosition: true
		});


		$(window).scroll(function() {
			var scrollposition = $(window).scrollTop();
 
			if(scrollposition > 400) {
				$cache.body.addClass('has-reduced-menu');
			} else {
				$cache.body.removeClass('has-reduced-menu');
			}
		});


		$cache.body.on('click', '.js-btn-back-to-top', function(event) {
			var target =  $(this.hash);
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 500);

			event.preventDefault();
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
	BLSA.init($);
})(jQuery);
