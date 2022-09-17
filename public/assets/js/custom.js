(function () {
  "use strict";
  ///--------------------------------------------------------------
 

  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 160) {
      $('.main-hd').stop().addClass('stic ');
	//$('.main-hd').stop().addClass('animated');
	//$('.main-hd').stop().addClass('slideInDown');	
			$('.navbar-brand').stop().addClass('animated');
	//$('.navbar-brand').stop().css({"width": "70"});
	//$('.navbar-brand').stop().css({"height": "70"});
    } else {
      $('.main-hd').stop().removeClass('stic ');
		//$('.main-hd').stop().removeClass('animated');
	//$('.main-hd').stop().removeClass('slideInDown');
		//$('.navbar-brand').stop().css('width', 'auto').removeClass('animated');
		//$('.navbar-brand').stop().css('width', 'auto');
    }
    //if (scrollTop > 800) {
    //  $('#toparrow').css('display', 'block');
    // } else {animated slideInDown
    //     $('#toparrow').css('display', 'none');
    // }
  });

  $(document).ready(function () {
    $(".bt-menu").click(function (e) {
      e.preventDefault();
      $(".my-menu").animate({
        width: "toggle"
      });
      $('.mOverlay').addClass('active');
      $('.bt-menu').addClass('open');
      //$( "<div class='topbtn-click'></div>" ).prependTo( ".navbar > .container-fluid" );

    });
    $(".mOverlay").click(function (e) {
      e.preventDefault();
      $('.mOverlay').removeClass('active');
      $('.bt-menu').removeClass('open');
      $(".my-menu").animate({
        width: "toggle"
      });
    });

    $('li.dropdown').hover(function () {
      $(this).find('.dropdown-menu').stop(true, true).delay(100).slideDown(800);
      }, function () {
      $(this).find('.dropdown-menu').stop(true, true).delay(1).slideUp(200);
    });

  });
  
 

  ///--------------------------------------------------------	
})();


	
  


