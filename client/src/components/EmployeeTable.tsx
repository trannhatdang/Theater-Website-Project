import {
	DataGrid,
	Toolbar,
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
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import type { AlertProps } from '@mui/material/Alert'

import { patchEmployee, postEmployee, } from '../utils/Query.tsx'

declare module '@mui/x-data-grid' {
	interface ToolbarPropsOverrides {
		handleProcessRowUpdateError: (error: Error) => void,
		handleProcessRowUpdateSuccess: (message: string) => void,
	}
}


function EditToolbar(slotProps: GridSlotProps['toolbar']) {
	const { handleProcessRowUpdateError, handleProcessRowUpdateSuccess } = slotProps
	const [newPanelOpen, setNewPanelOpen] = React.useState(false);
	const newPanelTriggerRef = React.useRef<HTMLButtonElement>(null);

	const handleClose = () => {
		setNewPanelOpen(false);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const employee : EmployeeProps = {
			ma_nv: String(formData.get('ma_nv')),
			cccd: String(formData.get('cccd')),
			ten: String(formData.get('ten')),
			luong: Number(formData.get('luong')),
			ngay_sinh: new Date(String(formData.get('ngay_sinh'))),
			chuc_vu: String(formData.get('chuc_vu')),
			dia_chi: String(formData.get('dia_chi')),
			sdt: String(formData.get('sdt')),
			gioi_tinh: String(formData.get('gioi_tinh')),
			ma_nv_quan_ly: String(formData.get('ma_nv_quan_ly')),
			ma_rap_phim: String(formData.get('ma_rap_phim')),
		}

		try{
			await postEmployee(employee)
			handleProcessRowUpdateSuccess("User successfully created")
		}
		catch(e : any){
			console.log(e.message)
			handleProcessRowUpdateError(e)
		}

		handleClose();
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape') {
			handleClose();
		}
	};

	const handleClick = () => {
		setNewPanelOpen(true)
	};

	return (
		<Toolbar>
			<Tooltip title="Add record">
				<ToolbarButton onClick={handleClick} ref={newPanelTriggerRef}>
					<AddIcon fontSize="small" />
				</ToolbarButton>
			</Tooltip>

			<Popper
				open={newPanelOpen}
				anchorEl={newPanelTriggerRef.current}
				placement="bottom-end"
				id="new-panel"
				onKeyDown={handleKeyDown}
			>
			<ClickAwayListener onClickAway={handleClose}>
				<Paper
					sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					width: 300,
					p: 2,
					}}
					elevation={8}
				>
				<Typography fontWeight="bold">Add new employee</Typography>

				<form onSubmit={handleSubmit}>
					<Stack spacing={2}>

					<TextField
						label="Ma NV"
						name="ma_nv"
						size="small"
						autoFocus
						fullWidth
						required
						defaultValue="NEWNV"
					/>

					<TextField
						label="CCCD"
						name="cccd"
						size="small"
						required
						fullWidth
						defaultValue="999999999"
					/>

					<TextField
						label="Ho Va Ten"
						name="ten"
						size="small"
						fullWidth
					/>

					<TextField
						label="Luong"
						type="number"
						name="luong"
						size="small"
						fullWidth
					/>

					<TextField
						label="Ngay Sinh"
						type="date"
						name="ngay_sinh"
						InputLabelProps={{ shrink: true }}
						size="small"
						fullWidth
					/>

					<TextField
						label="Chuc Vu"
						name="chuc_vu"
						size="small"
						fullWidth
					/>

					<TextField
						label="Dia Chi"
						name="dia_chi"
						size="small"
						fullWidth
					/>

					<TextField
						label="SDT"
						name="sdt"
						size="small"
						fullWidth
					/>

					<TextField
						label="Gioi Tinh"
						name="gioi_tinh"
						size="small"
						fullWidth
					/>

					<TextField
						label="Ma NV Quan Ly"
						name="ma_nv_quan_ly"
						size="small"
						fullWidth
					/>
					
					<TextField
						label="Ma Rap Phim"
						name="ma_rap_phim"
						size="small"
						required
						fullWidth
						defaultValue="R001"
					/>

					<Button type="submit" variant="contained" fullWidth>
					Add Employee
					</Button>

					</Stack>
				</form>
				</Paper>
			</ClickAwayListener>
			</Popper>
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
	const [rows, _] = React.useState<EmployeeProps[]>(employees);
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

	const handleProcessRowUpdateSuccess = React.useCallback((message: string) => {
		setSnackbar({ children: message, severity: 'success' });
	}, []);

	const handleProcessRowUpdateError = React.useCallback((error: Error) => {
		setSnackbar({ children: error.message, severity: 'error' });
	}, []);

	return (
		<div className='w-full h-svh'>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowModesModelChange={setRowModesModel}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				showToolbar
				slots={{ toolbar: EditToolbar as GridSlots['toolbar'] }}
				slotProps={{
					toolbar: { handleProcessRowUpdateError, handleProcessRowUpdateSuccess },
				}}
				getRowId={(row) => row.ma_nv}
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
