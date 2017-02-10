function fix_menu_on() {
	$("header nav").addClass("fixed");
	$("header").css("padding-bottom", "71px");
}
function fix_menu_off() {
	$("header nav").removeAttr("class");
	$("header").removeAttr("style");
}

$(document).ready(function(){
	// Animate placeholders
	if ($('.animated-placeholder').length >= 1) {
		var hidden_styles = {'opacity': '0', 'left': '-65px'};
		$('*[placeholder]').each(function(){
			if ($(this).next().is('label')) {
				if(!$(this).val() == '') {
					$(this).next().css(hidden_styles);
				}
				$(this).next().text($(this).attr('placeholder'));
				$(this).attr('placeholder', '');
			}
		});
		$('.animated-placeholder input, .animated-placeholder textarea').focus(function(){
			$(this).next().css(hidden_styles);
		}).blur(function(){
			if($(this).val() == '') {
				$(this).next().removeAttr('style');
			}
		});
	}
	// Mini-Cart opener
	$('.header-basket-col .basket').on('click', function(){
		if($('.header-basket-col .basket-details').is(':visible')) {
			$('.header-basket-col .basket-details').slideUp();
		} else {
			$('.header-basket-col .basket-details').slideDown();
			if($(".basket-details-body .item .title").length >= 1) { $(".basket-details-body .item .title").dotdotdot(); }
		}
	});
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
	if($(".goods .item .description").length >= 1) { $(".goods .item .description").dotdotdot(); }
	//Mini-Cart remove item
	$('.basket-details-body .item .remove a').on('click', function(e){
		e.preventDefault();
		$(this).parent().parent('.item').slideUp();
	});
});