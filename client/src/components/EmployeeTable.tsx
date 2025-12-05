import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
export type EmployeeProps = {
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

const columns: GridColDef[] = [
	{ field: 'ma_nv', headerName: 'Ma NV', width: 100 },
	{ field: 'cccd', headerName: 'CCCD', width: 200 },
	{ field: 'ten', headerName: 'Ho va Ten', width: 200 },
	{
		field: 'luong',
		headerName: 'Luong',
		type: 'number',
		width: 200,
	},
	{
		field: 'ngay_sinh',
		headerName: 'Ngay Sinh',
		type: 'date',
		width: 200,
		valueGetter: (value) => {
			return new Date(value);
		}
	},

];

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

	return (
		<>
			<DataGrid
				rows={rows}
				columns={columns}
				getRowId={(row) => row.ma_nv}
			/>

			{/*employees.map(employee => 
				<Employee key={employee.ma_nv} ma_nv={employee.ma_nv} cccd={employee.cccd} ten={employee.ten} luong={employee.luong} ngay_sinh={employee.ngay_sinh} chuc_vu={employee.chuc_vu} dia_chi={employee.dia_chi} sdt={employee.sdt} gioi_tinh={employee.gioi_tinh} ma_nv_quan_ly={employee.ma_nv_quan_ly} ma_rap_phim={employee.ma_rap_phim}/>
			)*/}
		</>
	)

}
