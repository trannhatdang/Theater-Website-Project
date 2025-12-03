import type { EmployeeFilters } from '../components/EmployeeView.tsx'
const url = 'http://localhost:3000'

export async function fetchEmployeeData({ queryKey }){
	const queryParams = new URLSearchParams(JSON.stringify(queryKey)).toString();

	const employees = await fetch(url + '/employee?' + queryParams, {
		method: "GET",
	})

	if(!employees.ok){
		console.error(employees);

		throw Error("something went wrong...");
	}

	return employees.json()
}
