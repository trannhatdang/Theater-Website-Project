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
import type { AlertProps } from '@mui/material/Alert'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const genders = [
	{
		value: 'Nam',
		label: 'Nam'
	},
	{
		value: 'Nu',
		label: 'Nu'
	},
	{
		value: '',
		label: ''
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

function AdvancedSearchInput({onSubmit, onError} : {onSubmit : Function, onError : Function}){
	const handleSubmit = (event: React.FormEvent) => {
		try{
			event.preventDefault()
			const formData = new FormData(event.target as HTMLFormElement);

			if((Number(formData.get('p_luong_min')) !== 0 && Number(formData.get('p_luong_min')) < 0) || (Number(formData.get('p_luong_max')) !== 0 && Number(formData.get('p_luong_max')) < 0)){
				throw Error('Luong phai lon hon 0!')
			}

			const employee : AdvancedSearchFilters = {
				p_tu_khoa: String(formData.get('p_tu_khoa')) !== '' ? String(formData.get('p_tu_khoa')) : undefined,
				p_gioi_tinh: String(formData.get('p_gioi_tinh')) !== '' ? String(formData.get('p_gioi_tinh')) : undefined,
				p_luong_min: Number(formData.get('p_luong_min')) !== 0 ? Number(formData.get('p_luong_min')) : undefined,
				p_luong_max: Number(formData.get('p_luong_max')) !== 0 ? Number(formData.get('p_luong_max')) : undefined,
				p_chuc_vu: String(formData.get('p_chuc_vu')) !== '' ? String(formData.get('p_chuc_vu')) : undefined,
				p_ten_rap: String(formData.get('p_ten_rap')) !== ''? String(formData.get('p_ten_rap')) : undefined,
				p_cot_sap_xep: String(formData.get('p_cot_sap_xep')),
				p_kieu_sap_xep: String(formData.get('p_kieu_sap_xep')),
			}

			onSubmit(employee)

		}
		catch(e : any){
			onError(e.message)

		}
	}

	return(
		<Paper elevation={3} className='p-2 mr-2'>
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
						defaultValue=''
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
						label="Ten Rap"
						name="p_ten_rap"
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

						<Button type="submit" variant="contained" className='w-50'>
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

	const [snackbar, setSnackbar] = React.useState<Pick<
		AlertProps,
		'children' | 'severity'
	> | null>(null);

	const handleSubmit = (filters : AdvancedSearchFilters) => {
		setFilters(filters)
	}

	const handleError = (message : string) => {
		setSnackbar({children: message, severity: 'error'})
	}

	const handleCloseSnackbar = () => setSnackbar(null);

	const employees = data;

	return (
		<>
			<div className='flex m-10'>
				<AdvancedSearchInput onSubmit={handleSubmit} onError={handleError}/>
				{(!isPending && !isError) ? <AdvancedTable employees={employees}/> : <>{error?.message}</>}
			</div>

			{!!snackbar && (
				<Snackbar
					open
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					onClose={handleCloseSnackbar}
					autoHideDuration={6000}
				>
					<Alert {...snackbar} onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
		</>
	)
}
