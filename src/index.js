import 'bootstrap';
import "./../static/styles/styles.scss";
import "./../static/styles/_adaptiv.scss";
import '../node_modules/animate.css';

$(document).ready(function(){
	
$.fn.animate_Text_first = function() {
  	let string = this.text();
  	return this.each(function(){
	   	let $this = $(this);
	   	$this.html(string.replace(/./g, '<span class="add_span">$&</span>'));
	   	$this.find('span.add_span').each(function(i, el){
	    	setTimeout(function(){ $(el).addClass('div_opacity').css({'text-align': 'center'})}, 40 * i);
	   	});
  	});
};
 $('.first_anim').show();
 $('.first_anim').animate_Text_first();

$('.second_anim').delay(1500).show('slow', function() {
    $(this).css({'opacity': 1, 'visibility': 'visible'});
  });
});
$(document).ready(function(){

	$('input#name, input#email, textarea#message').unbind().blur(function(){

		let id = $(this).attr('id'),
			val = $(this).val();

		switch(id) {
			case 'name':
				let rv_name = /^[a-zA-Zа-яА-Я]+$/; // используем регулярное выражение

				if(val.length > 2 && val != '' && rv_name.test(val)) {
					$(this).removeClass('error').addClass('not_error');
					$(this).popover('hide');
				}
				else {
					$(this).removeClass('not_error').addClass('error').attr('title', 'Ошибка!').attr('data-placement','top');
					$(this).attr('data-content', 'поле "Имя" обязательно для заполнения, длина имени должна составлять не менее 2 символов, поле должно содержать только русские или латинские буквы').attr('data-toggle', 'popover');
					$(this).popover('show');	
				}	
			break;
				
			case 'email':
				let rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

				if(val != '' && rv_email.test(val)) {
					$(this).removeClass('error').addClass('not_error');
					$(this).popover('hide');
				}
				else {
					$(this).removeClass('not_error').addClass('error').attr('title','Ошибка!').attr('data-placement','top');
					$(this).attr('data-content', 'поле "Email" обязательно для заполнения, поле должно содержать правильный email-адрес').attr('data', 'popover');
					$(this).popover('show');
				}	
			break;

			case 'message':
				if(val != '' && val.length < 5000) {
					$(this).removeClass('error').addClass('not_error');
					$(this).popover('hide');
				}
				else {
					$(this).removeClass('not_error').addClass('error').attr('title','Ошибка!').attr('data-placement','bottom');
					$(this).attr('data-content', 'поле "Текст письма" обязательно для заполнения').attr('data-toggle', 'popover');
					$(this).popover('show');
				}	
			break;


		} // end switch(...)

	}); // end blur()

// отправка письма с помощью AJAX
	$('#submit').submit(function(e){
		e.preventDefault();
		if($('.not_error').length == 3) {
			$.ajax({
				url: 'send.php',
				type: 'post',
				data: $(this).serialize(),

				beforeSend: function(xhr, textStatus){ 
					$('#submit').attr('disabled','disabled');
				},

				success: function(response){
					$('#submit').removeAttr('disabled');
					$('#submit').val('').removeClass().next('.error-box').text('');
					alert(response);
				}
			}); // end ajax({...})
		}
	// останавливает отправку сообщения в невалидной форме если кол-во полей с классом не равно 3
		else {
			return false;
		}

	}); // end submit()

});
