import {
	GridRowModes,
	DataGrid,
	GridRowEditStopReasons,
	Toolbar,
	ToolbarButton,
	gridEditRowsStateSelector,
	useGridSelector,
	useGridApiContext,
	GridActionsCell,
	GridActionsCellItem,
} from '@mui/x-data-grid';
import type {
	GridRowsProp,
	GridRowModesModel,
	GridRowId,
	GridRowModel,
	GridColDef,
	GridEventListener,
	GridSlotProps,
	GridSlots,
	GridRenderCellParams,
} from '@mui/x-data-grid';
import * as React from 'react'
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import type { EmployeeProps } from './EmployeeView.tsx'
import Snackbar from '@mui/material/Snackbar';

import Alert from '@mui/material/Alert'
import type { AlertProps } from '@mui/material/Alert';

import { patchEmployee } from '../utils/Query.tsx'

const useMutation = () => {
	return React.useCallback(
		(employee: EmployeeProps) => 
			new Promise<EmployeeProps>((resolve, reject) => {
				patchEmployee(employee).then(resolve(employee), reject())
			}),
		[]
	)
}

const columns: GridColDef[] = [
	{ field: 'ma_nv', headerName: 'Ma NV', width: 100, editable: true },
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
	{
		field: 'actions',
		type: 'actions',
		headerName: 'Actions',
		width: 100,
		cellClassName: 'actions',
		renderCell: (params) => <ActionsCell {...params} />,
	},
];

declare module '@mui/x-data-grid' {
	interface ToolbarPropsOverrides {
		setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
		setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
		) => void;
	}
}

function EditToolbar(props: GridSlotProps['toolbar']) {
	const { setRows, setRowModesModel } = props;

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

interface ActionHandlers {
	handleCancelClick: (id: GridRowId) => void;
	handleDeleteClick: (id: GridRowId) => void;
	handleEditClick: (id: GridRowId) => void;
	handleSaveClick: (id: GridRowId) => void;
}

const ActionHandlersContext = React.createContext<ActionHandlers>({
	handleCancelClick: () => {},
	handleDeleteClick: () => {},
	handleEditClick: () => {},
	handleSaveClick: () => {},
});

function ActionsCell(props: GridRenderCellParams) {
	const apiRef = useGridApiContext();
	const rowModesModel = useGridSelector(apiRef, gridEditRowsStateSelector);
	const isInEditMode = typeof rowModesModel[props.id] !== 'undefined';

	const { handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick } =
	React.useContext(ActionHandlersContext);

	return (
		<GridActionsCell {...props}>
			{isInEditMode ? (
				<React.Fragment>
					<GridActionsCellItem
						icon={<SaveIcon />}
						label="Save"
						material={{ sx: { color: 'primary.main' } }}
						onClick={() => handleSaveClick(props.id)}
					/>
					<GridActionsCellItem
						icon={<CancelIcon />}
						label="Cancel"
						className="textPrimary"
						onClick={() => handleCancelClick(props.id)}
						color="inherit"
					/>
				</React.Fragment>
			) : (
				<React.Fragment>
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={() => handleEditClick(props.id)}
						color="inherit"
					/>
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={() => handleDeleteClick(props.id)}
						color="inherit"
					/>
				</React.Fragment>
			)}
		</GridActionsCell>
	);
}

export default function EmployeeTable({employees}: {employees : EmployeeProps[] | undefined}){
	if(!employees) return;
	const rows = employees;

	const mutateRow = useMutation()
	const [snackbar, setSnackbar] = React.useState<Pick<
		AlertProps,
		'children' | 'severity'
	> | null>(null);
	const [rows, setRows] = React.useState(initialRows);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

	const handleCloseSnackbar = () => setSnackbar(null);
	const processRowUpdate = React.useCallback(
		async (newRow: GridRowModel) => {
			const response = await mutateRow(newRow);
			setSnackbar({ children: 'User successfully saved', severity: 'success'});
			return response;
		},
		[mutateRow],
	)
	
	const handleProcessRowUpdateError = React.useCallback((error: Error) => {
		setSnackbar({ children: error.message, severity: 'error' });
	}, []);

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
		event.defaultMuiPrevented = true;
		}
	};

	const actionHandlers = React.useMemo<ActionHandlers>(
		() => ({
			handleEditClick: (id: GridRowId) => {
				setRowModesModel((prevRowModesModel) => ({
					...prevRowModesModel,
					[id]: { mode: GridRowModes.Edit },
				}));
			},
			handleSaveClick: (id: GridRowId) => {
				setRowModesModel((prevRowModesModel) => ({
					...prevRowModesModel,
					[id]: { mode: GridRowModes.View },
				}));
			},
			handleDeleteClick: (id: GridRowId) => {
				setRows((prevRows) => prevRows.filter((row) => row.id !== id));
			},
			handleCancelClick: (id: GridRowId) => {
				setRowModesModel((prevRowModesModel) => {
					return {
						...prevRowModesModel,
						[id]: { mode: GridRowModes.View, ignoreModifications: true },
					};
				});

				setRows((prevRows) => {
					const editedRow = prevRows.find((row) => row.id === id);
					if (editedRow!.isNew) {
						return prevRows.filter((row) => row.id !== id);
					}
						return prevRows;
					});
				},
			}),
		[],
	);

	return (
		<div className='max-w-screen'>
			<ActionHandlersContext.Provider value={actionHandlers}>
				<DataGrid
					rows={rows}
					columns={columns}
					processRowUpdate={processRowUpdate}
					onProcessRowUpdateError={handleProcessRowUpdateError}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={setRowModesModel}
					onRowEditStop={handleRowEditStop}
					showToolbar
					slots={{ toolbar: EditToolbar as GridSlots['toolbar'] }}
					slotProps={{
						toolbar: { setRows, setRowModesModel },
					}}
					getRowId={(row)=>{return row.ma_nv}}
				/>
			</ActionHandlersContext.Provider>

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
