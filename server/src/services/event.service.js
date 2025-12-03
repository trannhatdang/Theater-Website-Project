import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const eventService = {
	getEvent: async function(req){
		const body = req.body;
		const in_ma_sk = body?.ma_sk;
		const in_ten_sk = body?.ten_sk;
		const in_quy_mo = body?.quy_mo;
		const in_min_do_tuoi_gioi_han = body?.min_do_tuoi_gioi_han;
		const in_max_do_tuoi_gioi_han = body?.max_do_tuoi_gioi_han;
		const in_min_chi_phi = body?.min_chi_phi;
		const in_max_chi_phi = body?.max_chi_phi;
		const in_min_thoi_gian = body?.min_thoi_gian;
		const in_max_thoi_gian = body?.max_thoi_gian;

		const events = await prisma.su_kien.findMany({
			where:{
				ma_sk:{
					contains: in_ma_sk,
				},
				ten_sk:{
					contains: in_ten_sk,
				},
				quy_mo:{
					contains: in_quy_mo,
				},
				do_tuoi_gioi_han:{
					gte: in_min_do_tuoi_gioi_han,
					lte: in_max_do_tuoi_gioi_han,
				},
				chi_phi:{
					gte: in_min_chi_phi,
					lte: in_max_chi_phi,
				},
				thoi_gian:{
					gte: in_min_thoi_gian,
					lte: in_max_thoi_gian,
				},
			},
		});

		return events;
	}
}
