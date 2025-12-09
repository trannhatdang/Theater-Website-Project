import type { EmployeeFilters, EmployeeProps } from '../components/EmployeeView.tsx'
import type { ScreeningFilters, ScreeningProps } from '../components/Screening.tsx'
import type { FilmFilters, FilmProps } from '../components/Film.tsx'
const url = 'http://localhost:3000';

function createQueryParams(filters: any) : URLSearchParams{
	const queryParams = new URLSearchParams();

	for(const [key, value] of Object.entries(filters)){
		queryParams.append(key, String(value));
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

	return screening.json()
}

export const fetchFilm = async (filters : FilmFilters) : Promise<FilmProps[]> => {
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

export const fetchFilmArr = async (filters : FilmFilters[]) : Promise<FilmProps[]> => {
	const films = filters.map((filter) => fetchFilm(filter))
	let ans: FilmProps[] = []

	Promise.allSettled(films).then((results) =>{
		results.forEach((result) => {
			if(result.status == 'fulfilled'){
				ans.concat(result.value)
				
			}
			console.log(result.value)
		})

	})

	return ans;
}
