$('#input0').click(function() {
 if($("select#input0 :selected").val() == "rus") {
    $("select#input0").attr('style', 'background-image:url(images/svg/lang-ru.svg);');
 }
 if($("select#input0 :selected").val() == "eng") {
    $("select#input0").attr('style', 'background-image:url(images/svg/lang-us.svg);');
 }
    console.log('select color: '+$("select#input0 :selected").val());
	
});

$('#input1').click(function() {
	if($("select#input1 :selected").val() == "bit") {
		 $("select#input1").attr('style', 'background-image:url(images/svg/bitcoin.svg);');
	}
	if($("select#input1 :selected").val() == "eth") {
		 $("select#input1").attr('style', 'background-image:url(images/svg/ethereum.svg);');
	}
	if($("select#input1 :selected").val() == "dog") {
		$("select#input1").attr('style', 'background-image:url(images/svg/dogecoin.svg);');
 }
		 console.log('select color: '+$("select#input1 :selected").val());
});
 
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

var owl = $('.owl-carousel');
owl.owlCarousel({
    items:3,
    loop:true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
});