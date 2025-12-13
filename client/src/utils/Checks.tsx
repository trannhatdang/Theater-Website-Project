import { getEmployee, getTheater, getWorkShift } from './Query.tsx'
import type { EmployeeFilters, EmployeeProps } from '../components/EmployeeView.tsx'
import type { TheaterFilters, } from '../components/Theater.tsx'
import type { WorkShiftFilters, } from '../components/WorkShift.tsx'
import dayjs from 'dayjs'
//const url = 'http://localhost:3069';
//
const cmndRegex = new RegExp('^[0-9]{9}$')
const cccdRegex = new RegExp('^[0-9]{12}$')
const sdtRegex = new RegExp('^[0-9]{10}$')

export async function postEmployeeChecks(employee : EmployeeProps) : Promise<boolean> {
	const temp_emp_filters : EmployeeFilters = {
		ma_nv: employee.ma_nv,
		isStrict: true
	}

	const emp : EmployeeProps[] = await getEmployee(temp_emp_filters);

	if(emp.length > 0){
		throw Error('Ma NV bi trung lap!')
	}

	if(!cmndRegex.test(employee.cccd) && !cccdRegex.test(employee.cccd)){
		throw Error('CCCD khong hop le!')
	}

	const temp_cccd_filters : EmployeeFilters = {
		cccd: employee.cccd,
		isStrict: true
	}

	const cccd : EmployeeProps[] = await getEmployee(temp_cccd_filters);

	if(cccd.length > 0){
		throw Error('CCCD bi trung!')
	}

	if(employee.gioi_tinh && !(employee.gioi_tinh === "Nam" || employee.gioi_tinh === 'Nu')){
		throw Error('Hay nhap giua hai gioi tinh "Nam" va "Nu" ')
	}

	if(employee.luong){
		if(employee.luong > 45000)
		{
			throw Error('Luong cao hon muc toi da 45000')
		}
		else if(employee.luong < 0)
		{
			throw Error('Luong khong hop le!')
		}
	}

	if(employee.sdt !== '' && !sdtRegex.test(employee.sdt)){
		throw Error('SDT khong hop le!')
	}

	if(employee.ngay_sinh && !isNaN(employee.ngay_sinh.getTime())){
		const birthday = dayjs(employee.ngay_sinh)
		const curr = dayjs()
		const age = curr.diff(birthday, 'year')

		if(age < 18){
			throw Error('Nhan Vien chua du 18 tuoi!')
		}
	}

	if(employee.ma_nv_quan_ly !== ''){
		const temp_man_filters : EmployeeFilters = {
			ma_nv: employee.ma_nv_quan_ly,
			isStrict: true
		}

		const man_res = await getEmployee(temp_man_filters);
		
		if(man_res.length === 0){
			throw Error("Quan Ly khong ton tai!")
		}
	}

	if(employee.ma_rap_phim){
		const temp_man_filters : TheaterFilters = {
			ma_rap: employee.ma_rap_phim,
			isStrict: true
		}

		const theater_res = await getTheater(temp_man_filters);

		if(theater_res.length === 0){
			throw Error("Rap phim khong ton tai!")
		}
	}

	return true;
}

export async function patchEmployeeChecks(employee : EmployeeProps) : Promise<boolean>{
	if(employee.cccd){
		if(!cmndRegex.test(employee.cccd) && !cccdRegex.test(employee.cccd)){
			throw Error('CCCD khong hop le!')
		}
	}

	if(employee.gioi_tinh !== '' && !(employee.gioi_tinh === "Nam" || employee.gioi_tinh === 'Nu')){
		throw Error('Hay nhap giua hai gioi tinh "Nam" va "Nu" ')
	}

	if(employee.luong){
		if(employee.luong > 45000)
		{
			throw Error('Luong cao hon muc toi da 45000')
		}
		else if(employee.luong < 0)
		{
			throw Error('Luong khong hop le!')
		}
	}

	if(employee.sdt !== '' && !sdtRegex.test(employee.sdt)){
		throw Error('SDT khong hop le!')
	}

	if(employee.ngay_sinh && !isNaN(employee.ngay_sinh.getTime())){
		const birthday = dayjs(employee.ngay_sinh)
		const curr = dayjs()
		const age = curr.diff(birthday, 'year')

		if(age < 18){
			throw Error('Nhan Vien chua du 18 tuoi!')
		}
	}

	if(employee.ma_nv_quan_ly !== ''){
		const temp_man_filters : EmployeeFilters = {
			ma_nv: employee.ma_nv_quan_ly,
			isStrict: true
		}

		const man_res = await getEmployee(temp_man_filters);
		
		if(man_res.length === 0){
			throw Error("Quan Ly khong ton tai!")
		}
	}

	if(employee.ma_rap_phim){
		const temp_man_filters : TheaterFilters = {
			ma_rap: employee.ma_rap_phim,
			isStrict: true
		}

		const theater_res = await getTheater(temp_man_filters);

		if(theater_res.length === 0){
			throw Error("Rap phim khong ton tai!")
		}
	}

	return true;

}

export async function deleteEmployeeChecks(ma_nv : string) : Promise<boolean>{
	const temp_man_filters: EmployeeFilters = {
		ma_nv_quan_ly: ma_nv 
	}

	const man_res = await getEmployee(temp_man_filters);

	if(man_res.length > 0){
		throw Error("Nhan Vien dang quan ly Nhan Vien khac!")
	}

	const temp_work_shift_filters: WorkShiftFilters = {
		ma_nv: ma_nv
	}

	const shift_res = await getWorkShift(temp_work_shift_filters);

	if(shift_res.length > 0){
		throw Error("Nhan Vien dang co ca lam viec!")
	}

	return true;
}
