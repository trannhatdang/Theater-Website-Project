import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import RangeSlider from '../utils/RangeSlider.tsx';
import Sidebar from './Sidebar.tsx'
import EmployeeTopBar from './EmployeeTopBar.tsx'
import EmployeeTable from './EmployeeTable.tsx'
import {useQuery} from "@tanstack/react-query";

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

	if(!employees.ok){
		throw Error('i hate everyone')
	}

	return employees.json();
};

export default function EmployeeView(){
	const [Filters, setFilters] = React.useState<FilterProps>()
	const {isPending, isError, data, error } = useQuery({ queryKey: [Filters], queryFn: fetchEmployeeData});
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
	) => {
		setFilters({newID, newSID, newEmployeeName, newSalaryRange, newBirthdateRange, newOccupation, newHomeAddress, newPhone, newGender, newManagerId, newTheaterID});
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
