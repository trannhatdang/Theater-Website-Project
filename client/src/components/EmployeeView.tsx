import * as React from 'react';
//import Container from '@mui/material/Container';
//import Box from '@mui/material/Box'
//import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
//import Sidebar from './Sidebar.tsx'
import EmployeeTopBar from './EmployeeTopBar.tsx'
import EmployeeTable from './EmployeeTable.tsx'
import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeData } from '../utils/Query.tsx'

export interface EmployeeFilters {
	ma_nv: string,
	cccd: string,
	ten: string,
	min_luong: number,
	max_luong: number,
	min_ngay_sinh: Date,
	max_ngay_sinh: Date,
	chuc_vu: string,
	dia_chi: string,
	sdt: string,
	gioi_tinh: string,
	ma_nv_quan_ly: string,
	ma_rap_phim: string
}

export default function EmployeeView(){
	const [Filters, setFilters] = React.useState<EmployeeFilters>()
	const { isPending, isError, data, error } = useQuery({ queryKey: [Filters], queryFn: fetchEmployeeData});
	const handleChange = (
		e: Event,
		newFilters: EmployeeFilters
	) => {
		console.log(newFilters);
		//setFilters(newFilters);
	}

	if (isPending) {
		return <span className="text-white"> Loading... </span>;
	}

	if (isError) {
		return <span className="text-white"> Error: {error.message} </span>;
	}

	const employees = Object.assign(new EmployeeFilters(), data)

	return (
		<div className='flex flex-col m-10 gap-2 w-full'>
			<EmployeeTopBar onChange={handleChange}/>
			<EmployeeTable employees={employees}/>
		</div>
	)
}
