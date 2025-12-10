import {
	DataGrid,
	Toolbar,
	GridRowModes,
	ToolbarButton,
} from '@mui/x-data-grid';
import type {
	GridRowModesModel,
	GridColDef,
	GridSlots,
	GridSlotProps,
} from '@mui/x-data-grid';
import * as React from 'react'

import type { EmployeeProps } from './EmployeeView.tsx'
import Snackbar from '@mui/material/Snackbar';

import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert'
import type { AlertProps } from '@mui/material/Alert'

import {
	randomId
} from '@mui/x-data-grid-generator'

import { patchEmployee } from '../utils/Query.tsx'

function EditToolbar(slotProps: GridSlotProps['toolbar']) {
	const { setRows, setRowModesModel } = slotProps;

	const handleClick = () => {
		const id = randomId();
		setRows((oldRows) => [
			...oldRows,
			{ id, name: '', age: '', role: '', isNew: true },
		]);

		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
		}));
	};

	return (
		<Toolbar>
			<Tooltip title="Add record">
				<ToolbarButton onClick={handleClick}>
					<AddIcon fontSize="small" />
				</ToolbarButton>
			</Tooltip>
		</Toolbar>
	);
}

export type EmployeeRowProps = {
	ma_nv: string,
	cccd: string,
	ten: string,
	luong: number,
	ngay_sinh: Date,
	chuc_vu: string,
	dia_chi: string,
	sdt: string,
	gioi_tinh: string,
	ma_nv_quan_ly: string,
	ma_rap_phim: string,
	is_new: Boolean
}

const columns: GridColDef[] = [
	{ field: 'ma_nv', headerName: 'Ma NV', width: 100},
	{ field: 'cccd', headerName: 'CCCD', width: 100, editable: true },
	{ field: 'ten', headerName: 'Ho va Ten', width: 200, editable: true },
	{
		field: 'luong',
		headerName: 'Luong',
		type: 'number',
		width: 100,
		editable: true,
	},
	{
		field: 'ngay_sinh',
		headerName: 'Ngay Sinh',
		type: 'date',
		width: 100,
		editable: true,
		valueGetter: (value) => {
			return new Date(value);
		},
	},
	{ field: 'chuc_vu', headerName: 'Chuc Vu', width: 100, editable: true },
	{ field: 'dia_chi', headerName: 'Dia Chi', width: 250, editable: true },
	{ field: 'sdt', headerName: 'SDT', width: 100, editable: true },
	{ field: 'ma_nv_quan_ly', headerName: 'Ma NV Quan Ly', width: 150, editable: true },
	{ field: 'ma_rap_phim', headerName: 'Ma Rap Phim', width: 150, editable: true },
];

export default function EmployeeTable({employees}: {employees : EmployeeProps[] | undefined}){
	if(!employees) return;
	const [rows, setRows] = React.useState(employees);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

	const [snackbar, setSnackbar] = React.useState<Pick<
		AlertProps,
		'children' | 'severity'
	> | null>(null);

	const handleCloseSnackbar = () => setSnackbar(null);

	const processRowUpdate = React.useCallback(
		async (newRow: EmployeeProps) => {
			// Make the HTTP request to save in the backend
			const response = await patchEmployee(newRow);
			setSnackbar({ children: 'User successfully saved', severity: 'success' });
			return response;
		},
		[],
	);

	const handleProcessRowUpdateError = React.useCallback((error: Error) => {
		setSnackbar({ children: error.message, severity: 'error' });
	}, []);

	return (
		<div className='w-full h-96'>
			<DataGrid
				rows={rows}
				columns={columns}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				getRowId={(row) => row.ma_nv}
				slots={{ toolbar: EditToolbar as GridSlots['toolbar'] }}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
			/>
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
		</div>
	);
}
