import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const employeeService = {
	get: async function(req){
		const query = req.query;
		const in_ma_nv = query?.ma_nv;
		const in_ten = query?.ten;
		const in_cccd = query?.cccd;
		const in_min_ngay_sinh = query?.min_ngay_sinh;
		const in_max_ngay_sinh = query?.max_ngay_sinh;
		const in_min_luong = query?.min_luong;
		const in_max_luong = query?.max_luong;
		const in_chuc_vu = query?.chuc_vu;
		const in_dia_chi = query?.dia_chi;
		const in_ma_nv_quan_ly = query?.ma_nv_quan_ly;
		const in_ma_rap_phim = query?.ma_rap_phim;
		const in_gioi_tinh = query?.gioi_tinh;
		const in_sdt = query?.sdt;
		
		const employee = await prisma.nhan_vien.findMany({
			where: {
				ma_nv: {
					contains: in_ma_nv,
				},
				ten: {
					contains: in_ten,
				},
				cccd: {
					contains: in_cccd,
				},
				ngay_sinh: {
					gte: in_min_ngay_sinh,
					lte: in_max_ngay_sinh,
				},
				luong: {
					gte: in_min_luong,
					lte: in_max_luong,
				},
				chuc_vu: {
					contains: in_chuc_vu,
				},
				dia_chi: {
					contains: in_dia_chi,
				},
				ma_nv_quan_ly: {
					contains: in_ma_nv_quan_ly,
				},
				ma_rap_phim: {
					contains: in_ma_rap_phim,
				},
				gioi_tinh: in_gioi_tinh
			},
		});

		return employee;
	},
}
