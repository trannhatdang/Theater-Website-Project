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
			ma_nv,
		} = req.query;

		const result = await prisma.quan_tri_vien.findMany({
			where:{
				ma_nv: ma_nv,
			},
		});

		return result;
	},

	postPromotion: async function(req){
		const {
			ma_nv 
		} = req.body;

		try{
			if(ma_nv === undefined){
				throw Error("Promotion must have an ID!");
			}

			const find_employee = await prisma.nhan_vien.findUnique({
				where:{
					ma_nv: ma_nv
				}
			});

			if(find_employee === null){
				throw Error("Create corresponding employee first!")
			};

			const find_manager = await prisma.quan_tri_vien.findUnique({
				where:{
					ma_nv: ma_nv
				}
			});

			if(find_manager !== null){
				throw Error("Multiple managers can't have the same ID!");
			};
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

		const result = await prisma.quan_tri_vien.create({
			data:{
				ma_nv: ma_nv,
			},
		});

		return result;
	},

	patchPromotion: async function(req){
		const {
			ma_nv 
		} = req.query;

		const {
			new_ma_nv 
		} = req.body;

		const find_employee = await prisma.nhan_vien.findUnique({
			where:{
				ma_nv: new_ma_nv,
			},
		});

		if(find_employee === null){
			throw new UnprocessableContentError("Create corresponding employee first!")
		};

		const result = await prisma.quan_tri_vien.update({
			where:{
				ma_nv: ma_nv
			},
			data:{
				ma_nv: new_ma_nv
			}
		});

		return result;
	},

	deletePromotion: async function(req){
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


}
