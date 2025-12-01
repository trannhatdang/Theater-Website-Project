import prisma from "../common/prisma/prisma.init.js";
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnprocessableContentError
} from "../helpers/handleError.js";

export const employeeService = {
	getEmployee: async function(req){
		const query = req.query;
		if(query === undefined){
			throw new BadRequestError("Server expected a query");
		}
		const query_ma_nv = query?.ma_nv;
		const query_ten = query?.ten;
		const query_cccd = query?.cccd;
		const query_min_ngay_sinh = query?.min_ngay_sinh;
		const query_max_ngay_sinh = query?.max_ngay_sinh;
		const query_min_luong = query?.min_luong ? parseInt(query.min_luong) : undefined;
		const query_max_luong = query?.max_luong ? parseInt(query.max_luong) : undefined;
		const query_chuc_vu = query?.chuc_vu;
		const query_dia_chi = query?.dia_chi;
		const query_ma_nv_quan_ly = query?.ma_nv_quan_ly;
		const query_ma_rap_phim = query?.ma_rap_phim;
		const query_gioi_tinh = query?.gioi_tinh;
		const query_sdt = query?.sdt;
		
		const employee = await prisma.nhan_vien.findMany({
			where: {
				ma_nv: {
					contains: query_ma_nv,
				},
				ten: {
					contains: query_ten,
				},
				cccd: {
					contains: query_cccd,
				},
				ngay_sinh: {
					gte: query_min_ngay_sinh,
					lte: query_max_ngay_sinh,
				},
				luong: {
					gte: query_min_luong,
					lte: query_max_luong,
				},
				chuc_vu: {
					contains: query_chuc_vu,
				},
				dia_chi: {
					contains: query_dia_chi,
				},
				ma_nv_quan_ly: {
					contains: query_ma_nv_quan_ly,
				},
				ma_rap_phim: {
					contains: query_ma_rap_phim,
				},
				gioi_tinh: query_gioi_tinh
			},
		});

		return employee;
	},
	postEmployee: async function(req){
		const body = req.body;
		if(body === undefined){
			throw new BadRequestError("Server expected a body");
		}
		const body_ma_nv = body?.ma_nv;
		const body_ten = body?.ten;
		const body_cccd = body?.cccd;
		const body_ngay_sinh = body?.ngay_sinh;
		const body_luong = body?.luong ? parseInt(body.luong) : undefined;
		const body_chuc_vu = body?.chuc_vu;
		const body_dia_chi = body?.dia_chi;
		const body_ma_nv_quan_ly = body?.ma_nv_quan_ly;
		const body_ma_rap_phim = body?.ma_rap_phim;
		const body_gioi_tinh = body?.gioi_tinh;
		const body_sdt = body?.sdt;

		if(body_luong !== undefined && parseInt(body_luong) <= 0){
			throw UnprocessableContentError("Salary must not be lower than 0!");
		}

		if(body_ma_nv === undefined){
			throw UnprocessableContentError("Employee must have an ID!");
		}

		const employee = await prisma.nhan_vien.create({
			data:{
				ma_nv: body_ma_nv,
				ten: body_ten,
				cccd: body_cccd,
				ngay_sinh: body_ngay_sinh,
				luong: body_luong,
				chuc_vu: body_chuc_vu,
				dia_chi: body_dia_chi,
				ma_nv_quan_ly: body_ma_nv_quan_ly,
				ma_rap_phim: body_ma_rap_phim,
				gioi_tinh: body_gioi_tinh,
				sdt: body_sdt
			}
		})
	},
	patchEmployee: async function(req){
		const query = req.query;
		if(query === undefined){
			throw new BadRequestError("Server expected a query");
		}
		const query_ma_nv = query?.ma_nv;
		const query_ten = query?.ten;
		const query_cccd = query?.cccd;
		const query_min_ngay_sinh = query?.min_ngay_sinh;
		const query_max_ngay_sinh = query?.max_ngay_sinh;
		const query_min_luong = query?.min_luong ? parseInt(query.min_luong) : undefined;
		const query_max_luong = query?.max_luong ? parseInt(query.max_luong) : undefined;
		const query_chuc_vu = query?.chuc_vu;
		const query_dia_chi = query?.dia_chi;
		const query_ma_nv_quan_ly = query?.ma_nv_quan_ly;
		const query_ma_rap_phim = query?.ma_rap_phim;
		const query_gioi_tinh = query?.gioi_tinh;
		const query_sdt = query?.sdt;

		const body = req.body;
		if(body === undefined){
			throw new BadRequestError("Server expected a body");
		}
		const body_ma_nv = body?.ma_nv;
		const body_ten = body?.ten;
		const body_cccd = body?.cccd;
		const body_ngay_sinh = body?.ngay_sinh;
		const body_luong = body?.luong ? parseInt(body.luong) : undefined;
		const body_chuc_vu = body?.chuc_vu;
		const body_dia_chi = body?.dia_chi;
		const body_ma_nv_quan_ly = body?.ma_nv_quan_ly;
		const body_ma_rap_phim = body?.ma_rap_phim;
		const body_gioi_tinh = body?.gioi_tinh;
		const body_sdt = body?.sdt;

		const find_employee = await getEmployee(req)
		if(find_employee.length > 0 && body_ma_nv !== undefined){
			throw UnprocessableContentError("Multiple employees can't have the same ID!");
		}

		const employee = await prisma.nhan_vien.upsert({
			where: {
				ma_nv: {
					contains: query_ma_nv,
				},
				ten: {
					contains: query_ten,
				},
				cccd: {
					contains: query_cccd,
				},
				ngay_sinh: {
					gte: query_min_ngay_sinh,
					lte: query_max_ngay_sinh,
				},
				luong: {
					gte: query_min_luong,
					lte: query_max_luong,
				},
				chuc_vu: {
					contains: query_chuc_vu,
				},
				dia_chi: {
					contains: query_dia_chi,
				},
				ma_nv_quan_ly: {
					contains: query_ma_nv_quan_ly,
				},
				ma_rap_phim: {
					contains: query_ma_rap_phim,
				},
				gioi_tinh: query_gioi_tinh
			},
			data:{
				ma_nv: body_ma_nv,
				ten: body_ten,
				cccd: body_cccd,
				ngay_sinh: body_ngay_sinh,
				luong: body_luong,
				chuc_vu: body_chuc_vu,
				dia_chi: body_dia_chi,
				ma_nv_quan_ly: body_ma_nv_quan_ly,
				ma_rap_phim: body_ma_rap_phim,
				gioi_tinh: body_gioi_tinh,
				sdt: body_sdt
			}
		})
	}

}
