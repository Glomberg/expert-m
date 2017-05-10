function preloader_top( percent ) {
	if (percent < 100) {
		$('.preloader-top > div').css('width', percent + '%');
	} else {
		$('.preloader-top > div').css('width', '100%');
		setTimeout(function(){
			$('.preloader-top > div').fadeOut(300);
		}, 400);
		setTimeout(function(){
			$('.preloader-top > div').removeAttr('style');
		}, 800);
	}
}
function check_mini_cart() {
	// Shake-effect
	var in_action = false;
	if(!in_action) {
		in_action = true;
		$('.header-basket-col .basket .ico').addClass('shake');
		setTimeout(function(){
			$('.header-basket-col .basket .ico').removeClass('shake');
			in_action = false;
		}, 600);
	}
	// Check summ
	var old_val = parseFloat($('.header-basket-col .basket .total-price > span').text());
	var summ = 0;
	var discount_summ = 0;
	
	$('.basket-details-body .item').each(function(){
		if($(this).attr('data-item-price')) {
			var price = parseFloat($(this).attr('data-item-price'));
			var count = parseInt($(this).find('.pcs').text());
			$(this).find('.price > div').html('<div class="normal-price">' + price * count + '</div>');
			summ += price * count;
			if(!(void 0 === $(this).attr('data-item-discount-price'))) {
				var discount_price = parseFloat($(this).attr('data-item-discount-price'));
				discount_summ += discount_price * count;
				$(this).find('.price > div').html('<div class="special-price">' + discount_price * count + '</div><div class="old-price">' + price * count + '</div>');
			} else {
				discount_summ += price * count;
			}
		}
	});
	$('.basket-details-footer .summ span:eq(1)').text(discount_summ);
	
	var i = 1;
	if (interval) {
		clearInterval(interval);
	}
	if ( old_val > discount_summ ) {
		var step = (old_val - discount_summ) / 10;
		var interval = setInterval(function(){
			if (i <= 10) {
				var value = old_val - step * i;
				$('.header-basket-col .basket .total-price > span').html(value.toFixed(2));
			} else {
				clearInterval(interval);
			}
			i++;
		}, 6000 / 100);
	} else {
		var step = (discount_summ - old_val) / 10;
		var interval = setInterval(function(){
			if (i <= 10) {
				var value = old_val + step * i;
				$('.header-basket-col .basket .total-price > span').html(value.toFixed(2));
			} else {
				clearInterval(interval);
			}
			i++;
		}, 6000 / 100);
	}
	//Set the badge
	if ($('.basket-details-body .item[data-item-artikul]').length <= 0) {
		$('.header-basket-col .basket .badge').text('');
	} else {
		$('.header-basket-col .basket .badge').text($('.basket-details-body .item[data-item-artikul]').length);
	}
	//Check shiping
	if ($('.free-shiping').length) {
		if (summ > 500) {
			$('.free-shiping .car .ico').css('width', '100%');
			$('.free-shiping .text').text('Доставка бесплатна.');
			$('.free-shiping .car a').hide();
		} else {
			var free_shiping_left = 500 - summ;
			$('.free-shiping .text span').text(free_shiping_left + 'p.');
			var car_range = 100 - ( free_shiping_left * 100 / 500 );
			$('.free-shiping .car .ico').css('width', car_range + '%');
		}
	}
}
function check_cart() {
	if($('.cart tbody tr').length >= 1) {
		var summ = 0;
		var discount_summ = 0;
		$('.cart tbody tr').each(function(){
			var artikul = $(this).attr('data-item-artikul');
			var price = parseFloat($(this).attr('data-item-price'));
			var count = $(this).find('input').val();
			var count_mini = parseInt($('.basket-details .item[data-item-artikul="' + artikul + '"] .pcs').text());
			if (count != count_mini) {
				$('.basket-details .item[data-item-artikul="' + artikul + '"] .pcs').text(count);
				check_mini_cart();
			}
			$(this).children('td:eq(6)').html('<div class="normal-price"><span>' + price * count + '</span></div>');
			summ += price * count;
			if(!(void 0 === $(this).attr('data-item-discount-price'))) {
				var discount_price = parseFloat($(this).attr('data-item-discount-price'));
				discount_summ += discount_price * count;
				$(this).children('td:eq(6)').html('<div class="special-price"><span>' + discount_price * count + '</span></div><div class="old-price"><span>' + price * count + '</span></div>');
			} else {
				discount_summ += price * count;
			}
		});
		$('.cart .summ > span').text(summ);
		$('.cart .summ2 span > span').text(discount_summ);
	} else {
		$('.cart .summ > span').text(0);
		$('.cart .summ2 span > span').text(0);
	}
}
function rem_from_cart(articul) {
	rem_from_mini_cart(articul);
	var item = $('[data-item-artikul="' + articul + '"]');
	item.css('transform', 'scale(0)');
	setTimeout(function(){
		item.remove();
		check_cart();
	}, 400);
}
function rem_from_mini_cart(articul) {
	var item = $('[data-item-artikul="' + articul + '"]');
	item.slideUp();
	setTimeout(function(){
		item.remove();
		check_mini_cart();
	}, 400);
	if($('.cart').length >= 1) {
		var cart_item = $('[data-item-artikul="' + articul + '"]');
		cart_item.css('transform', 'scale(0)');
		setTimeout(function(){
			cart_item.remove();
			check_cart();
		}, 400);
	}
}
function fix_menu_on() {
	$("header").addClass("fixed");
	$('body').css('padding-top',136);
}
function fix_menu_off() {
	$("header").removeAttr("class");
	$('body').css('padding-top',0);
}

