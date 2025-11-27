import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Stack from '@mui/material/Stack'
import RangeSlider from './RangeSlider.tsx';
import Sidebar from './sidebar.tsx'

export default function Employee(){
	return (
		<div className='flex my-10 gap-2'>
			<Sidebar />
			<div className='flex flex-col flex-1 bg-slate-700'>
				<Stack className='flex my-2' spacing={2}>
					<p>hi</p>
					<p>hi</p>
					<p>hi</p>
				</Stack>
			</div>
		</div>
	)
}
