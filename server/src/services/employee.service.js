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

		if(isStrict){
			const result = await prisma.nhan_vien.findMany({
				where: {
					ma_nv: ma_nv,
					ten: ten,
					cccd: cccd,
					ngay_sinh: {
						gte: min_ngay_sinh,
						lte: max_ngay_sinh,
					},
					luong: {
						gte: min_luong ? parseInt(min_luong) : undefined,
						lte: max_luong ? parseInt(min_luong) : undefined,
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
						gte: min_ngay_sinh,
						lte: max_ngay_sinh,
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
		} = req.body

		try{
			//missing id
			if(ma_nv === undefined){
				throw Error("Employee must have an ID!");
			}

			//employee already exists
			const find_employee = await prisma.nhan_vien.findUnique({
				where:{
					ma_nv: ma_nv
				}
			})

			if(find_employee !== null){
				throw Error("Employee Already Exists!")
			}

			//constraint: salary must be higher than 0
			if(luong !== undefined && parseInt(luong) <= 0){
				throw Error("Salary must not be lower than 0!");
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}


		const result = await prisma.nhan_vien.create({
			data:{
				ma_nv: ma_nv,
				ten: ten,
				cccd: cccd,
				ngay_sinh: ngay_sinh,
				luong: luong ? parseInt(luong) : undefined,
				chuc_vu: chuc_vu,
				dia_chi: dia_chi,
				ma_nv_quan_ly: ma_nv_quan_ly,
				ma_rap_phim: ma_rap_phim,
				gioi_tinh: gioi_tinh,
				sdt: sdt
			}
		})
		return result
	},
	patchEmployee: async function(req){
		const {
			ma_nv,
		} = req.query

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
		} = req.body

		//constraint: salry must be non-negative
		if(new_luong && parseInt(new_luong)){
			throw new UnprocessableContentError("Salary must be non-negative!");
		}

		const result = await prisma.nhan_vien.upsert({
			where: {
				ma_nv: ma_nv,
			},
			data:{
				ma_nv: new_ma_nv,
				ten: new_ten,
				cccd: new_cccd,
				ngay_sinh: new_ngay_sinh,
				luong: new_luong ? parseInt(new_luong) : undefined,
				chuc_vu: new_chuc_vu,
				dia_chi: new_dia_chi,
				ma_nv_quan_ly: new_ma_nv_quan_ly,
				ma_rap_phim: new_ma_rap_phim,
				gioi_tinh: new_gioi_tinh,
				sdt: new_sdt
			}
		})
		return result
	},
	deleteEmployee: async function(req){
		const {
			ma_nv,
		} = req.query

		try{
			const result = await prisma.employee.delete({
				where:{
					ma_nv: ma_nv,
				}
			})
			return result;
		}
		catch (e){
			throw UnprocessableContentError(e.message);
		}
	},
	getManager: async function(req){
		const {ma_nv, isStrict} = req.query;

		if(isStrict){
			const result = await prisma.quan_tri_vien.findMany({
				where:{
					ma_nv: ma_nv,
				},
			})
			return result;
		}
		else{
			const result = await prisma.quan_tri_vien.findMany({
				where:{
					ma_nv: {
						contains: ma_nv,
					}
				},
			})
			return result;
		}
	},
	postManager: async function(req){
		const { ma_nv } = req.body

		try{
			if(ma_nv === undefined){
				throw Error("Manager must have an ID!");
			}

			const find_employee = await prisma.nhan_vien.findUnique({
				where:{
					ma_nv: ma_nv
				}
			})

			if(find_employee === null){
				throw Error("Create corresponding employee first!")
			}

			const find_manager = await prisma.quan_tri_vien.findUnique({
				where:{
					ma_nv: ma_nv
				}
			});

			if(find_manager !== null){
				throw Error("Multiple managers can't have the same ID!");
			}
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

		const result = await prisma.quan_tri_vien.create({
			data:{
				ma_nv: ma_nv,
			},
		})
		return result
	},
	patchManager: async function(req){
		const { ma_nv } = req.query;
		const { new_ma_nv } = req.body;

		const find_employee = await prisma.nhan_vien.findUnique({
			where:{
				ma_nv: new_ma_nv
			}
		})
		if(find_employee === null){
			throw new UnprocessableContentError("Create corresponding employee first!")
		}

		const result = await prisma.quan_tri_vien.upsert({
			where:{
				ma_nv: ma_nv
			},
			data:{
				ma_nv: new_ma_nv
			}
		})
		return { data }
	},
	deleteManager: async function(req){
		const {ma_nv} = req.query;

		try{
			const result = await prisma.quan_tri_vien.delete({
				where:{
					ma_nv: ma_nv
				}
			})

			return { data }
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	getSalesperson: async function(req){
		const { ma_nv } = req.query;

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
			return { data };
		}
	},
	postSalesperson: async function(req){
		const { ma_nv } = req.body

		try{
			if(ma_nv === undefined){
				throw Error("Salesperson must have an ID!");
			}

			const find_employee = await prisma.nhan_vien.findUnique({
				where:{
					ma_nv: ma_nv
				}
			})

			if(find_employee === null){
				throw Error("Create corresponding employee first!")
			}

			const find_salesperson = await prisma.nhan_vien_ban_hang.findUnique({
				where:{
					ma_nv: ma_nv
				}
			});

			if(find_salesperson.length !== null){
				throw Error("Multiple salespeople can't have the same ID!");
			}
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

		const result = await prisma.nhan_vien_ban_hang.create({
			data:{
				ma_nv: ma_nv,
			},
		})
		return { data }
	},
	patchSalesperson: async function(req){
		const { ma_nv } = req.query;
		const { new_ma_nv } = req.body;

		const find_employee = await prisma.nhan_vien.findUnique({
			where:{
				ma_nv: new_ma_nv
			}
		})

		if(find_employee === null){
			throw new UnprocessableContentError("Create corresponding employee first!")
		}

		const result = await prisma.nhan_vien_ban_hang.upsert({
			where:{
				ma_nv: ma_nv
			},
			data:{
				ma_nv: new_ma_nv
			}
		})
		return { data }
	},
	deleteSalesperson: async function(req){
		const { ma_nv } = req.query;

		try{
			const result = await prisma.nhan_vien_ban_hang.delete({
				where:{
					ma_nv: ma_nv
				}
			})

			return result
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

		if(isStrict){
			const result = prisma.ca_lam_viec.findMany({
				where:{
					ma_nv: ma_nv,
					ca_lam_viec: ca_lam_viec,
					ngay_lam: {
						gte: min_ngay_lam ? parseInt(min_ngay_lam) : undefined,
						lte: max_ngay_lam ? parseInt(max_ngay_lam) : undefined,
					},
					thoi_gian_lam:{
						gte: min_thoi_gian_lam ? parseInt(min_thoi_gian_lam) : undefined,
						lte: max_thoi_gian_lam ? parseInt(max_thoi_gian_lam) : undefined,
					},
				}
			})
			return result
		}
		else{
			const result = prisma.ca_lam_viec.findMany({
				where:{
					ma_nv: {
						contains: ma_nv,
					},
					ca_lam_viec: {
						contains:ca_lam_viec,
					},
					ngay_lam: {
						gte: min_ngay_lam ? parseInt(min_ngay_lam) : undefined,
						lte: max_ngay_lam ? parseInt(max_ngay_lam) : undefined,
					},
					thoi_gian_lam:{
						gte: min_thoi_gian_lam ? parseInt(min_thoi_gian_lam) : undefined,
						lte: max_thoi_gian_lam ? parseInt(max_thoi_gian_lam) : undefined,
					},
				}
			})
			return result
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
			if(ma_nv === undefined || ca_lam_viec === undefined || ngay_lam === undefined){
				throw Error("Missing required field!");
			}

			const find_workshift = prisma.ca_lam_viec.findUnique({
				where:{
					ma_nv: ma_nv,
					ca_lam_viec: ca_lam_viec,
					ngay_lam: ngay_lam
				}
			})

			if(find_workshift !== null){
				throw Error("Shift already exists!");
			}

			const find_employee = prisma.employee.findUnique({
				where:{
					ma_nv: ma_nv
				}
			})
			
			if(find_employee === null){
				throw Error("Create employee first!");
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}

		const result = prisma.ca_lam_viec.create({
			data:{
				ma_nv: ma_nv,
				ca_lam_viec: ca_lam_viec,
				ngay_lam: ngay_lam,
				thoi_gian: thoi_gian
			}
		})
		
		return result
	},
	patchWorkShift: async function(req){
		const { 
			ma_nv,
		} = req.query;

		const {
			new_ma_nv,
			ca_lam_viec,
			ngay_lam,
			thoi_gian_lam
		} = req.body


	},
	deleteWorkShift: async function(req){

	},
}
