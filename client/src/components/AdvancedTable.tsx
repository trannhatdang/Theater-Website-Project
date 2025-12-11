import * as React from 'react'
import {
	DataGrid,
	Toolbar,
	ToolbarButton,
} from '@mui/x-data-grid';
import type {
	GridColDef,
	GridSlots,
	GridSlotProps,
} from '@mui/x-data-grid';

import Tooltip from '@mui/material/Tooltip';

import type { AdvancedSearchProps } from '../components/AdvancedSearch.tsx'
import { mkConfig, generateCsv, download } from "export-to-csv";
import DownloadIcon from '@mui/icons-material/Download';
const csvConfig = mkConfig({ useKeysAsHeaders: true });

declare module '@mui/x-data-grid' {
	interface ToolbarPropsOverrides {
		handleExport: () => void
	}
}

function EditToolbar(slotProps: GridSlotProps['toolbar']) {
	const { handleExport } = slotProps

	return (
		<Toolbar>
			<Tooltip title="Export to CSV">
				<ToolbarButton onClick={handleExport}>
					<DownloadIcon fontSize="small"/>
				</ToolbarButton>
			</Tooltip>
		</Toolbar>
	);
}

const columns: GridColDef[] = [
	{ field: 'ma_nv', headerName: 'Ma NV', width: 100},
	{ field: 'ho_va_ten', headerName: 'Ho va Ten', width: 200, },
	{ field: 'gioi_tinh', headerName: 'Gioi Tinh', width: 100, },
	{
		field: 'ngay_sinh',
		headerName: 'Ngay Sinh',
		type: 'date',
		width: 100,
		valueGetter: (value) => {
			return new Date(value);
		},
	},
	{ field: 'sdt', headerName: 'SDT', width: 100, },
	{
		field: 'luong',
		headerName: 'Luong',
		type: 'number',
		width: 100,
	},
	{ field: 'chuc_vu', headerName: 'Chuc Vu', width: 100, },
	{ field: 'dia_chi', headerName: 'Dia Chi', width: 250, },
	{ field: 'ten_rap', headerName: 'Ten Rap', width: 150, },
	{ field: 'ten_quan_ly', headerName: 'Ten Quan Ly', width: 150, },  
];

export default function AdvancedTable({employees}: {employees : AdvancedSearchProps[] | undefined}){
	if(!employees) return;
	const [rows, _] = React.useState<AdvancedSearchProps[]>(employees);

	const handleExport = () => {
		let employeeCSV : any[] = []

		employees.forEach((employee) => {
			employeeCSV.push({
				ma_nv: employee.ma_nv,
				ho_va_ten: employee.ho_va_ten,
				gioi_tinh: employee.gioi_tinh,
				ngay_sinh: String(employee.ngay_sinh),
				sdt: employee.sdt,
				luong: employee.luong,
				chuc_vu: employee.chuc_vu,
				dia_chi: employee.dia_chi,
				ten_rap_phim: employee.ten_rap,
				ten_quan_ly: employee.ten_quan_ly,
			})
		})

		const csv = generateCsv(csvConfig)(employeeCSV)
		download(csvConfig)(csv)
	}

	return (
		<div className='w-full h-svh'>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode="row"
				showToolbar
				slots={{ toolbar: EditToolbar as GridSlots['toolbar'] }}
				slotProps={{
					toolbar: { handleExport },
				}}
				getRowId={(row) => row.ma_nv}
			/>
		</div>
	);
}
