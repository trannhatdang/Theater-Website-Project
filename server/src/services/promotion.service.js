import prisma from "../common/prisma/prisma.init.js";
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnprocessableContentError,
} from "../helpers/handleError.js";

export const promotionService = {
	getPromotion: async function(req){
		const { 
			ma_km,
			ten_km,
			loai_km,
			min_thoi_gian_bat_dau,
			max_thoi_gian_bat_dau,
			min_thoi_gian_ket_thuc,
			max_thoi_gian_ket_thuc,
			min_gia_tri,
			max_gia_tri,
			ma_nv_quan_ly,
			isStrict
		} = req.query;

		if(isStrict){
			const result = await prisma.khuyen_mai.findMany({
				where:{
					ma_km: ma_km,
					ten_km: ten_km,
					loai_km: loai_km,
					thoi_gian_bat_dau:{
						gte: min_thoi_gian_bat_dau,
						lte: max_thoi_gian_bat_dau,
					},
					thoi_gian_ket_thuc:{
						gte: min_thoi_gian_ket_thuc,
						lte: max_thoi_gian_ket_thuc,
					},
					gia_tri: {
						gte: min_gia_tri,
						lte: max_gia_tri,
					},
					ma_nv_quan_ly: ma_nv_quan_ly,
				},
			});

			return result;
		}
		else{
			const result = await prisma.khuyen_mai.findMany({
				where:{
					ma_km:{
						contains: ma_km,
					},
					ten_km:{
						contains: ten_km,
					},
					loai_km:{
						contains: loai_km,
					},
					thoi_gian_bat_dau:{
						gte: min_thoi_gian_bat_dau,
						lte: max_thoi_gian_bat_dau,
					},
					thoi_gian_ket_thuc:{
						gte: min_thoi_gian_ket_thuc,
						lte: max_thoi_gian_ket_thuc,
					},
					gia_tri: {
						gte: min_gia_tri,
						lte: max_gia_tri,
					},
					ma_nv_quan_ly:{
						contains: ma_nv_quan_ly,
					},
				},
			});

			return result;
		}
	},

	postPromotion: async function(req){
		const {
			ma_km,
			ten_km,
			loai_km,
			thoi_gian_bat_dau,
			thoi_gian_ket_thuc,
			gia_tri,
			ma_nv_quan_ly,
		} = req.body;

		try{
			if(ma_km === undefined){
				throw Error("Promotion must have an ID!");
			}

			const find_manager = await prisma.nhan_vien_quan_ly.findUnique({
				where:{
					ma_nv: ma_nv_quan_ly,
				},
			});

			if(find_manager === null){
				throw Error("Create corresponding manager first!")
			};

			const find_promotion = await prisma.khuyen_mai.findUnique({
				where:{
					ma_km: ma_km
				}
			});

			if(find_promotion !== null){
				throw Error("Multiple managers can't have the same ID!");
			};
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

		const result = await prisma.khuyen_mai.create({
			data:{
				ma_km: ma_km,
				ten_km: ten_km,
				loai_km: loai_km,
				thoi_gian_bat_dau: thoi_gian_bat_dau,
				thoi_gian_ket_thuc: thoi_gian_ket_thuc,
				gia_tri: gia_tri,
				ma_nv_quan_ly: ma_nv_quan_ly,
			},
		});

		return result;
	},

	patchPromotion: async function(req){
		const {
			ma_km,
		} = req.query;

		const {
			new_ma_km,
			new_ten_km,
			new_loai_km,
			new_thoi_gian_bat_dau,
			new_thoi_gian_ket_thuc,
			new_gia_tri,
			new_ma_nv_quan_ly,
		} = req.body;

		try{
			if(!ma_km){
				throw Error("Promotion needs an ID!");
			}

			const find_employee = await prisma.nhan_vien.findUnique({
				where:{
					ma_km: new_ma_nv_quan_ly,
				},
			});

			if(find_employee === null){
				throw Error("Create corresponding employee first!")
			};

			const find_promotion = await prisma.khuyen_mai.findUnique({
				where:{
					ma_km: ma_km
				}
			});

			if(find_promotion !== null){
				throw Error("Update creates conflicting information");
			};
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}

		const result = await prisma.khuyen_mai.update({
			where:{
				ma_km: ma_nv
			},
			data:{
				ma_km: new_ma_km,
				ten_km: new_ten_km,
				loai_km: new_loai_km,
				thoi_gian_bat_dau: new_thoi_gian_bat_dau,
				thoi_gian_ket_thuc: new_thoi_gian_ket_thuc,
				gia_tri: new_gia_tri,
				ma_nv_quan_ly: new_ma_nv_quan_ly,
			},
		});

		return result;
	},

	deletePromotion: async function(req){
		const {
			ma_km
		} = req.query;

		try{
			const result = await prisma.khuyen_mai.delete({
				where:{
					ma_km: ma_km
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getTheaterPromotion: async function(req){
		const { 
			ma_km,
		} = req.query;

		if(isStrict){
			const result = await prisma.khuyen_mai_toan_rap.findMany({
				where:{
					ma_km: ma_km,
				},
			});
			return result;
		}
		else{
			const result = await prisma.khuyen_mai_toan_rap.findMany({
				where:{
					ma_km:{
						contains: ma_km,
					},
				},
			});
			return result;
		}
	},

	postTheaterPromotion: async function(req){
		const {
			ma_km 
		} = req.body;

		try{
			if(ma_km === undefined){
				throw Error("TheaterPromotion must have an ID!");
			}

			const find_promotion = await prisma.promotion.findUnique({
				where:{
					ma_km: ma_km
				}
			});

			if(find_promotion === null){
				throw Error("Create corresponding promotion first!")
			};

			const find_manager = await prisma.khuyen_mai_toan_rap.findUnique({
				where:{
					ma_km: ma_km
				}
			});

			if(find_manager !== null){
				throw Error("Multiple managers can't have the same ID!");
			};
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

		const result = await prisma.khuyen_mai_toan_rap.create({
			data:{
				ma_km: ma_km,
			},
		});

		return result;
	},

	patchTheaterPromotion: async function(req){
		const {
			ma_km 
		} = req.query;

		const {
			new_ma_km 
		} = req.body;

		try{
			if(!ma_km){
				throw Error("TheaterPromotion must have an ID!");
			}

			const find_promotion = await prisma.promotion.findUnique({
				where:{
					ma_km: new_ma_km,
				},
			});

			if(!find_promotion){
				throw Error("Create corresponding promotion first!")
			};

			const find_promotion = await prisma.promotion.findUnique({
				where:{
					ma_km: new_ma_km,
				},
			});

			if(find_promotion){
				throw Error("Update creates conflicting information!")
			};
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

		const result = await prisma.khuyen_mai_toan_rap.update({
			where:{
				ma_km: ma_km
			},
			data:{
				ma_km: new_ma_km
			}
		});

		return result;
	},

	deleteTheaterPromotion: async function(req){
		const {
			ma_km
		} = req.query;

		try{
			const result = await prisma.khuyen_mai_toan_rap.delete({
				where:{
					ma_km: ma_km
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
}
