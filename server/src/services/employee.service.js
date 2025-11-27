import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const employeeService = {
	get: async function(req){
		const body = req.body;
		const in_ma_nv = body?.ma_nv;
		const in_ten = body?.ten;
		const in_cccd = body?.cccd;
		const in_min_ngay_sinh = body?.min_ngay_sinh;
		const in_max_ngay_sinh = body?.max_ngay_sinh;
		const in_min_gioi_tinh = body?.min_gioi_tinh;
		const in_max_gioi_tinh = body?.max_gioi_tinh;
		const in_min_luong = body?.min_luong;
		const in_max_luong = body?.max_luong;
		const in_chuc_vu = body?.chuc_vu;
		const in_dia_chi = body?.dia_chi;
		const in_ma_nv_quan_ly = body?.ma_nv_quan_ly;
		const in_ma_rap_phim = body?.ma_rap_phim;
		
		const employee = await prisma.nhan_vien.findMany({
			where: {
				ma_nv: {
					contains: in_ma_nv,
				},
				ten: {
					contains: in_ten,
				},
				cccd: {
					contains: cccd,
				},
				ngay_sinh: {
					gte: min_in_ngay_sinh,
					lte: max_in_ngay_sinh,
				},
				gioi_tinh: {
					gte: min_in_gioi_tinh,
					lte: max_in_gioi_tinh,
				},
				luong: {
					gte: min_in_luong,
					lte: max_in_luong,
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
			},
		});

		return employee;
	},
}
