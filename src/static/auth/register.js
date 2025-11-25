$(document).ready(function(){
	$('#ErrorContent').html('lmao');

	$('#register').on('submit', register);

	$('#password, #confirm_password').on('keyup', function(){
		if($('#password').val() != $('#confirm_password').val()){
			$('#confirm_password_message').removeClass('hidden');
		}
		else
		{
			$('#confirm_password_message').addClass('hidden');
		}
	})
})

async function register(event){
	event.preventDefault();
	const formData = $('#register').serialize();

	var response;
	response = $.ajax({
		url: "./register",
		data: formData,
		type: "POST",
		dataType: "json",
	})
}
