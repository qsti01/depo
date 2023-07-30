// СМЕНА ЯЗЫКА
$(document).ready(function() {
  $('.select__header').on('click', selectToggle);
  $('.select__item').on('click', selectChoose);

  function selectToggle() {
    $(this).parent().toggleClass('is-active');
  }

  function selectChoose() {
    var imgSrc = $(this).find('img').attr('src');
    var text = $(this).find('.lang-ru').text();
    var select = $(this).closest('.select');
    var currentImg = select.find('.select__current img');
    var currentText = select.find('.select__current .lang-ru');

    currentImg.attr('src', imgSrc);
    currentText.text(text);
    select.removeClass('is-active');
  }
});


// СМЕНА МЕТОДА ОПЛАТЫ
$(document).ready(function() {
  $('.pay-select__header').on('click', selectToggle);
  $('.pay-select__item').on('click', selectChoose);

  function selectToggle() {
    $(this).parent().toggleClass('is-active');
  }

  function selectChoose() {
    var imgSrc = $(this).find('img').attr('src');
    var text = $(this).find('.pay-select_value').text();
    var select = $(this).closest('.pay-select-data');
    var currentImg = select.find('.pay-select__current img');
    var currentText = select.find('.pay-select__current .pay-select_value');

    currentImg.attr('src', imgSrc);
    currentText.text(text);
    select.removeClass('is-active');
  }
});



// FAQ
$('.question').click(function() {
	$(this).find('.qacontent').toggle(200); //скрытие, показ ответа
	$(this).find('.qa-plus').attr("src","images/svg/Add_Plus.svg");
	if ($(this).hasClass('open')) {
	$(this).removeClass('open');
	} else {
	$(this).addClass('open');
	$(this).find('.qa-plus').attr("src","images/svg/Remove_Minus.svg");
	};
	
}); 

// Модальное окно
// открыть по кнопке
$('.js-button-campaign').click(function() { 
	
	$('.js-overlay-campaign').fadeIn();
	$('.js-overlay-campaign').addClass('disabled');
});
// закрыть на крестик
$('.js-close-campaign').click(function() { 
	$('.js-overlay-campaign').fadeOut();
	
});
// закрыть по клику вне окна
$(document).mouseup(function (e) { 
	var popup = $('.js-popup-campaign');
	if (e.target!=popup[0]&&popup.has(e.target).length === 0){
		$('.js-overlay-campaign').fadeOut();
		
	}
});



// ДВИЖЕНИЕ МОНЕТОК

let coin1 = document.querySelector('.coin1');
let coin2 = document.querySelector('.coin2');
let coin3 = document.querySelector('.coin3');

document.onmousemove = (e)=>{
	let x = e.clientX / window.innerWidth;
	let y = e.clientY / window.innerHeight;

	coin1.style.transform = "translate(-" + x * 20 + "px, -" + y * 30 + "px)";
	coin2.style.transform = "translate(-" + x * 40 + "px, -" + y * 60 + "px)";
	coin3.style.transform = "translate(-" + x * 30 + "px, -" + y * 50 + "px)";
	
};
// КАРУСЕЛЬ
var owl = $('.owl-carousel');
owl.owlCarousel({
    items:3,
    loop:true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
});



// НАВИГАЦИЯ
let sections = $('section'), 
nav = $('nav'), 
nav_height = nav.outerHeight();
$(window).on('scroll', function () {
    $('nav a').removeClass('active');
    let cur_pos = $(this).scrollTop(); 
    sections.each(function() {
        let top = $(this).offset().top - nav_height - 180,
        bottom = top + $(this).outerHeight();       
        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');    
            $(this).addClass('active');
            nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        }
    });
});
nav.find('a').on('click', function () {
    let $el = $(this), 
    id = $el.attr('href'); 
    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 600);
    return false;
});

