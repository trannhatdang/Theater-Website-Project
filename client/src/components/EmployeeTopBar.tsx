import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

let salary = [0, 100]

function EmployeeSalaryRangeSlider(){
	const [val, setValue] = React.useState<number[]>([0, 100]);
	const handleChange = (event: Event, newValue: number[]) => {
		setValue(newValue);
		salary = val;
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

function EmployeeFilterMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleApply = () =>{
	console.log(salary);

  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <FilterAltIcon className='text-black'/>
      </Button>
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
      >
        <MenuItem disableRipple disableTouchRipple className = 'flex flex-row items-center gap-10'>Salary <EmployeeSalaryRangeSlider /> </MenuItem>
        <MenuItem disableRipple disableTouchRipple onClick={handleClose}>My account</MenuItem>
        <MenuItem divider disableRipple disableTouchRipple onClick={handleClose}>Logout</MenuItem>
	<div className='flex flex-row-reverse items-center m-1'> <Button onClick={handleApply}> Apply </Button> </div>
      </Menu>
    </div>
  );
}

export default function EmployeeTopBar(){
	return (
		<div className='shadow-md flex flex-row-reverse bg-slate-700 items-center'>
			<EmployeeFilterMenu/>
			<div>
				hi
			</div>
		</div>
	)

}
