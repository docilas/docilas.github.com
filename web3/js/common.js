$(document).ready(function(){
	
	//hover function
	$( "*[hov]" ).hover(function(){$(this).fadeTo(100,$(this).attr('hov'));},function(){$(this).fadeTo(100,1)});		
	
	/*royalslider*/
  	$('#full-width-slider').royalSlider({
    arrowsNav: true,
    loop: false,
    keyboardNavEnabled: true,
    controlsInside: false,
    imageScaleMode: 'fill',
	arrowsNav:false,
    arrowsNavAutoHide: false,
    autoScaleSlider: true, 
    autoScaleSliderWidth: 960,     
    autoScaleSliderHeight: 440,
    controlNavigation: 'bullets',
    thumbsFitInViewport: false,
    navigateByClick: true,
    startSlideId: 0,
    autoPlay: {
    		// autoplay options go gere
    		enabled: true,
    		pauseOnHover: true,
			delay:3200
    	},
    transitionType:'fade',
    globalCaption: false,
    deeplinking: {
      enabled: true,
      change: false
    	},
    /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
	});

    $(window).scroll(function() {     

      if ($(this).scrollTop() >= 613) {
           $('.menu').addClass('fix');
           $('.top_logo').addClass('fix');
      } else {
           $('.menu').removeClass('fix');
           $('.top_logo').removeClass('fix');
      }

    });

    //Setting up the map
    $('#map').tinyMap({
      'center': '970花蓮市福建街512號',
      'zoom': 15,      
      marker: [
            {
                addr: '970 花蓮市福建街512號',
                text: '良友精緻飯店',
                markerFitBounds: true,

            },            
      ] 

    });


    // scrolling smooth by click a 
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 50
          }, 700);
          return false;
        }
      }
    });


});
