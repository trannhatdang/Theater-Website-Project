const url = 'http://localhost:3000'
export async function fetchEmployeeData({ queryKey }){
	const queryParams = '';
	if(!queryKey.Filters === undefined)
	{
		const Filters = queryKey.Filters;
		const queryParams = new URLSearchParams(Filters).toString();
	}

	const employees = await fetch(url + '/employee?' + queryParams, {
		method: "GET",
	})

	if(!employees.ok){
		console.error(employees);

		throw Error("something went wrong...");
	}

	return employees.json();
}
