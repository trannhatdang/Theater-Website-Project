import * as React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { useQuery } from "@tanstack/react-query";
import { getEmployeeProfits } from '../utils/Query.tsx'
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs'
export type EmployeeProfitsProps = {
	ten_rap: string,
	ma_nv: string,
	ten_nhan_vien: string,
	so_ve_da_ban: number,
	doanh_so_ban_ve: number,
	so_don_hang_xu_ly: number
}

export type EmployeeProfitsFilters = {
	p_thang?: number,
	p_nam?: number,
	p_doanh_thu_min?: number
}

const currDate = dayjs()

function EmployeeProfitsInput({onSubmit} : {onSubmit : Function}){
	const [month, setMonth] = React.useState<Dayjs>(currDate)
	const [year, setYear] = React.useState<Dayjs>(currDate)
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement);
		const employee : EmployeeProfitsFilters = {
			p_thang: month.month() + 1,
			p_nam: year.year(),
			p_doanh_thu_min: Number(formData.get('p_doanh_thu_min')),
		}

		console.log(employee)

		onSubmit(employee)
	}

	return(
		<Paper elevation={3} className='p-2 mb-2'>
			<form onSubmit={handleSubmit}>
				<Typography className=''>Doanh Thu Theo Thang</Typography>

				<Stack spacing={2}>
					<div className='flex w-full'>
						<YearCalendar 
							minDate={dayjs('1-1-1970')}
							onChange={(newVal) => {setYear(newVal)}}
							value={year}
							maxDate={currDate}
							defaultValue={currDate}
							className=''
							slotProps={{
								yearButton:{
									className: '',
								},
							}}
						/>

						<div className='w-40'>
						</div>

						<MonthCalendar 
							value={month}
							minDate={dayjs('1-1-1970')}
							maxDate={currDate}
							onChange={(newVal) => {setMonth(newVal)}}
						/>
					</div>

					<TextField
						label="Doanh Thu Min"
						name="p_doanh_thu_min"
						type="number"
						size="small"
						fullWidth
					/>

					<div className='flex'>
						<div className='w-full'>

						</div>

						<Button type="submit" variant="contained" className='w-50'>
							Apply Filters 
						</Button>
					</div>

				</Stack>
			</form>

		</Paper>
	)
}

function valueFormatter (value: number | null) {
	return `${value} Dong`
}


function EmployeeProfits(){
	const [filters, setFilters] = React.useState<EmployeeProfitsFilters>({})
	const { isPending, isError, data, error } = useQuery({
		queryKey: [filters], 
		queryFn: () : Promise<EmployeeProfitsProps[]> => {
			return Promise.resolve(getEmployeeProfits(filters));
		},
	});


	const chartSetting = {
		yAxis: [
			{
				label: 'Doanh so (Dong)',
				width: 120,
			},
		],
		height: 300,
	};

	return (
		<div className='bg-white m-2 rounded-xs w-full text-white'>
			<EmployeeProfitsInput onSubmit={setFilters}/>
			
			{!(isPending || isError) ? (
				<BarChart className='m-2 text-white'
					dataset={data}
					xAxis={[{ dataKey: 'ten_nhan_vien'}]}
					series={[
						{ dataKey: 'doanh_so_ban_ve', label: 'Doanh So Ban Ve', valueFormatter },
					]}
					{...chartSetting}
				/> 
			) : (
				<div>
					{error?.message}
				</div>
			)
			}
		</div>
	)
}

export default function Dashboard(){
	const [employeeProfitOpen, setEmployeeProfitOpen] = React.useState(false)
	return (
		<div className=''>
			<div className='w-full bg-slate-700 m-2 rounded-xs'>
				<Button className='bg-gray-500 text-white m-2' onClick={() => {setEmployeeProfitOpen(!employeeProfitOpen)}}> EMPLOYEE PROFITS </Button>
			</div>

			{employeeProfitOpen &&
				<EmployeeProfits />
			}
		</div>
	)
}