// КУРС БИТКА 
function updateCryptoCourse() {
  var cryptoType = $('.value-type').text().toLowerCase();
  var apiUrl;

  if (cryptoType === 'bitcoin') {
    apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
  } else if (cryptoType === 'ethereum') {
    apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
  } else if (cryptoType === 'dogecoin') {
    apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd';
  } else {
    console.error('Неподдерживаемый тип криптовалюты.');
    return;
  }

  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function(responseData) {
      var cryptoCourse = responseData[cryptoType]['usd'];
      var cryptoCourseElement = $('.crypto-course');

      if (cryptoCourseElement.length > 0) {
        cryptoCourseElement.text('$' + cryptoCourse.toFixed(2));
      }
    },
    error: function() {
      console.error('Не удалось получить данные о курсе ' + cryptoType + '.');
    }
  });
}

$(document).ready(function() {
  // Выполняем обновление информации о курсе криптовалюты при загрузке страницы и каждые 24 часа
  updateCryptoCourse();
  setInterval(updateCryptoCourse, 24 * 60 * 60 * 1000); // 24 часа = 24 * 60 * 60 * 1000 миллисекунд

  // Обновляем курс криптовалюты при клике на элементы выбора
  $('.pay-select__item').on('click', function() {
    var currency = $(this).find('.pay-select_value').text();
    $('.value-type').text(currency);
    updateCryptoCourse();
  });
});


// КОНВЕРТОР 
$(document).ready(function() {
	var isBit = true; // Флаг для определения текущего состояния (true - биткоин, false - другая валюта)

	function updateCryptoSymbol(symbol) {
		$('.input_money .cal_value').text(symbol);
	}

	// Обработчик нажатия на кнопку "Конвертировать"
	$('.convert').click(function() {
		var amount = parseFloat($('.input_money input').val());
		var cryptoCourse = parseFloat($('.crypto-course').text().replace('$', ''));

		if (!isNaN(amount) && !isNaN(cryptoCourse)) {
			if (isBit) {
				var convertedAmount = (amount * cryptoCourse).toFixed(2);
				if ($('.input_money .cal_value').text() !== '$') {
					updateCryptoSymbol('$'); // Здесь устанавливаем значок доллара, если текущий значок не доллар
				}
				$('.input_money input').val(convertedAmount);
			} else {
				var convertedAmount = (amount / cryptoCourse).toFixed(8);
				var currencyType = $('.value-type').text().toLowerCase();
				updateCryptoSymbol(currencyType.charAt(0).toUpperCase()); // Устанавливаем первую букву типа криптовалюты (например, E для Ethereum)
				$('.input_money input').val(convertedAmount);
			}

			isBit = !isBit; // Инвертируем значение флага
		}
	});

	// Обновляем символ криптовалюты при клике на элементы выбора
	$('.pay-select__item').on('click', function() {
		var currency = $(this).find('.pay-select_value').text();
		$('.value-type').text(currency);
		if ($('.input_money .cal_value').text() !== '$') {
			updateCryptoSymbol(currency.charAt(0).toUpperCase());
		}
		isBit = currency.toLowerCase() === 'bitcoin';
	});
});

// BURGER
$('.burger-open').click(function() { 
	
	$('.js-burger-overlay-campaign').fadeIn();
	$('.js-burger-overlay-campaign').addClass('disabled');
});
// закрыть на крестик
$('.js-burger-close-campaign').click(function() { 
	$('.js-burger-overlay-campaign').fadeOut();
	
});
// закрыть по клику вне окна
$(document).mouseup(function (e) { 
	var popup = $('.js-burger-popup-campaign');
	if (e.target!=popup[0]&&popup.has(e.target).length === 0){
		$('.js-burger-overlay-campaign').fadeOut();
	}
});

// КАРУСЕЛЬ
var owl2 = $('.owl-carousel-2');
owl2.owlCarousel({
	nav: false,
	loop: true,
	margin: 30,
	dots: true,
	autoplay: true,
	autoplaySpeed: 2200,
	autoplayTimeout: 2200,
	autoplayHoverPause: true,
	slideTransition: 'linear',
	items: 4,
});

