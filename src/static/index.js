document.addEventListener("DOMContentLoaded", function(){
	var replacers = document.querySelectorAll('[data-replace]');
	for(var i=0; i<replacers.length; i++){
		let replaceClasses = JSON.parse(replacers[i].dataset.replace.replace(/'/g, '"'));
		Object.keys(replaceClasses).forEach(function(key) {
			replacers[i].classList.remove(key);
			replacers[i].classList.add(replaceClasses[key]);
		});
	}
});



function userProfileDropdown()
{
	const userProfileDropdown = document.getElementById('userProfileDropdown');
	const list = userProfileDropdown.classList;

	if(list.contains('hidden'))
	{
		userProfileDropdown.classList.remove('hidden');
	}
	else
	{
		userProfileDropdown.classList.add('hidden');
	}
}
