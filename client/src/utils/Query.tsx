import type { EmployeeFilters } from '../components/EmployeeView.tsx'
import type { EmployeeProps } from '../components/EmployeeTable.tsx'
const url = 'http://localhost:3000';

export const fetchEmployeeData = async (filters : EmployeeFilters) : Promise<EmployeeProps[]> => {
	const queryParams = new URLSearchParams();

	for(const [key, value] of Object.entries(filters)){
		if(typeof value !== 'string'){
			queryParams.append(key, value.toString());
		}
		else{
			queryParams.append(key, value);

		}
	}

	const employees = await fetch(url + '/employee?' + queryParams, {
		method: "GET",
	});

	if(!employees.ok){
		console.error(employees);

		throw Error("something went wrong...");
	}

	return employees.json();
}
