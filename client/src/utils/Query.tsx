import type { EmployeeFilters } from '../components/EmployeeView.tsx'
const url = 'http://localhost:3000'

export const fetchEmployeeData = async (filters : EmployeeFilters) => {
	const queryParams = new URLSearchParams(JSON.stringify(filters)).toString();

	const employees = await fetch(url + '/employee?' + queryParams, {
		method: "GET",
	});

	if(!employees.ok){
		console.error(employees);

		throw Error("something went wrong...");
	}

	return employees.json();
}
