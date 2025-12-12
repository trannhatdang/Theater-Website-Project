import { getEmployee, createQueryParams } from './Query.tsx'
import type { EmployeeFilters, EmployeeProps } from '../components/EmployeeView.tsx'
const url = 'http://localhost:3069';

export async function postEmployeeChecks(employee : EmployeeProps){
	const temp_emp_filters : EmployeeFilters = {
		ma_nv: employee.ma_nv
	}

	const params = createQueryParams(temp_emp_filters);

	const emp_res = await getEmployee(temp_emp_filters);

	if(emp_res.ok){
		throw Error("Nhan vien da ton tai!")
	}

	if(employee.ma_nv_quan_ly){
		const temp_man_filters : EmployeeFilters = {
			ma_nv: employee.ma_nv_quan_ly
		}

		const man_res = await getEmployee(temp_man_filters);

		if(!man_res.ok){
			throw Error("Quan Ly khong ton tai!")
		}
	}

	if(employee.ma_rap_phim){
		const temp_man_filters : EmployeeFilters = {
			ma_nv: employee.ma_nv_quan_ly
		}

		const man_res = await getEmployee(temp_man_filters);

		if(!man_res.ok){
			throw Error("Quan Ly khong ton tai!")
		}
	}





}
