export interface EmployeeProps{
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
}
interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    selectedCellParams: SelectedCellParams | null;
    cellModesModel: GridCellModesModel;
    setCellModesModel: (value: GridCellModesModel) => void;
    cellMode: 'view' | 'edit';
  }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } = props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === 'edit') {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Toolbar>
      <Tooltip title={cellMode === 'edit' ? 'Save' : 'Edit'}>
        <ToolbarButton onClick={handleSaveOrEdit}>
          {cellMode === 'edit' ? (
            <SaveIcon fontSize="small" />
          ) : (
            <EditIcon fontSize="small" />
          )}
        </ToolbarButton>
      </Tooltip>
      {cellMode === 'edit' && (
        <Tooltip title="Cancel">
          <ToolbarButton onClick={handleCancel} onPointerDown={handlePointerDown}>
            <CancelIcon fontSize="small" />
          </ToolbarButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

/*const Employee = (employeeProps : EmployeeProps) => {
	const {
		ma_nv,
		cccd,
		ten,
		luong,
		ngay_sinh,
		chuc_vu,
		dia_chi,
		sdt,
		gioi_tinh,
		ma_nv_quan_ly,
		ma_rap_phim,
	} = employeeProps;

	return (
		<Paper className='text-white w-full'>
			<div className='text-white flex'>
				{ma_nv} {cccd} {ten} {luong} {new Intl.DateTimeFormat("en-GB").format(new Date(ngay_sinh))} {chuc_vu} {dia_chi} {sdt} {gioi_tinh} {ma_nv_quan_ly} {ma_rap_phim}
			</div>
		</Paper>
	)
}*/

export default function EmployeeTable({employees}: {employees : EmployeeProps[] | undefined}){
	if(!employees) return;
	let rows = employees;
  const [selectedCellParams, setSelectedCellParams] =
    React.useState<SelectedCellParams | null>(null);
  const [cellModesModel, setCellModesModel] = React.useState<GridCellModesModel>({});

  const handleCellFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget.parentElement;
      const id = row!.dataset.id!;
      const field = event.currentTarget.dataset.field!;
      setSelectedCellParams({ id, field });
    },
    [],
  );

  const cellMode = React.useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

	const handleCellKeyDown = React.useCallback<GridEventListener<'cellKeyDown'>>(
		(_, event) => {
			if(cellMode === 'edit'){
				event.defaultMuiPrevented = true
			}
		},
		[cellMode],
	);

	const handleCellEditStop = React.useCallback<GridEventListener<'cellEditStop'>>(
		(_, event) => {
			if(cellMode === 'edit'){
				event.defaultMuiPrevented = true
			}
		},
		[],
	);

  return (
    <div className='max-w-screen'>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellKeyDown={handleCellKeyDown}
        cellModesModel={cellModesModel}
        onCellEditStop={handleCellEditStop}
        onCellModesModelChange={(model) => setCellModesModel(model)}
        slots={{ toolbar: EditToolbar }}
        showToolbar
        slotProps={{
          toolbar: {
            cellMode,
            selectedCellParams,
            cellModesModel,
            setCellModesModel,
          },
          cell: {
            onFocus: handleCellFocus,
          },
        }}
	getRowId={(row)=>{return row.ma_nv}}
      />
    </div>
  );
}
