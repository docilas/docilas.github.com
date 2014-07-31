$(document).ready(function(){
	
	/*gallery*/ 
	$('.room_gallery').each(function() { // the containers for all your galleries
		$(this).magnificPopup({
			delegate: 'a', // the selector for gallery item
			type: 'image',
			gallery: {
			  enabled:true
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title');
				}
			}
		});
	}); 
	
	/*room info*/
	$('.link-to-roominfo').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	
});