import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RangeSlider from '../utils/RangeSlider.tsx'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

interface SalaryRangeProps{
	salaryRange: number[]
	onChange(e: Event, newValue: number[]): void
}

interface FilterProps{
	salaryRange: number[],
	gender: string,
	position: string,
	onApply(e: Event, salaryRange: number[], gender: string, position: string): void
}

function EmployeeSalaryRangeSlider({salaryRange, onChange}: SalaryRangeProps){
	const [val, setValue] = React.useState<number[]>(salaryRange);
	const handleChange = (event: Event, newValue: number[]) => {
		setValue(newValue);
		onChange(event, newValue)
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


function EmployeeSearch(onChange){
	const handleChange = (event: Event, newValue: string) => {
		console.log('employeesearchchange: ' + newValue);
		onChange(e, newValue);
	}
	return(
		<TextField 
			label="Search" 
			variant="outlined" 
			className='w-full'
			onChange={handleChange}
		/>
	)
}

function EmployeeFilterMenu(props: FilterProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [salaryRange, setSalaryRange] = React.useState<Number[]>(props.salaryRange);
	const [gender, setGender] = React.useState<Number[]>(props.gender);
	const [position, setPosition] = React.useState<Number[]>(props.position);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleApply = (e: Event) =>{
		props.onApply(e, salaryRange, gender, position);
	};

	const onSalarySliderChange = (e: Event, newValue: number[]) => {
		setSalaryRange(newValue)
	};


	return (
		<div>
			<IconButton
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<FilterAltIcon className='text-cyan-500'/>
			</IconButton>
			<Menu
				id="employee-filter-menu"
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
						backgroundColor: "#334155"
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem disableRipple disableTouchRipple className = 'flex flex-col'>
					<div className='flex flex-row items-center gap-10'>
						<p className='text-cyan-500' sx={{color: '#1976d2'}}>SALARY</p> <EmployeeSalaryRangeSlider min={0} max={100} onChange={onSalarySliderChange}/>
					</div>

					<div className='flex flex-row items-center'>

					</div>
				</MenuItem>

				<div className='flex flex-row-reverse items-center m-1'> <Button onClick={handleApply}> Apply </Button> </div>
			</Menu>
		</div>
	);
}

export default function EmployeeTopBar(props){
	const handleChange = (e: Event, salaryRange: number[], gender: string, position: string) => {
		props.onChange(e, salaryRange, gender, position);
	};

	return (
		<div className='shadow-md flex flex-row bg-slate-700 items-center p-2'>
			<EmployeeSearch className='flex-1 w-full'/>
			<EmployeeFilterMenu onApply={handleChange}/>
		</div>
	)

}
