import * as React from 'react';
//import Container from '@mui/material/Container';
//import Box from '@mui/material/Box'
//import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
//import Stack from '@mui/material/Stack'
//import Sidebar from './Sidebar.tsx'
import EmployeeTopBar from './EmployeeTopBar.tsx'
import EmployeeTable from './EmployeeTable.tsx'
import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeData } from '../utils/Query';
import type { EmployeeProps, EmployeeFilters } from '../types/employee';
import type { SearchBarKey } from './EmployeeTopBar';

interface FilterAction {
	type: string;
	filters?: EmployeeFilters;
	search?: SearchBarKey;
}

function filterReducer(filter: EmployeeFilters, action: FilterAction): EmployeeFilters {
	const { type, filters, search } = action;

	switch (type) {
		case 'FILTER':
			return filters ? { ...filter, ...filters } : filter;
		case 'SEARCH':
			return search ? { ...filter, [search.key]: search.val } : filter;
		default:
			return filter;
	}
}

export default function EmployeeView(){
	const [Filters, dispatch] = React.useReducer(filterReducer, {} as EmployeeFilters);
	const { isPending, isError, data, error } = useQuery({
		queryKey: [Filters], 
		queryFn: () : Promise<EmployeeProps[]> => {
			return Promise.resolve(fetchEmployeeData(Filters));
		}
	});

	const employees: EmployeeProps[] = data ?? [];

	return (
		<div className='flex flex-col m-10 gap-2'>
			<EmployeeTopBar dispatch={dispatch} />
			{!isLoading && !isError ? (
				<EmployeeTable employees={employees} />
			) : (
				<>{error instanceof Error ? error.message : 'Loading...'}</>
			)}
		</div>
	);
}
