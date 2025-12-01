import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import RangeSlider from '../utils/RangeSlider.tsx';
import Sidebar from './Sidebar.tsx'
import EmployeeTopBar from './EmployeeTopBar.tsx'
import EmployeeTable from './EmployeeTable.tsx'
import { useQuery } from "@tanstack/react-query";

export interface FilterProps{
	ma_nv: string,
	cccd: string,
	ten: string,
	khoang_luong: number[],
	khoang_ngay_sinh: Date[]
	chuc_vu: string,
	dia_chi: string,
	sdt: string,
	gioi_tinh: string,
	ma_nv_quan_ly: string,
	ma_rap_phim: string
}

const fetchEmployeeData = async({ queryKey }) => {
	const queryParams = '';
	if(!queryKey.Filters === undefined)
	{
		const Filters = queryKey.Filters;
		const queryParams = new URLSearchParams(Filters).toString();
	}

	const employees = await fetch('http://localhost:3000/employee?' + queryParams, {
		method: "GET",
	})

	return employees.json();
};

export default function EmployeeView(){
	const [Filters, setFilters] = React.useState<FilterProps>()
	const { isPending, isError, data, error } = useQuery({ queryKey: [Filters], queryFn: fetchEmployeeData});
	const handleChange = (
		e: Event,
		new_ma_nv: string,
		new_cccd: string,
		new_ten: string,
		new_khoang_luong: number[],
		new_khoang_ngay_sinh: Date[],
		new_chuc_vu: string,
		new_dia_chi: string,
		new_sdt: string,
		new_gioi_tinh: string,
		new_ma_nv_quan_ly: string,
		new_ma_rap_phim: string
	) => {
		setFilters({new_ma_nv, new_cccd, new_ten, new_khoang_luong, new_khoang_ngay_sinh, new_chuc_vu, new_dia_chi, new_sdt, new_gioi_tinh, new_ma_nv_quan_ly, new_ma_rap_phim});
	}

	if (isPending) {
		return <span className="text-white"> Loading... </span>;
	}

	if (isError) {
		return <span className="text-white"> Error: {error.message} </span>;
	}

	const employeesData = data.metaData;

	return (
		<div className='flex flex-col m-10 gap-2 w-full'>
			<EmployeeTopBar onChange={handleChange}/>
			<EmployeeTable employees = {employeesData}/>
		</div>
	)
}
