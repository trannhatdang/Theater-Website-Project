interface EmployeeProps{
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
	ma_rap_phim: string
}

function Employee({
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
	ma_rap_phim	
}: EmployeeProps){
	return (
		<>
			{ma_nv} {SID} {ten} {luong} {ngay_sinh}
		</>
	)

}

export default function EmployeeTable(employees){



	return (
		<>
			{employees.map(employee => () {
				<EmployeeView ma_nv={employee.ma_nv} cccd={employee.cccd} ten={employee.ten} luong={employee.luong} ngay_sinh={employee.ngay_sinh} chuc_vu={employee.chuc_vu} dia_chi={employee.dia_chi} sdt={employee.sdt} gioi_tinh={employee.gioi_tinh} ma_nv_quan_ly={employee.ma_nv_quan_ly} ma_rap_phim={employee.ma_rap_phim}/>
			})}
		</>
	)

}
