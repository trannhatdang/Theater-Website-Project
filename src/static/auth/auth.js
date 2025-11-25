$(document).ready(function() {
	const form = document.querySelector('form')
	async function submitClick(e)
	{
		e.preventDefault()
		const fd = new FormData(form);
		const urlEncoded = new URLSearchParams(fd).toString();


		try{
			const response = await fetch("./login",{
				method: "POST",
				body: urlEncoded,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				}
			})
			console.log(response)
		}
		catch(error)
		{
			console.error(error.message)

		}

	}

	$('#login').on('submit', submitClick)
}
