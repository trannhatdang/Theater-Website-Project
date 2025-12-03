import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from '@mui/material/Slider';
//import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//import RangeSlider from './RangeSlider.tsx'
import IconButton from '@mui/material/IconButton'
//import Typography from '@mui/material/Typography'

import type { EmployeeFilters } from './EmployeeView.tsx'

interface SalaryRangeProps{
	salaryRange: number[]
	onChange(e: Event, newValue: number[]): void
}

interface FilterProps{
	salaryRange: number[],
	gender: string,
	position: string,
	onApply(filters: EmployeeFilters): void
}

function EmployeeSalaryRangeSlider({salaryRange, onChange}: SalaryRangeProps){
	const [val, setValue] = React.useState<number[]>(salaryRange);
	const handleChange = (e: Event, newValue: number[]) => {
		console.log(e)
		setValue(newValue);
		onChange(newValue);
	};

	return (
		<div className='w-md pt-1'>
			<Slider 
				value = {val}
				onChange = {handleChange}
				className='w-md'
			/>
		</div>
	)
}

function EmployeeFilterMenu({salaryRange, gender, position, onApply}: FilterProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [filters, setFilters] = React.useState<FilterProps>({salaryRange, gender, position, onApply});
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleApply = () => {
		onApply(filters);
	};

	const handleSalarySliderChange = (newValue: number[]) => {
		let outputFilters = filters;
		outputFilters.salaryRange = newValue;
		setFilters(outputFilters);
	}

	return (
		<div>
			<IconButton
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<FilterAltIcon className='text-cyan-500'/>
			</IconButton>
			<Menu
				id='employee-filter-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
					'aria-labelledby': 'basic-button',
					},
				}}
				sx={{
					'& .MuiMenu-paper': {
						backgroundColor: '#334155'
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem disableRipple disableTouchRipple className = 'flex flex-col'>
					<div className='flex flex-row items-center gap-10'>
						<p className='text-cyan-500' style={{color: '#1976d2'}}>SALARY</p> <EmployeeSalaryRangeSlider salaryRange={[salaryRange[0], salaryRange[1]]} onChange={handleSalarySliderChange}/>
					</div>

					<div className='flex flex-row items-center'>

					</div>
				</MenuItem>

				<div className='flex flex-row-reverse items-center m-1'> <Button onClick={handleApply}> Apply </Button> </div>
			</Menu>
		</div>
	);
}

function EmployeeSearch({onChange, key} : {onChange: Function, key: string}){
	const handleChange = (event: Event) => {
		onChange(event, key, event?.target.value);
	}
	return(
		<TextField 
			label='Search' 
			variant='outlined' 
			className='w-full'
			onChange={handleChange}
		/>
	)
}

interface SearchBarID{
	key: string,
	val: string
}

export default function EmployeeTopBar({filters, onChange}: {filters: EmployeeFilters, onChange: Function}){
	const [searchBars, setSearchBars] = React.useState<SearchBarID[]>()
	const [filters, setFilters] = React.useState<EmployeeFilters>()
	const handleApply = (filters: EmployeeFilters) => {
		setFilters(filters)
		props.onChange(e, outputFilters);
	};

	const handleSearchChange = (key: string, newValue: string) => {
		let outputFilters = filters;
		outputFilters[key] = newValue;

		props.onChange(outputFilters);
	};

	return (
		<div className='shadow-md flex flex-row bg-slate-700 items-center p-2'>
			{searchBars.map((searchBar) => (
				<EmployeeSearch className='flex-1 w-full' key={searchBar.key} onChange={handleSearchChange}/>
			))}

			<EmployeeFilterMenu onApply={handleApply} salaryRange={[filters.min_luong, filters.max_luong]} gender={filters.gioi_tinh} position={filters.chuc_vu}/>
		</div>
	)

}
