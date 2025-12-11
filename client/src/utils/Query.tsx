import type { EmployeeFilters, EmployeeProps } from '../components/EmployeeView.tsx'
import type { ScreeningFilters, ScreeningProps } from '../components/Screening.tsx'
import type { FilmFilters, FilmProps } from '../components/Film.tsx'
import type { AdvancedSearchFilters, AdvancedSearchProps } from '../components/AdvancedSearch.tsx'
import type { EmployeeProfitsFilters, EmployeeProfitsProps } from '../components/Dashboard.tsx'
const url = 'http://localhost:3000';

function createQueryParams(filters: any) : URLSearchParams{
	const queryParams = new URLSearchParams();

	for(const [key, value] of Object.entries(filters)){
		queryParams.append(key, String(value));
	}

	return queryParams;
}

export const getEmployee = async (filters : EmployeeFilters) : Promise<EmployeeProps[]> => {
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

export const getScreening = async (filters : ScreeningFilters) : Promise<ScreeningProps[]> => {
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

export const getFilm = async (filters : FilmFilters) : Promise<FilmProps[]> => {
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

export const getFilmArr = async (filters : FilmFilters[]) : Promise<FilmProps[]> => {
	const films = filters.map((filter) => getFilm(filter))
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

	const ret = await employees.json()
	if(!employees.ok){
		throw Error(ret.stack)
	}

	return ret;
}

export const getAdvancedSearch = async (filters : AdvancedSearchFilters) : Promise<AdvancedSearchProps[]> => {
	const queryParams = createQueryParams(filters);

	const advancedEmployees = await fetch(url + '/advanced?' + queryParams, {
		method: "GET",
	});
	const advancedEmployeesJSON = await advancedEmployees.json();

	if(!advancedEmployees.ok){
		throw Error(advancedEmployeesJSON.stack);
	}

	let ans : AdvancedSearchProps[] = []

	advancedEmployeesJSON.forEach((employee : any) => {
		ans.push({
			ma_nv: employee.f0,
			ho_va_ten: employee.f1,
			gioi_tinh: employee.f2,
			ngay_sinh: (new Date(employee.f3)),
			sdt: String(employee.f4),
			luong: employee.f5,
			chuc_vu: employee.f6,
			dia_chi: employee.f7,
			ten_rap: employee.f8,
			ten_quan_ly: employee.f9
		})
	})

	return ans;
}

export const getEmployeeProfits = async (filters : EmployeeProfitsFilters) : Promise<EmployeeProfitsProps[]> => {
	const queryParams = createQueryParams(filters);

	const employeeProfits = await fetch(url + '/advanced/stats?' + queryParams, {
		method: "GET",
	});
	const employeeProfitsJSON = await employeeProfits.json();

	if(!employeeProfits.ok){
		throw Error(employeeProfitsJSON.stack);
	}

	let ans : EmployeeProfitsProps[] = []

	employeeProfitsJSON.forEach((employee : any) => {
		ans.push({
			ten_rap: employee.f0,
			ma_nv: employee.f1,
			ten_nhan_vien: employee.f2,
			so_ve_da_ban: Number(employee.f3),
			doanh_so_ban_ve: Number(employee.f4),
			so_don_hang_xu_ly: Number(employee.f5)
		})
	})

	return ans;
}