$(document).ready(function(){
	// Preloader top insert
	$('body').prepend('<div class="preloader-top"><div></div></div>');
	// Check mini-cart and cart on load
	if( $('.cart').length >= 1 ) {
		check_cart();
		check_mini_cart();
	} else {
		check_mini_cart();
	}
	// Cloning small-nav for mobile version
	$('.small-nav').clone().addClass('clone').insertAfter('.main-nav');
	$('.small-nav.clone').prepend('<li><a class="underlined" href="#feedback" data-toggle="modal">Написать нам</a></li>');
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
	// To the top button
	$('body').prepend('<div class="to-the-top"></div>');
	$('.to-the-top').on('click', function(){
		$("body,html").animate({scrollTop: 0}, 400);
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
		if($(window).width() > 992 || screen.width > 992) {
			if($(document).scrollTop() > 136) {
				fix_menu_on();
			} else {
				fix_menu_off();
			}
		}
		if($(document).scrollTop() > 400) {
			if(!$('.to-the-top').is(':visible')) {
				$('.to-the-top').fadeIn();
			}
		} else {
			if($('.to-the-top').is(':visible')) {
				$('.to-the-top').fadeOut();
			}
		}
		
	});
	// Mobile menu
	$('.mobile-menu-trigger').on('click', function(){
		if($(window).width() < 480 || screen.width < 480) {
			var left_offset = 250;
		} else {
			var left_offset = 320;
		}
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
				left:left_offset
			},300);
			$('header nav').animate({
				left:0
			},300);
		}
	});
	// Disable .catalog-button
	if($(window).width() < 768 || screen.width < 768) {
		$('.small-nav.clone').show();
	}
	$('.catalog-button').on('click', function(e){
		if($(window).width() < 768 || screen.width < 768) {
			e.preventDefault();
			if(!$('.main-nav').hasClass('open')) {
				$('.main-nav').addClass('open');
				$('.main-nav').slideDown();
			} else {
				$('.main-nav').slideUp();
				setTimeout(function(){
					$('.main-nav').removeClass('open');
				}, 400);
			}
		}
	});		
	$('.main-nav > li > a').on('click', function(e){
		if($(window).width() < 768 || screen.width < 768) {
			e.preventDefault();
			$('.main-nav > li > a').next('ul').slideUp();
			var next_ul = $(this).next('ul');
			if(next_ul.length >= 1) {
				if(next_ul.is(':visible')) {
					next_ul.slideUp();
				} else {
					next_ul.slideDown();
				}
			}
		}
	});
	// Filters open/close
	$('.bx-filter-trigger button').on('click', function(){
		if($('.bx-filter').is(':visible')) {
			$('.bx-filter').slideUp();
		} else {
			$('.bx-filter').slideDown();
		}
	});
	// Move additional nav below goods
	if($('.additional-navigation').length >= 1) {
		if($(window).width() < 480 || screen.width < 480) {
			var block = $('.bx-filter-trigger').parent('.row');
			$('.additional-navigation').insertAfter(block);
		}
	}
	// FancyBox 2
	if($('a.zoom').length) { $('a.zoom').fancybox(); }
	// dotdotdot
	if($(".goods .item .description").length >= 1) { $(".goods .item .description").dotdotdot(); }
	if($('.goods.recent-view .item .title').length >= 1) { $('.goods.recent-view .item .title').dotdotdot(); }
	if($('.blog').length) { $(".dotted").dotdotdot(); }
	//Add to cart function
	$('.to-the-cart').on('click', function(){
		// Это тестовое действие, здесь должен быть запрос к серверу
		$('.basket-details-body > .item:last').clone().appendTo('.basket-details-body');
		//
		preloader_top(100);
		check_mini_cart();
	});
	//Mini-Cart remove item
	$('.basket-details-body').on('click', '.item .remove a', function(e){
		e.preventDefault();
		rem_from_mini_cart($(this).parent().parent('.item').attr('data-item-artikul'));
	});
	//Cart-page remove item
	$('.trash').on('click', function(e){
		e.preventDefault();
		rem_from_cart($(this).parent().parent('tr').attr('data-item-artikul'));
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
		if($(window).width() > 768 || screen.width > 768) {
			$('.product-images .main-image img').elevateZoom({
				zoomWindowWidth:440,
				zoomWindowHeight:430,
				borderSize:2,
				borderColour:'#BECAD3'
			});
		}
		$('.product-images .mini-image').on('click', function(){
			$('.product-images .mini-image').removeClass('active');
			$(this).addClass('active');
			select_the_image();
			if($(window).width() > 768 || screen.width > 768) {
				$('.product-images .main-image img').data('elevateZoom').swaptheimage($('.product-images .mini-images .active img').attr('src'), $('.product-images .mini-images .active img').attr('src'));
			}
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
			check_cart();
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
	function check_review_rating() {
		if( $('.stars').length >= 1 ) {
			$('.stars').each(function(){
				if($(this).find('div').length >= 1) {
					//this star rating already initialized
				} else {
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
				}
			});
		}
	}
	check_review_rating();
	
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
	// Swipe
	$(".cart table tr").swipe({
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left' || direction == 'right') {
				if($(this).hasClass('swiped')) {
					$(this).removeClass('swiped');
				} else {
					$(this).addClass('swiped');
				}
			}
		}
	});
	$('header nav').swipe({
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') {
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
				}
				console.log('swiped');
			}
		}
	});
	/*$(document).on('swipeleft', function(){
		if($('body').hasClass('.mobile-menu-on')) {
			fix_menu_off();
			console.log('swiped');
		}
		
	});*/
	
	// Masonry
	$('.main-nav > li > ul').masonry({
		itemSelector: '.main-nav > li > ul > li',
		columnWidth: '.main-nav > li > ul > li',
		percentPosition: true,
		containerStyle: null
	});
	
	$('.catalog-text-category').masonry({
		itemSelector: '.catalog-text-category ul',
		columnWidth: '.catalog-text-category ul',
		percentPosition: true
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
	
	/* Код ниже написан для тестирования и комментариев к функциям. */
	/* На продакшене удалить                                        */
	
	// Используйте функцию preloader_top( percent ) для прелоддера вверху во время обработки ajax запросов.
	// Самый простой вызов это
	// preloader_top(100); - Прелоддер пробежит от 0 до 100 за 0,4 сек.
	// Можно запускать функцию во время выполнения запроса, как только вам становится известен % выполнения
	var test_count = 1;
	var test_preloader_interval = setInterval(function(){
		if (test_count > 4) { clearInterval(test_preloader_interval); }
		preloader_top(test_count * 20);
		test_count++;
	}, 1000);	
	
	// AJAX reviews adding 
	$('.reviews .pager a').on('click', function(){
		$('.reviews .pager').hide(); // Перед отправкой скрываем кнопку и отображаем прелоддер
		$('.reviews .loader').show();
		$.ajax({
			url : 'additional-reviews',
			dataType : 'html',
			success : function(data){
				var new_element = $('.reviews ul').append('<li></li>'); // После получения создаем новые элементы списка
				$('.reviews ul li:last').append(data).hide().fadeIn();  // плавное появление
				check_review_rating();                                  // проставляем нужное количество звездочек
				setTimeout(function(){
					$('.reviews .loader').hide();                        // убираем прелоддер и возвращаем кнопку обратно
					$('.reviews .pager').show();
				}, 500);
			}
		});
	});
	
});