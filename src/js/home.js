$(function(){
	$("#toggle-menu").on("click",function(){
		$("#menu").toggleClass("open");
	});
	$(".in-page").on("click",function(){
		$("#menu").removeClass("open");
	});
	$('.in-page').on('click',function (e) {
		e.preventDefault();
	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 600, 'swing', function () {
	        window.location.hash = target;
	    });
	});
	
});