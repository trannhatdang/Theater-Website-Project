import type { EmployeeFilters } from '../components/EmployeeView.tsx'
import type { EmployeeProps } from '../components/EmployeeTable.tsx'
import type { ScreeningFilters } from '../components/Screening.tsx'
import type { ScreeningProps } from '../components/Screening.tsx'
const url = 'http://localhost:3000';

function createQueryParams(filters : any){
	const queryParams = new URLSearchParams();

	for(const [key, value] of Object.entries(filters)){
		if(typeof value !== 'string'){
			queryParams.append(key, value.toString());
		}
		else{
			queryParams.append(key, value);

		}
	}

	return queryParams;
}

export const fetchEmployee = async (filters : EmployeeFilters) : Promise<EmployeeProps[]> => {
	const queryParams = createQueryParams(filters);

	const employees = await fetch(url + '/employee?' + queryParams, {
		method: "GET",
	});

	if(!employees.ok){
		console.error(employees);

		throw Error("something went wrong...");
	}

	return employees.json();
}

export const fetchScreening = async (filters : ScreeningFilters) : Promise<ScreeningProps[]> => {
	const queryParams = createQueryParams(filters);

	const screening = await fetch(url + '/film/screening?' + queryParams, {
		method: "GET",
	});

	if(!screening.ok){
		console.error(screening);

		throw Error("something went wrong...");
	}

	return film.json()
}

export const fetchFilm = async (filters : filmFilters) : Promise<filmProps[]> => {
	const queryParams = createQueryParams(filters);

	const film = await fetch(url + '/film?' + queryParams, {
		method: "GET",
	});

	if(!film.ok){
		console.error(film);

		throw Error("something went wrong...");
	}

	return film.json()
}

export const fetchFilmArray = async (filters : filmFilters[]) : Promise <filmProps[]> => {
	return filters.map((filter) => fetchFilm(filter))
}
