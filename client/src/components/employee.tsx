import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import RangeSlider from './RangeSlider.tsx';
import Sidebar from './Sidebar.tsx'
import EmployeeData from './EmployeeData.tsx'
import EmployeeTopBar from './EmployeeTopBar.tsx'

export default function Employee(){
	return (
		<div className='flex flex-col m-10 gap-2 w-full'>
			<EmployeeTopBar />
			<EmployeeData />
		</div>
	)
}
