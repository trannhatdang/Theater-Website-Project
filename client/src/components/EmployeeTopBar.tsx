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
	className: string,
	salaryRange: number[],
	onChange(newValue: number[]): void,
}

interface EmployeeFilterMenuProps{
	className: string,
	onApply(filters: EmployeeFilters): void,
}


function EmployeeSalaryRangeSlider({salaryRange, onChange, className}: SalaryRangeProps){
	const [val, setValue] = React.useState<number[]>(salaryRange);
	const handleChange = (newValue: number[]) => {
		setValue(newValue);
		onChange(newValue);
	};

	return (
		<div className='w-md pt-1'>
			<Slider 
				value = {val}
				onChange = {(_, newValue) => handleChange(newValue)}
				className= {className}
			/>
		</div>
	)
}

function EmployeeFilterMenu({onApply, className}: EmployeeFilterMenuProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [menuFilters, setMenuFilters] = React.useState<EmployeeFilters>({});
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleApply = () => {
		onApply(menuFilters);
	};

	const handleSalarySliderChange = (newValue: number[]) => {
		setMenuFilters({
			...menuFilters,
			min_luong: newValue[0],
			max_luong: newValue[1]
		});
	}

	return (
		<div className={className}>
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
						backgroundColor: ''
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem disableRipple disableTouchRipple className = 'flex flex-col'>
					<div className='flex flex-row items-center gap-10'>
						<p className='text-cyan-500' style={{color: '#1976d2'}}>SALARY</p> <EmployeeSalaryRangeSlider salaryRange={[menuFilters.min_luong ? menuFilters.min_luong : 0, menuFilters.max_luong ? menuFilters.max_luong : 0]} onChange={handleSalarySliderChange} className=''/>
					</div>

					<div className='flex flex-row items-center'>

					</div>
				</MenuItem>

				<div className='flex flex-row-reverse items-center m-1'> <Button onClick={handleApply}> Apply </Button> </div>
			</Menu>
		</div>
	);
}

export type SearchKeys = "ma_nv" | "cccd" | "ten" | "chuc_vu" | "dia_chi" | "sdt" | "gioi_tinh" | "ma_nv_quan_ly" | "ma_rap_phim"

export type SearchBarKey = {
	key: SearchKeys,
	val: string
}

function EmployeeSearch({onChange, searchKey, className} : {onChange: Function, searchKey: SearchKeys, className: string}){
	const handleChange = (newValue: string) => {
		onChange({key: searchKey, val: newValue})
	}

	return(
		<TextField 
			label={'Tim ' + searchKey}
			variant='outlined' 
			className={className}
			onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.value)}
		/>
	)
}

export function EmployeeTopBar({dispatch} : {dispatch: Function}){
	const [searchBars, setSearchBars] = React.useState<SearchBarKey[]>([{key: 'ten', val: ''}]);
	//const [Filters, setFilters] = React.useState<EmployeeFilters>({});
	const [remainingSearchBars, setRemainingSearchBars] = React.useState<SearchKeys[]>([
		"ma_nv",
		"cccd",
		"chuc_vu",
		"dia_chi",
		"sdt",
		"gioi_tinh",
		"ma_nv_quan_ly",
		"ma_rap_phim"
	]);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleApply = (filters: EmployeeFilters) => {
		dispatch({
			type: 'FILTER',
			filters: filters,
		});
	};

	const handleSearchChange = (searchBarKey: SearchBarKey) => {
		dispatch({
			type: 'SEARCH',
			search: searchBarKey,
		});
	};

	const removeElement = (array: SearchKeys[], elem: SearchKeys) => {
		var index = array.indexOf(elem);
		if (index > -1) {
			array.splice(index, 1);
		}
	}

	const handleSearchBarsChange = (newValue : SearchKeys) => {
		setSearchBars([
			...searchBars,
			{key: newValue, val: ''},
		]);

		let newRems = remainingSearchBars;
		removeElement(newRems, newValue);
		setRemainingSearchBars(newRems);

		handleClose();
	}

	return (
		<div className='shadow-md flex flex-row bg-slate-700 items-center p-2'>
			<div className='flex-1 w-full'>
				{searchBars.map(searchBar => {
					return <EmployeeSearch className='flex-1 w-full' key={searchBar.key} onChange={handleSearchChange} searchKey={searchBar.key}/>
				})}
			</div>

			<EmployeeFilterMenu onApply={handleApply} className=''/>

			<Button
				onClick={handleClick}
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
			>
				Search Bars
			</Button>

			<Menu
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				{remainingSearchBars.map((rem) => {
					return (
						<MenuItem onClick={() => {handleSearchBarsChange(rem)}} key={rem}>{rem}</MenuItem>
					)
				})}
			</Menu>
		</div>
	)

}
export default React.memo(EmployeeTopBar);
