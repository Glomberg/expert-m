$(document).ready(function(){
	// Sticky menu
	$(window).scroll(function(){
		if($(document).scrollTop() > 115) {
			$("header nav").addClass("fixed");
			$("header").css("padding-bottom", "71px");
		} else {
			$("header nav").removeAttr("class");
			$("header").removeAttr("style");
		}
	});
});