import * as React from 'react';
import EmployeeTopBar from './EmployeeTopBar.tsx'
import EmployeeTable from './EmployeeTable.tsx'
import { useQuery } from "@tanstack/react-query";
import { fetchEmployee } from '../utils/Query.tsx'
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

export type EmployeeProps = {
	ma_nv: string,
	cccd: string,
	ten: string,
	luong: number,
	ngay_sinh: Date,
	chuc_vu: string,
	dia_chi: string,
	sdt: string,
	gioi_tinh: string,
	ma_nv_quan_ly: string,
	ma_rap_phim: string,
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
				...filters,
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
}

export default function EmployeeView(){
	const [Filters, dispatch] = React.useReducer(filterReducer, {})
	const { isPending, isError, data, error } = useQuery({
		queryKey: [Filters], 
		queryFn: () : Promise<EmployeeProps[]> => {
			return Promise.resolve(fetchEmployee(Filters));
		}
	});
	const employees = data;

	return (
		<div className='flex flex-col m-10 gap-2'>
			<EmployeeTopBar dispatch={dispatch}/>
			{(!isPending && !isError) ? <EmployeeTable employees={employees}/> : <>{error?.message}</>}
		</div>
	)
}
