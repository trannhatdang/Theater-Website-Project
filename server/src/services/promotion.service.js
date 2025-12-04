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

		try{
			if(isStrict){
				const result = await prisma.khuyen_mai.findMany({
					where:{
						ma_km: ma_km,
						ten_km: ten_km,
						loai_km: loai_km,
						thoi_gian_bat_dau:{
							gte: min_thoi_gian_bat_dau ? new Date(min_thoi_gian_bat_dau) : undefined,
							lte: max_thoi_gian_bat_dau ? new Date(max_thoi_gian_bat_dau) : undefined,
						},
						thoi_gian_ket_thuc:{
							gte: min_thoi_gian_ket_thuc ? new Date(min_thoi_gian_ket_thuc) : undefined,
							lte: max_thoi_gian_ket_thuc ? new Date(max_thoi_gian_ket_thuc) : undefined,
						},
						gia_tri:{
							gte: min_gia_tri ? parseInt(min_gia_tri) : undefined,
							lte: max_gia_tri ? parseInt(max_gia_tri) : undefined,
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
							gte: min_thoi_gian_bat_dau ? new Date(min_thoi_gian_bat_dau) : undefined,
							lte: max_thoi_gian_bat_dau ? new Date(max_thoi_gian_bat_dau) : undefined,
						},
						thoi_gian_ket_thuc:{
							gte: min_thoi_gian_ket_thuc ? new Date(min_thoi_gian_ket_thuc) : undefined,
							lte: max_thoi_gian_ket_thuc ? new Date(max_thoi_gian_ket_thuc) : undefined,
						},
						gia_tri: {
							gte: min_gia_tri ? parseInt(min_gia_tri) : undefined,
							lte: max_gia_tri ? parseInt(max_gia_tri) : undefined,
						},
						ma_nv_quan_ly:{
							contains: ma_nv_quan_ly,
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
			const result = await prisma.khuyen_mai.create({
				data:{
					ma_km: ma_km,
					ten_km: ten_km,
					loai_km: loai_km,
					thoi_gian_bat_dau: thoi_gian_bat_dau ? new Date(thoi_gian_bat_dau) : undefined,
					thoi_gian_ket_thuc: thoi_gian_ket_thuc ? new Date(thoi_gian_ket_thuc) : undefined,
					gia_tri: gia_tri ? parseInt(gia_tri) : undefined,
					ma_nv_quan_ly: ma_nv_quan_ly,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

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
			const result = await prisma.khuyen_mai.update({
				where:{
					ma_km: ma_nv
				},
				data:{
					ma_km: new_ma_km,
					ten_km: new_ten_km,
					loai_km: new_loai_km,
					thoi_gian_bat_dau: new_thoi_gian_bat_dau ? new Date(new_thoi_gian_bat_dau) : undefined,
					thoi_gian_ket_thuc: new_thoi_gian_ket_thuc ? new Date(new_thoi_gian_ket_thuc) : undefined,
					gia_tri: new_gia_tri ? parseInt(new_gia_tri) : undefined,
					ma_nv_quan_ly: new_ma_nv_quan_ly,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
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

		try{
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
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	postTheaterPromotion: async function(req){
		const {
			ma_km 
		} = req.body;

		try{
			const result = await prisma.khuyen_mai_toan_rap.create({
				data:{
					ma_km: ma_km,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	patchTheaterPromotion: async function(req){
		const {
			ma_km,
		} = req.query;

		const {
			new_ma_km,
		} = req.body;

		try{
			const result = await prisma.khuyen_mai_toan_rap.update({
				where:{
					ma_km: ma_km,
				},
				data:{
					ma_km: new_ma_km,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},
	deleteTheaterPromotion: async function(req){
		const {
			ma_km,
		} = req.query;

		try{
			const result = await prisma.khuyen_mai_toan_rap.delete({
				where:{
					ma_km: ma_km,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getRelationExchangePromotion: async function(req){
		const { 
			ma_km,
			ma_khach_hang,
			ten_tai_khoan,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.quy_doi_khuyen_mai.findMany({
					where:{
						ma_km: ma_km,
						ma_khach_hang: ma_khach_hang,
						ten_tai_khoan: ten_tai_khoan,
					},
				});
				return result;
			}
			else{
				const result = await prisma.quy_doi_khuyen_mai.findMany({
					where:{
						ma_km:{
							contains: ma_km,
						},
						ma_khach_hang:{
							contains: ma_khach_hang,
						},
						ten_tai_khoan:{
							contains: ten_tai_khoan,
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

	postRelationExchangePromotion: async function(req){
		const {
			ma_km,
			ma_khach_hang,
			ten_tai_khoan,
		} = req.body;

		try{
			const result = await prisma.quy_doi_khuyen_mai.create({
				data:{
					ma_km: ma_km,
					ma_khach_hang: ma_khach_hang,
					ten_tai_khoan: ten_tai_khoan,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	patchRelationExchangePromotion: async function(req){
		const {
			ma_km,
			ma_khach_hang,
			ten_tai_khoan,
		} = req.query;

		const {
			new_ma_km,
			new_ma_khach_hang,
			new_ten_tai_khoan,
		} = req.body;

		try{
			const result = await prisma.quy_doi_khuyen_mai.update({
				where:{
					ma_km: ma_km,
					ma_khach_hang: ma_khach_hang,
					ten_tai_khoan: ten_tai_khoan,
				},
				data:{
					ma_km: new_ma_km,
					ma_khach_hang: new_ma_khach_hang,
					ten_tai_khoan: new_ten_tai_khoan,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	deleteRelationExchangePromotion: async function(req){
		const {
			ma_km,
			ma_khach_hang,
			ten_tai_khoan,
		} = req.query;

		try{
			const result = await prisma.quy_doi_khuyen_mai.delete({
				where:{
					ma_km: ma_km,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getRelationTheaterPromotion: async function(req){
		const {
			ma_km,
			ma_rap,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.quy_doi_khuyen_mai.findMany({
					where:{
						ma_km: ma_km,
						ma_rap: ma_rap,
					},
				});
				return result;
			}
			else{
				const result = await prisma.quy_doi_khuyen_mai.findMany({
					where:{
						ma_km:{
							contains: ma_km,
						},
						ma_rap:{
							contains: ma_rap,
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

	postRelationTheaterPromotion: async function(req){
		const {
			ma_km,
			ma_rap_phim,
		} = req.body;

		try{
			const result = await prisma.rap_phim_ap_dung_khuyen_mai.create({
				data:{
					ma_km: ma_km,
					ma_rap_phim: ma_rap_phim,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	patchRelationTheaterPromotion: async function(req){
		const {
			ma_km,
			ma_rap_phim,
		} = req.query;

		const {
			new_ma_km,
			new_ma_rap_phim,
		} = req.body;

		try{
			const result = await prisma.quy_doi_khuyen_mai.update({
				where:{
					ma_km: ma_km,
					ma_rap_phim: ma_rap_phim,
				},
				data:{
					ma_km: new_ma_km,
					ma_rap_phim: new_ma_rap_phim,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	deleteRelationTheaterPromotion: async function(req){
		const {
			ma_km,
			ma_rap_phim,
		} = req.query;

		try{
			const result = await prisma.quy_doi_khuyen_mai.delete({
				where:{
					ma_km: ma_km,
					ma_rap_phim: ma_rap_phim,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
}
