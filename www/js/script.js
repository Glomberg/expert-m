﻿function fix_menu_on() {
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
	// Masked input
	//$('.modal input[type="tel"]').mask("+7(999)999-9999");
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
	// Zoom and Image change
	if($('.product-images .mini-images').length >= 1) {
		$('.product-images .mini-images > div:eq(0)').addClass('active');
		function select_the_image() {
			var image_src = $('.product-images .mini-images .active img').attr('src');
			$('.product-images .main-image').css('background-image', 'url(' + image_src + ')');
			$('.product-images .main-image img').attr('src', image_src).attr('data-zoom-image', image_src);
		}
		select_the_image();
		$('.product-images .main-image img').elevateZoom({
				zoomWindowWidth:440,
				zoomWindowHeight:430,
				borderSize:2,
				borderColour:'#BECAD3'
			});
		$('.product-images .mini-image').on('click', function(){
			$('.product-images .mini-image').removeClass('active');
			$(this).addClass('active');
			select_the_image();
			$('.product-images .main-image img').data('elevateZoom').swaptheimage($('.product-images .mini-images .active img').attr('src'), $('.product-images .mini-images .active img').attr('src'));
		});
	}
	// input[type="number"] customization
	if($('#product-count-input').length >= 1) {
		var min_value = parseInt($('#product-count-input').attr('min'));
		var max_value = parseInt($('#product-count-input').attr('max'));
		var current_value = $('#product-count-input').val();
		$('#product-count-input').after('<input id="product-count-input-clone" type="text" data-min-value="' + min_value + '" data-max-value="' + max_value + '" />');
		$('#product-count-input-clone').val(current_value);
		$('#product-count-input-clone').after('<div id="product-count-increment"></div><div id="product-count-decrement"></div>');
		function check_product_cout() {
			if ($('#product-count-input-clone').val() < min_value) {
				$('#product-count-input-clone').val(min_value);
				$('#product-count-input').val(min_value);
			} else if ($('#product-count-input-clone').val() > max_value) {
				$('#product-count-input-clone').val(max_value);
				$('#product-count-input').val(max_value);
			} else {
				$('#product-count-input').val($('#product-count-input-clone').val());
			}
		}
		$('#product-count-input-clone').on('keyup, change', function(){
			check_product_cout();
		});
		$('#product-count-increment').on('click', function(){
			$('#product-count-input-clone').val(parseInt($('#product-count-input-clone').val()) + 1);
			check_product_cout();
		});
		$('#product-count-decrement').on('click', function(){
			$('#product-count-input-clone').val(parseInt($('#product-count-input-clone').val()) - 1);
			check_product_cout();
		});
	}
	// Stars raiting
	if( $('.stars').length >= 1 ) {
		$('.stars').each(function(){
			if($(this).attr('data-stars-count')) {
				var stars_count = parseInt($(this).attr('data-stars-count'));
				if (stars_count < 0 || stars_count > 5) {
					console.log('"data-stars-count" attribute must be 1-5');
				} else {
					for(var i = 1; i <= 5; i++) {
						if(i <= stars_count) {
							$(this).append('<div class="active"></div>');
						} else {
							$(this).append('<div></div>');
						}
					}
				}
			} else {
				console.log('"data-stars-count" attribute not exists');
			}
		});
	}
});