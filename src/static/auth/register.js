var canRegister = 0;
var response;
$(document).ready(function(){
	$('#ErrorContent').html('lmao');

	$('#register').on('submit', register);

	$('#password, #confirm_password').on('keyup', function(){
		if($('#password').val() == $('#confirm_password').val()){
			$('#confirm_password').addClass('outline-white/10');
			$('#confirm_password').removeClass('outline-red-700');
		}
		else{
			$('#confirm_password').addClass('outline-red-700');
			$('#confirm_password').removeClass('outline-white/10');
		}
	})
})

async function register(event){
	event.preventDefault();
	const formData = $('#register').serialize();

	response = $.ajax({
		url: "./register",
		data: formData,
		type: "POST",
		dataType: "json",
	})

	if(response.status != 200){
		$('#error_content').val(response.message);
		
	}
	else{
		$(location).prop('href', 'youtube.com');
	}
}
