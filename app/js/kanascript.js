Modernizr.load([
            {
            load:'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js',
            complete: function()
                {if ( !window.jQuery ) {
                        Modernizr.load('assets/js/vendor/jquery-1.10.1.min.js');}
                }
            },
            {
				test: Modernizr.fontface,
				both: 'assets/css/style.css'
            },
            {
				test: Modernizr.input.required,
				both: 'assets/js/vendor/jquery.validate.min.js' }
]);


$(document).ready(function() {

	"use strict";

	/* this function returns card type  */
	function creditCardType( cardNumber)
	{
		var amexReg = /^3[47][0-9]{13}$/,
			visaReg = /^4[0-9]{12}(?:[0-9]{3})?$/,
			masterReg = /^5[1-5][0-9]{14}$/,
			discoverReg = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

			if (amexReg.test(cardNumber))
			{ return 'amex' ;
			}
			else if (visaReg.test(cardNumber))
			{
				return 'visa';
			}
			else if (discoverReg.test(cardNumber))
			{
				return 'discover';
			}
			else if (masterReg.test(cardNumber))
			{
				return 'master';
			}
			else
			{
				return "invalidCardType";
			}

	}

	function changeLock( status)
	{
		switch(status){
			case 'neutual': 
				$('#lock').removeClass();
				break;
			case 'pass':
				$('#lock').removeClass('notPass').addClass('pass');		
				break;
			case 'notPass':
				$('#lock').removeClass('pass').addClass('notPass');
				break;
			default:
				break;
			}
	}

	
	function validateSecCode(event){
		var codeLength = $('#securityCode').val().length;
		var cardType = event.data.name;

		if (cardType == 'amex'){
			if (codeLength === 4) {
				changeLock('pass');	
			}
			else
			{
				changeLock('notPass');
				$('#securityCode').removeClass().addClass('error');
			}
		}else if (codeLength === 3){
				changeLock('pass');		
			
		}else
		{
			changeLock('notPass');
			$('#securityCode').removeClass().addClass('error');
		}
	}



	$('#monthList').blur(function(){
		if ($(this).val() == 'month')
		{	
			changeLock('notPass');
			$(this).removeClass().addClass('error');
		}
		else
		{
			changeLock('neutual');
		}
	});

	$('#yearList').blur(function(){
		if ($(this).val() == 'year')
		{
			changeLock('notPass');
			$(this).removeClass().addClass('error');
		}
		else
		{
			changeLock('neutual');
		}
	});



	$("#cardNumber").blur(function(){

		var cardNumber = $('#cardNumber').val(), 
			cardType = creditCardType(cardNumber);

		$(this).removeClass();

		switch(cardType){
			case 'amex': 
				$('#lamexcard').fadeTo('slow',1);
				$('#lvisaCard,#lmasterCard, #ldiscoverCard').fadeTo('slow', 0.1);
				$('#lcardBack').removeClass('isNotamexcard').addClass('isAmexcard');
				$('#securityCode').on('blur', { name: cardType}, validateSecCode);
				break;

			case 'visa':
			$('#lvisaCard').fadeTo('slow',1);
				$('#lamexcard, #lmasterCard, #ldiscoverCard').fadeTo('slow', 0.1);
				$('#lcardBack').removeClass('isAmexcard').addClass('isNotamexcard');
				$('#securityCode').on('blur', { name: cardType}, validateSecCode);
				break;

			case 'discover':
				$('#ldiscoverCard').fadeTo('slow', 1);
				$('#lvisaCard, #lmasterCard, #lamexcard').fadeTo('slow', 0.2);
				$('#lcardBack').removeClass('isAmexcard').addClass('isNotamexcard');
				$('#securityCode').on('blur', { name: cardType}, validateSecCode);
				break;

			case 'master':
				$('#lmasterCard').fadeTo('slow',1);
				$('#lvisaCard, #lamexcard, #ldiscoverCard').fadeTo('slow', 0.1);
				$('#lcardBack').removeClass('isAmexcard').addClass('isNotamexcard');
				$('#securityCode').on('blur', { name: cardType}, validateSecCode);
				break;

			default:
				$('#lamexcard, #lvisaCard, #lmasterCard, #ldiscoverCard').fadeTo(200, 0.4);
				$(this).removeClass().addClass('error');

		}
	});

	$('#kanaform').validate({
		rules: {
			portfolioAddress: "required",
			portfolioTitle: "required",
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 5
			},
			cardNumber: "required",
			securityCode: "required",
			monthList: "required", /* these 2 lines will not work because this plugin only works with text input*/
			yearList: "required"
		},

		messages:  {
			portfolioAddress: "Please enter your portfolio address",
			portfolioTitle: "Please enter your portfoilo title",
			name: {
				required: "Please enter a name",
				minlength: "Your name must consist of at least 2 characters"
			},
			email: "Please enter a valid email address",
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			cardNumber: "Please enter your credit card number",
			securityCode: "Please enter your security code",
			monthList: "Please enter your card expiration month",
			yearList:  "Please enter your card expiration year"			
		}
	});
	
});
