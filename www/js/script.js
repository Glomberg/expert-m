function fix_menu_on() {
	$("header").addClass("fixed");
	$('body').css('padding-top',136);
}
function fix_menu_off() {
	$("header").removeAttr("class");
	$('body').css('padding-top',0);
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
		$('*[placeholder]').focus(function(){
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
	$(document).click( function(event){
		if($('.header-basket-col .basket-details').is(':visible')) {
			if( $(event.target).closest('.basket-details, .basket').length ) return;
			$('.header-basket-col .basket-details').slideUp();
			event.stopPropagation();
		}
	});
	// Sticky menu
	if ($(window).width() > 768 || screen.width > 768) {
		if($(document).scrollTop() > 136) {
			fix_menu_on();
		} else {
			fix_menu_off();
		}
	}
	$(window).scroll(function(){
		if($(window).width() > 768 || screen.width > 768) {
			if($(document).scrollTop() > 136) {
				fix_menu_on();
			} else {
				fix_menu_off();
			}
		}
	});
	// Mobile menu
	$('.mobile-menu-trigger').on('click', function(){
		if($('body').hasClass('mobile-menu-on')) {
			$('body').animate({
				left:0
			},300);
			$('header nav').animate({
				left:-320
			},300);
			setTimeout(function(){
				$('body').removeClass('mobile-menu-on');
			},300);
		} else {
			$('body').addClass('mobile-menu-on');
			$('body').animate({
				left:320
			},300);
			$('header nav').animate({
				left:0
			},300);
		}
	});
	// FancyBox 2
	if($('a.zoom').length) { $('a.zoom').fancybox(); }
	// dotdotdot
	if($(".goods .item .description").length >= 1) { $(".goods .item .description").dotdotdot(); }
	if($('.blog').length) { $(".dotted").dotdotdot(); }
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
			if(parseInt(value1) > parseInt(value2)){
				value2 = value1;
				$("input#max-cost").val(value2);
			}
			$(".bx-ui-slider-track").slider("values",1,value2);
		});
		$('#del_filter').on('click', function() {
			$('.bx-ui-slider-track').slider("values", 0, slider_min_value);
			$('.bx-ui-slider-track').slider("values", 1, slider_max_value);
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
	if($('.count input[type="number"]').length >= 1) {
		$('.count input[type="number"]').each(function(){
			var min_value = parseInt($(this).attr('min'));
			var max_value = parseInt($(this).attr('max'));
			var current_value = $(this).val();
			var input_id = $(this).attr('id');
			$(this).after('<input id="' +input_id + '-clone" type="text" data-min-value="' + min_value + '" data-max-value="' + max_value + '" />');
			$('#' +input_id + '-clone').val(current_value);
			$('#' +input_id + '-clone').after('<div class="product-count-increment"></div><div class="product-count-decrement"></div>');
			
		});
		function check_product_count(id) {
			var min_value = parseInt($('#'+ id).siblings('input[type="number"]').attr('min'));
			var max_value = parseInt($('#'+ id).siblings('input[type="number"]').attr('max'));;
			if ($('#'+ id).val() < min_value) {
				$('#'+ id).val(min_value);
				$('#'+ id).siblings('input[type="number"]').val(min_value);
			} else if ($('#'+ id).val() > max_value) {
				$('#'+ id).val(max_value);
				$('#'+ id).siblings('input[type="number"]').val(max_value);
			} else {
				$('#'+ id).siblings('input[type="number"]').val($('#'+ id).val());
			}
		}
		$('.count input[type="text"]').on('keyup, change', function(){
			if($(this).val().search(/[^0-9]/) == 0) {
				$(this).val(1);
			} else if ($(this).val().search(/[^0-9]/) == 1) {
				if(parseInt($(this).val()) == 0) {
					$(this).val(1);
				} else {
					$(this).val(parseInt($(this).val()));
				}
			} 
			else {
				check_product_count($(this).attr('id'));
			}
			
		});
		$('.product-count-increment').on('click', function(){
			$(this).siblings('input[type="text"]').val(parseInt($(this).siblings('input[type="text"]').val()) + 1);
			check_product_count($(this).siblings('input[type="text"]').attr('id'));
		});
		$('.product-count-decrement').on('click', function(){
			$(this).siblings('input[type="text"]').val(parseInt($(this).siblings('input[type="text"]').val()) - 1);
			check_product_count($(this).siblings('input[type="text"]').attr('id'));
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
	// Datepicker
	if($("#datepicker").length >= 1) {
		$.datepicker.regional['ru'] = {
			closeText: 'Закрыть',
			prevText: '&#x3c;Пред',
			nextText: 'След&#x3e;',
			currentText: 'Сегодня',
			monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
			'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
			monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
			'Июл','Авг','Сен','Окт','Ноя','Дек'],
			dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
			dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
			dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
			weekHeader: 'Нед',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''};
		$.datepicker.setDefaults($.datepicker.regional['ru']);
		$("#datepicker").datepicker($.extend({
			showOn: "button",
			buttonImage: "images/calendar.png",
			buttonImageOnly: true,
			buttonText: "Выберите дату"
		},$.datepicker.regional['ru']));
	}
	//jScrollPane
	$('#select-outpost').on('click', function(){
		$('#select-outpost-modal').modal('show');
		setTimeout(function(){
			$('.scroll-pane').jScrollPane({
				contentWidth: '0px'
			});
		},400);
	});
	// Yandex MAP
	if($('#map').length >= 1) {
		var adress = [];
		var shop_count = $('label.shop').length;
		for(var j = 0; j < shop_count; j++) {
			var coord_1 = parseFloat($('label.shop:eq(' + j + ')').attr('data-outpost-coordinate-n'));
			var coord_2 = parseFloat($('label.shop:eq(' + j + ')').attr('data-outpost-coordinate-e'));
			var key = j + 1;
			adress['shop' + key] = [coord_1, coord_2];
		}
		ymaps.ready(init);
		function init() {
			var myMap;     
			myMap = new ymaps.Map ("map", {
				center: adress['shop1'],
				zoom: 15
			});
			//метки на карте
			for(var j = 0; j < shop_count; j++) {
				var key = j + 1;
				var title = $('label.shop:eq(' + j + ')').find('.outpost-title').html();
				var placemark = 'myPlacemark' + key;
				placemark = new ymaps.Placemark(adress['shop' + key], {
					hintContent: title,
					balloonContent: title
				}, {
					iconLayout: 'default#image'
				});
				myMap.geoObjects.add(placemark);
			}
			$('.show-on-the-map').on('click', function(e){
				e.preventDefault();
				for(var j = 0; j < shop_count; j++) {
					if($('label.shop:eq(' + j + ')').siblings('input').is(':checked')) {
						var key = j + 1;
						myMap.panTo(adress['shop' + key], {
							flying: 1
						});
					}
				}
			});
			$('.outpost-checkbox-item').on('click', function(e){
				for(var j = 0; j < shop_count; j++) {
					if($('label.shop:eq(' + j + ')').siblings('input').is(':checked')) {
						var key = j + 1;
						myMap.panTo(adress['shop' + key], {
							flying: 1
						});
					}
				}
			});
		}
	}
});