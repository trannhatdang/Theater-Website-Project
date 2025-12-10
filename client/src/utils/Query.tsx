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

	const ans = await employees.json();

	return ans;
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
		})

	})

	return ans;
}

export const patchEmployee = async (employee : EmployeeProps) : Promise<EmployeeProps> => {
	const queryParams = createQueryParams(employee);

	const newDate = new Date(employee.ngay_sinh)
	newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset())

	const body = {
		new_ma_nv: employee.ma_nv,
		new_cccd: employee.cccd,
		new_ten: employee.ten,
		new_luong: employee.luong,
		new_ngay_sinh: newDate,
		new_chuc_vu: employee.chuc_vu,
		new_dia_chi: employee.dia_chi,
		new_sdt: employee.sdt,
		new_gioi_tinh: employee.gioi_tinh,
		new_ma_nv_quan_ly: employee.ma_nv_quan_ly,
		new_ma_rap_phim: employee.ma_rap_phim,
	}

	const employees = await fetch(url + '/employee?' + queryParams, {
		method: "PATCH",
		body: JSON.stringify(body),
		headers:{
			"content-type": "application/json"
		}
	});

	if(!employees.ok){
		console.error(employees);

		throw Error("something went wrong...");
	}

	return employees.json();
}

export const postEmployee = async (employee : EmployeeProps) : Promise<EmployeeProps> => {
	const newDate = new Date(employee.ngay_sinh)
	newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset())

	const body = {
		ma_nv: employee.ma_nv,
		cccd: employee.cccd !== "" ? employee.cccd : undefined,
		ten: employee.ten !== "" ? employee.ten : undefined,
		luong: employee.luong > 0 ? employee.luong : undefined,
		ngay_sinh: !isNaN(newDate.getTime()) ? newDate : undefined,
		chuc_vu: employee.chuc_vu !== "" ? employee.chuc_vu : undefined,
		dia_chi: employee.dia_chi !== "" ? employee.dia_chi : undefined,
		sdt: employee.sdt !== "" ? employee.sdt : undefined,
		gioi_tinh: employee.gioi_tinh !== "" ? employee.gioi_tinh : undefined,
		ma_nv_quan_ly: employee.ma_nv_quan_ly !== "" ? employee.ma_nv_quan_ly : undefined,
		ma_rap_phim: employee.ma_rap_phim !== "" ? employee.ma_rap_phim : undefined,
	}

	const employees = await fetch(url + '/employee', {
		method: "POST",
		body: JSON.stringify(body),
		headers:{
			"content-type": "application/json"
		}
	});

	if(!employees.ok){
		console.error(employees);

		throw Error("something went wrong...");
	}

	return employees.json();

}

export const deleteEmployee = async (ma_nv : string) : Promise<EmployeeProps> => {
	const employees = await fetch(url + '/employee?ma_nv=' + ma_nv, {
		method: "DELETE",
	});

	console.log(url + '/employee?ma_nv=' + ma_nv)


	const ret = await employees.json()
	if(!employees.ok){

		throw Error(ret.stack)
	}

	return ret;

}
