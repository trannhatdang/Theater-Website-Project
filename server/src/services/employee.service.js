import prisma from "../common/prisma/prisma.init.js";
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnprocessableContentError
} from "../helpers/handleError.js";

export const employeeService = {
	getEmployee: async function(req){
		const {
			ma_nv,
			ten,
			cccd,
			min_ngay_sinh,
			max_ngay_sinh,
			min_luong,
			max_luong,
			chuc_vu,
			dia_chi,
			ma_nv_quan_ly,
			ma_rap_phim,
			gioi_tinh,
			sdt,
			isStrict
		} = req.query

		try{
			if(isStrict){
				const result = await prisma.nhan_vien.findMany({
					where: {
						ma_nv: ma_nv,
						ten: ten,
						cccd: cccd,
						ngay_sinh: {
							gte: min_ngay_sinh ? new Date(min_ngay_sinh) : undefined,
							lte: max_ngay_sinh ? new Date(max_ngay_sinh) : undefined,
						},
						luong: {
							gte: min_luong ? parseInt(min_luong) : undefined,
							lte: max_luong ? parseInt(max_luong) : undefined,
						},
						chuc_vu: chuc_vu,
						dia_chi: dia_chi,
						ma_nv_quan_ly: ma_nv_quan_ly,
						ma_rap_phim: ma_rap_phim,
						gioi_tinh: gioi_tinh
					},
				});

				return result;
			}
			else{
				const result = await prisma.nhan_vien.findMany({
					where: {
						ma_nv: {
							contains: ma_nv,
						},
						ten: {
							contains: ten,
						},
						cccd: {
							contains: cccd,
						},
						ngay_sinh: {
							gte: min_ngay_sinh ? new Date(min_ngay_sinh) : undefined,
							lte: max_ngay_sinh ? new Date(max_ngay_sinh) : undefined,
						},
						luong: {
							gte: min_luong ? parseInt(min_luong) : undefined,
							lte: max_luong ? parseInt(min_luong) : undefined,
						},
						chuc_vu: {
							contains: chuc_vu,
						},
						dia_chi: {
							contains: dia_chi,
						},
						ma_nv_quan_ly: {
							contains: ma_nv_quan_ly,
						},
						ma_rap_phim: {
							contains: ma_rap_phim,
						},
						gioi_tinh: gioi_tinh
					},
				});

				return result;
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	postEmployee: async function(req){
		const {
			ma_nv,
			ten,
			cccd,
			ngay_sinh,
			luong,
			chuc_vu,
			dia_chi,
			ma_nv_quan_ly,
			ma_rap_phim,
			gioi_tinh,
			sdt
		} = req.body;

		try{
			const result = await prisma.nhan_vien.create({
				data:{
					ma_nv: ma_nv,
					ten: ten,
					cccd: cccd,
					ngay_sinh: ngay_sinh ? new Date(ngay_sinh) : undefined,
					luong: luong ? parseInt(luong) : undefined,
					chuc_vu: chuc_vu,
					dia_chi: dia_chi,
					ma_nv_quan_ly: ma_nv_quan_ly,
					ma_rap_phim: ma_rap_phim,
					gioi_tinh: gioi_tinh,
					sdt: sdt,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	patchEmployee: async function(req){
		const {
			ma_nv,
		} = req.query;

		const {
			new_ma_nv,
			new_ten,
			new_cccd,
			new_min_ngay_sinh,
			new_max_ngay_sinh,
			new_min_luong,
			new_max_luong,
			new_chuc_vu,
			new_dia_chi,
			new_ma_nv_quan_ly,
			new_ma_rap_phim,
			new_gioi_tinh,
			new_sdt,
		} = req.body;

		try{
			const result = await prisma.nhan_vien.update({
				where: {
					ma_nv: ma_nv,
				},
				data:{
					ma_nv: new_ma_nv,
					ten: new_ten,
					cccd: new_cccd,
					ngay_sinh: new_ngay_sinh ? new Date(new_ngay_sinh) : undefined,
					luong: new_luong ? parseInt(new_luong) : undefined,
					chuc_vu: new_chuc_vu,
					dia_chi: new_dia_chi,
					ma_nv_quan_ly: new_ma_nv_quan_ly,
					ma_rap_phim: new_ma_rap_phim,
					gioi_tinh: new_gioi_tinh,
					sdt: new_sdt,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	deleteEmployee: async function(req){
		const {
			ma_nv,
		} = req.query;

		try{
			const result = await prisma.employee.delete({
				where:{
					ma_nv: ma_nv,
				},
			});
			return result;
		}
		catch (e){
			throw UnprocessableContentError(e.message);
		}
	},

	getManager: async function(req){
		const { 
			ma_nv,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.quan_tri_vien.findMany({
					where:{
						ma_nv: ma_nv,
					},
				});

				return result;
			}
			else{
				const result = await prisma.quan_tri_vien.findMany({
					where:{
						ma_nv:{
							contains: ma_nv,
						},
					},
				});

				return result;
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	postManager: async function(req){
		const {
			ma_nv 
		} = req.body;

		try{
			const result = await prisma.quan_tri_vien.create({
				data:{
					ma_nv: ma_nv,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	patchManager: async function(req){
		const {
			ma_nv,
		} = req.query;

		const {
			new_ma_nv,
		} = req.body;

		try{
			const result = await prisma.quan_tri_vien.update({
				where:{
					ma_nv: ma_nv
				},
				data:{
					ma_nv: new_ma_nv
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	deleteManager: async function(req){
		const {
			ma_nv
		} = req.query;

		try{
			const result = await prisma.quan_tri_vien.delete({
				where:{
					ma_nv: ma_nv
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getSalesperson: async function(req){
		const {
			ma_nv
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.nhan_vien_ban_hang.findMany({
					where:{
						ma_nv: ma_nv,
					},
				})
				return result;
			}
			else{
				const result = await prisma.nhan_vien_ban_hang.findMany({
					where:{
						ma_nv: {
							contains: ma_nv,
						},
					},
				})
				return result;
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	postSalesperson: async function(req){
		const {
			ma_nv
		} = req.body;

		try{
			const result = await prisma.nhan_vien_ban_hang.create({
				data:{
					ma_nv: ma_nv,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	patchSalesperson: async function(req){
		const {
			ma_nv
		} = req.query;

		const {
			new_ma_nv
		} = req.body;

		try{
			const result = await prisma.nhan_vien_ban_hang.update({
				where:{
					ma_nv: ma_nv
				},
				data:{
					ma_nv: new_ma_nv
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	deleteSalesperson: async function(req){
		const {
			ma_nv 
		} = req.query;

		try{
			const result = await prisma.nhan_vien_ban_hang.delete({
				where:{
					ma_nv: ma_nv,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getWorkShift: async function(req){
		const {
			ma_nv,
			ca_lam_viec,
			min_ngay_lam,
			max_ngay_lam,
			min_thoi_gian_lam,
			max_thoi_gian_lam,
			isStrict
		} = req.query;

		try{
			if(isStrict){
				const result = prisma.ca_lam_viec.findMany({
					where:{
						ma_nv: ma_nv,
						ca_lam_viec: ca_lam_viec,
						ngay_lam: {
							gte: min_ngay_lam ? new Date(min_ngay_lam) : undefined,
							lte: max_ngay_lam ? new Date(max_ngay_lam) : undefined,
						},
						thoi_gian_lam:{
							gte: min_thoi_gian_lam ? parseInt(min_thoi_gian_lam) : undefined,
							lte: max_thoi_gian_lam ? parseInt(max_thoi_gian_lam) : undefined,
						},
					}
				})

				return result;
			}
			else{
				const result = prisma.ca_lam_viec.findMany({
					where:{
						ma_nv: {
							contains: ma_nv,
						},
						ca_lam_viec: {
							contains: ca_lam_viec,
						},
						ngay_lam: {
							gte: min_ngay_lam ? new Date(min_ngay_lam) : undefined,
							lte: max_ngay_lam ? new Date(max_ngay_lam) : undefined,
						},
						thoi_gian_lam:{
							gte: min_thoi_gian_lam ? parseInt(min_thoi_gian_lam) : undefined,
							lte: max_thoi_gian_lam ? parseInt(max_thoi_gian_lam) : undefined,
						},
					}
				});

				return result;
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	postWorkShift: async function(req){
		const { 
			ma_nv,
			ca_lam_viec,
			ngay_lam,
			thoi_gian_lam
		} = req.body;

		try{
			const result = prisma.ca_lam_viec.create({
				data:{
					ma_nv: ma_nv,
					ca_lam_viec: ca_lam_viec,
					ngay_lam: ngay_lam ? new Date(ngay_lam) : undefined,
					thoi_gian: thoi_gian ? parseInt(thoi_gian) : undefined,
				}
			})
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	patchWorkShift: async function(req){
		const { 
			ma_nv,
			ca_lam_viec,
			nay_lam,
		} = req.query;

		const {
			new_ma_nv,
			new_ca_lam_viec,
			new_ngay_lam,
			new_thoi_gian_lam
		} = req.body;

		try{
			const result = await prisma.ca_lam_viec.update({
				where:{
					ma_nv: ma_nv,
				},
				data:{
					ma_nv: new_ma_nv,
					ca_lam_viec: new_ca_lam_viec,
					ngay_lam: new_ngay_lam ? new Date(new_ngay_lam) : undefined,
					thoi_gian_lam: new_thoi_gian_lam ? parseInt(new_thoi_gian_lam) : undefined,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message)
		}
	},
	deleteWorkShift: async function(req){
		const { 
			ma_nv,
			ca_lam_viec,
			ngay_lam,
		} = req.query;

		try{
			const result = await prisma.nhan_vien_ban_hang.delete({
				where:{
					ma_nv: ma_nv,
					ca_lam_viec: ca_lam_viec,
					ngay_lam: ngay_lam,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
}
