import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import RangeSlider from '../utils/RangeSlider.tsx';
import Sidebar from './Sidebar.tsx'
import Employee from './Employee.tsx'
import EmployeeTopBar from './EmployeeTopBar.tsx'

export interface FilterProps{
	ID: string,
	SID: string,
	EmployeeName: string,
	SalaryRange: number[],
	BirthdateRange: Date[]
	Occupation: string,
	HomeAddress: string,
	Phone: string,
	Gender: string,
	ManagerID: string,
	TheaterID: string
}

export default function EmployeeView(){
	const [ID, setID] = React.useState<number | null>(null);
	const [SID, setSID] = React.useState<number | null>(null);
	const [Name, setName] = React.useState<string | null>(null);
	/*const [ID, setID] = React.useState<number | null>(null);
	const [ID, setID] = React.useState<number | null>(null);
	const [ID, setID] = React.useState<number | null>(null);
	const [ID, setID] = React.useState<number | null>(null);
	const [ID, setID] = React.useState<number | null>(null);*/
	const handleChange = (
		e: Event, 
		ID: string, 
		SID: string, 
		EmployeeName: string, 
		SalaryRange: number[], 
		BirthdateRange: Date[],
		Occupation: string,
		HomeAddress: string,
		Phone: string,
		Gender: string,
		ManagerID: string,
		TheaterID: string
	) =>{

	}

	let employees = fetch('localhost:3000/employee', {
		body: Json.stringify({
			in_ma_nv: ID,
			in_ten: Name,
			in_cccd: SID,
			in_min_ngay_sinh: BirthdateRange[0],
			in_max_ngay_sinh: BirthdateRange[1],
			in_min_luong: SalaryRange[0],
			in_max_luong: SalaryRange[1],
			in_chuc_vu: Occupation,
			in_dia_chi: HomeAddress,
			in_sdt: Phone,
			in_ma_nv_quan_ly: ManagerID,
			in_ma_rap_phim: TheaterID
		}),
		method: "POST"
	})

	return (
		<div className='flex flex-col m-10 gap-2 w-full'>
			<EmployeeTopBar onChange={handleChange}/>
			<EmployeeData />
		</div>
	)
}
