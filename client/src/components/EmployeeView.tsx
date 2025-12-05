import * as React from 'react';
//import Container from '@mui/material/Container';
//import Box from '@mui/material/Box'
//import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
//import Stack from '@mui/material/Stack'
//import Sidebar from './Sidebar.tsx'
import EmployeeTopBar from './EmployeeTopBar.tsx'
import EmployeeTable from './EmployeeTable.tsx'
import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeData } from '../utils/Query.tsx'
import type { EmployeeProps } from './EmployeeTable.tsx'
import type { SearchBarKey } from './EmployeeTopBar.tsx'

export type EmployeeFilters = {
	ma_nv?: string,
	cccd?: string,
	ten?: string,
	min_luong?: number,
	max_luong?: number,
	min_ngay_sinh?: Date,
	max_ngay_sinh?: Date,
	chuc_vu?: string,
	dia_chi?: string,
	sdt?: string,
	gioi_tinh?: string,
	ma_nv_quan_ly?: string,
	ma_rap_phim?: string
}

interface FilterAction{
	type: string,
	filters?: EmployeeFilters,
	search?: SearchBarKey
}

function filterReducer(filter : EmployeeFilters, action: FilterAction){
	const {type, filters, search} = action
	switch (type){
		case 'FILTER':{
			if(!filters) return filter;
			return {
				...filter,
				min_luong: filters.min_luong,
				max_luong: filters.max_luong,
			}
		};
		case 'SEARCH':{
			if(!search) return filter;
			return {
				...filter,
				[search.key]: search.val,
			}
		}
		default:
			return filter;
	}

	console.log(filter)
}

export default function EmployeeView(){
	const [Filters, dispatch] = React.useReducer(filterReducer, {})
	const { isPending, isError, data, error } = useQuery({
		queryKey: [Filters], 
		queryFn: () : Promise<EmployeeProps[]> => {
			return Promise.resolve(fetchEmployeeData(Filters));
		}
	});

	/*const handleChange = (
		newFilters: EmployeeFilters
	) => {
		setFilters(newFilters);
	}

	const handleSearchChange = (
		searchBarKey: SearchBarKey
	) => {
		setFilters({
			...Filters,
			[searchBarKey.key]: searchBarKey.val
		});
	}*/

	const employees = data;

	return (
		<div className='flex flex-col m-10 gap-2 w-full'>
			<EmployeeTopBar dispatch={dispatch}/>
			{(!isPending && !isError) ? <EmployeeTable employees={employees}/> : <>{error?.message}</>}
		</div>
	)
}
