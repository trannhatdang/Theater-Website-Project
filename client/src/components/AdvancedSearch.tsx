import * as React from 'react'
import AdvancedTable from './AdvancedTable'
import { getAdvancedSearch } from '../utils/Query.tsx'
import { useQuery } from "@tanstack/react-query";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const genders = [
	{
		value: 'Nam',
		label: 'Nam'
	},
	{
		value: 'Nu',
		label: 'Nu'
	}
]

const sortingOptions = [
	{
		value: 'ASC',
	},
	{
		value: 'DESC',
	}
]

const sortingColumns = [
	{
		value: 'luong',
		label: 'Luong'
	},
	{
		value: 'ngay_sinh',
		label: 'Ngay Sinh'
	}
]

export type AdvancedSearchFilters = {
	p_tu_khoa?: string,
	p_gioi_tinh?: string,
	p_luong_min?: number,
	p_luong_max?: number,
	p_chuc_vu?: string,
	p_ten_rap?: string,
	p_cot_sap_xep?: string,
	p_kieu_sap_xep?: string,
}

export type AdvancedSearchProps = {
	ma_nv: string,
	ho_va_ten: string,
	gioi_tinh: string,
	ngay_sinh: Date,
	sdt: string,
	luong: number,
	chuc_vu: string,
	dia_chi: string,
	ten_rap: string,
	ten_quan_ly: string,
}

function AdvancedSearchInput({onSubmit} : {onSubmit : Function}){
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement);
		const employee : AdvancedSearchFilters = {
			p_tu_khoa: String(formData.get('p_tu_khoa')) === '' ? String(formData.get('p_tu_khoa')) : undefined,
			p_gioi_tinh: String(formData.get('p_gioi_tinh')),
			p_luong_min: Number(formData.get('p_luong_min')),
			p_luong_max: Number(formData.get('p_luong_max')),
			p_chuc_vu: String(formData.get('p_chuc_vu')),
			p_ten_rap: String(formData.get('p_ten_rap')),
			p_cot_sap_xep: String(formData.get('p_cot_sap_xep')),
			p_kieu_sap_xep: String(formData.get('p_kieu_sap_xep')),
		}

		onSubmit(employee)
	}

	return(
		<Paper elevation={3} className='bg-slate-700 p-2 mb-2'>
			<form onSubmit={handleSubmit}>
				<Typography fontWeight="bold">Tim Kiem Nang Cao</Typography>

				<Stack spacing={2}>
					<TextField
						label="Tu Khoa"
						name="p_tu_khoa"
						size="small"
						autoFocus
						fullWidth
						defaultValue=""
					/>

					<TextField
						label="Gioi Tinh"
						name="p_gioi_tinh"
						size="small"
						fullWidth
						select
						defaultValue='Nu'
					>
						{genders.map((gender) => (
							<MenuItem key={gender.value} value={gender.value}>
								{gender.label}
							</MenuItem>
						))}

					</TextField>

					<TextField
						label="Luong It Nhat"
						type="number"
						name="p_luong_min"
						size="small"
						fullWidth
					/>

					<TextField
						label="Luong Cao Nhat"
						type="number"
						name="p_luong_max"
						size="small"
						fullWidth
					/>

					<TextField
						label="Chuc Vu"
						name="p_chuc_vu"
						size="small"
						fullWidth
					/>

					<TextField
						label="Cot Sap Xep"
						name="p_cot_sap_xep"
						size="small"
						select
						fullWidth
						defaultValue='luong'
					>
						{sortingColumns.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>

					<TextField
						label="Kieu Sap Xep"
						name="p_kieu_sap_xep"
						size="small"
						select
						fullWidth
						defaultValue='ASC'
					>
						{sortingOptions.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>

					<div className='flex'>
						<div className='w-full'>

						</div>

						<Button type="submit" variant="contained" className='bg-slate-700 w-50'>
							Apply Filters 
						</Button>
					</div>

				</Stack>
			</form>

		</Paper>
	)
}

export default function AdvancedSearch(){
	const [filters, setFilters] = React.useState<AdvancedSearchFilters>({})
	const { isPending, isError, data, error } = useQuery({
		queryKey: [filters], 
		queryFn: () : Promise<AdvancedSearchProps[]> => {
			return Promise.resolve(getAdvancedSearch(filters));
		},
	});

	const handleSubmit = (filters : AdvancedSearchFilters) => {
		setFilters(filters)
	}

	const employees = data;
	return (
		<div className='flex-col m-10'>
			<AdvancedSearchInput onSubmit={handleSubmit}/>
			{(!isPending && !isError) ? <AdvancedTable employees={employees}/> : <>{error?.message}</>}
		</div>
	)
}
