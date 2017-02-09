function fix_menu_on() {
	$("header nav").addClass("fixed");
	$("header").css("padding-bottom", "71px");
}
function fix_menu_off() {
	$("header nav").removeAttr("class");
	$("header").removeAttr("style");
}

$(document).ready(function(){
	// Sticky menu
	if($(document).scrollTop() > 115) {
		fix_menu_on()
	} else {
		fix_menu_off()
	}
	$(window).scroll(function(){
		if($(document).scrollTop() > 115) {
			fix_menu_on()
		} else {
			fix_menu_off()
		}
	});
	// dotdotdot
    $(".goods .item .description").dotdotdot();
});