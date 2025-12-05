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
	ma_rap_phim: string
}

const Employee = ({
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
}: EmployeeProps) => {
	return (
		<div className='text-white'>
			{ma_nv} {cccd} {ten} {luong} {new Intl.DateTimeFormat("en-GB").format(new Date(ngay_sinh))} {chuc_vu} {dia_chi} {sdt} {gioi_tinh} {ma_nv_quan_ly} {ma_rap_phim}
		</div>
	)
}

export default function EmployeeTable({ employees }: { employees: EmployeeProps[] }) {
    return (
        <>
            {employees.map(employee => (
                <Employee
                    key={employee.ma_nv}
                    ma_nv={employee.ma_nv}
                    cccd={employee.cccd}
                    ten={employee.ten}
                    luong={employee.luong}
                    ngay_sinh={employee.ngay_sinh}
                    chuc_vu={employee.chuc_vu}
                    dia_chi={employee.dia_chi}
                    sdt={employee.sdt}
                    gioi_tinh={employee.gioi_tinh}
                    ma_nv_quan_ly={employee.ma_nv_quan_ly}
                    ma_rap_phim={employee.ma_rap_phim}
                />
            ))}
        </>
    );
}
