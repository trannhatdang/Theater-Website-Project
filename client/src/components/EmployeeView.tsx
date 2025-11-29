import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import RangeSlider from '../utils/RangeSlider.tsx';
import Sidebar from './Sidebar.tsx'
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

export default async function EmployeeView(){
	const [Filters, setFilters] = React.useState<FilterProps | null>(null)
	const handleChange = (
		e: Event, 
		newID: string, 
		newSID: string, 
		newEmployeeName: string, 
		newSalaryRange: number[], 
		newBirthdateRange: Date[],
		newOccupation: string,
		newHomeAddress: string,
		newPhone: string,
		newGender: string,
		newManagerID: string,
		newTheaterID: string
	) =>{
		setFilters({newID, newSID, newEmployeeName, newSalaryRange, newBirthdateRange, newOccupation, newHomeAddress, newPhone, newGender, newManagerId, newTheaterID});
	}

	React.useEffect(()=> {
		fetchData();

	}, [])

	const fetchData = async() => {
		try{
			let employees = await fetch('localhost:3000/employee', {
				body: JSON.stringify({
					in_ma_nv: Filters.ID,
					in_ten: Filters.Name,
					in_cccd: Filters.SID,
					in_min_ngay_sinh: Filters.BirthdateRange[0],
					in_max_ngay_sinh: Filters.BirthdateRange[1],
					in_min_luong: Filters.SalaryRange[0],
					in_max_luong: Filters.SalaryRange[1],
					in_chuc_vu: Filters.Occupation,
					in_dia_chi: Filters.HomeAddress,
					in_sdt: Filters.Phone,
					in_ma_nv_quan_ly: Filters.ManagerID,
					in_ma_rap_phim: Filters.TheaterID
				}),
				method: "POST"
			})

			if(!employees.ok){
				throw Error('lmao')
			}
		}
		catch(e){
			console.error(e)
		}
	}

	return (
		<div className='flex flex-col m-10 gap-2 w-full'>
			<EmployeeTopBar onChange={handleChange}/>
			<EmployeeData />
		</div>
	)
}
