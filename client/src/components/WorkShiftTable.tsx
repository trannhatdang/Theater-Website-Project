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

import type { WorkShiftProps } from './WorkShift.tsx'
import { mkConfig, generateCsv, download } from "export-to-csv";
import dayjs from 'dayjs'
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
	{ field: 'ca_lam_viec', headerName: 'Ca Lam Viec', width: 100, },
	{
		field: 'ngay_lam',
		headerName: 'Ngay Lam',
		type: 'date',
		width: 100,
		valueGetter: (value) => {
			return new Date(value);
		},
		valueFormatter: params => {
			return dayjs(params).format('DD/MM/YYYY')
		}
	},
	{ field: 'thoi_gian_lam', headerName: 'Thoi Gian Lam', width: 100},
];

export default function WorkShiftTable({shifts}: {shifts : WorkShiftProps[] | undefined}){
	if(!shifts) return;
	const [rows, _] = React.useState<WorkShiftProps[]>(shifts);

	const handleExport = () => {
		let shiftCSV : any[] = []

		shifts.forEach((shift) => {
			shiftCSV.push({
				ma_nv: shift.ma_nv,
				ca_lam_viec: shift.ca_lam_viec,
				ngay_lam: shift.ngay_lam,
				thoi_gian_lam: shift.thoi_gian_lam,
			})
		})

		const csv = generateCsv(csvConfig)(shiftCSV)
		download(csvConfig)(csv)
	}

	return (
		<div>
			<div className='w-380 h-200'>
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
		</div>
	);
}
