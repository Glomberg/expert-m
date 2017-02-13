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
	// Waves buttons
	Waves.init();
	Waves.attach(".to-the-cart", [
		"waves-button"
	]);
	// jQuery UI slider
	if($('.bx-ui-slider-track').length >= 1) {
		var slider_min_value = parseInt($('#min-cost').val());
		var slider_max_value = parseInt($('#max-cost').val());
		$('.bx-ui-slider-track').slider({
			range: true,
			animate: true,
			min: slider_min_value,
			max: slider_max_value,
			values: [slider_min_value, slider_max_value],
			slide: function( event, ui ) {
				$('#min-cost').val(ui.values[ 0 ]);
				$('#max-cost').val(ui.values[ 1 ])
			}
		});
		$("input#min-cost").change(function(){
			var value1=$("input#min-cost").val();
			var value2=$("input#max-cost").val();
			if(parseInt(value1) > parseInt(value2)){
				value1 = value2;
				$("input#min-cost").val(value1);
			}
			$(".bx-ui-slider-track").slider("values",0,value1);	
		});
		$("input#max-cost").change(function(){
			var value1=$("input#min-cost").val();
			var value2=$("input#max-cost").val();
			if (value2 > 1000) { value2 = 1000; $("input#max-cost").val(1000)}
			if(parseInt(value1) > parseInt(value2)){
				value2 = value1;
				$("input#max-cost").val(value2);
			}
			$(".bx-ui-slider-track").slider("values",1,value2);
		});
	}
});