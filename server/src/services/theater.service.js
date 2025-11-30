import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const theaterService = {
	getTheater: async function(req) {
		const query = req.query;
		const in_ma_rap = query?.ma_rap;
		const in_ten = query?.ten;
		const in_dia_chi = query?.dia_chi;
		const in_sdt = query?.sdt;
		const in_min_so_phong = query?.min_so_phong;
		const in_max_so_phong = query?.max_so_phong;

		const theater = await prisma.rap_phim.findMany({
			where:{
				ma_rap: in_ma_rap,
				ten:{
					contains: in_ten,
				},
				dia_chi:{
					contains: in_dia_chi,
				},
				sdt:{
					contains: in_sdt,
				},
				so_phong: {
					gte: in_min_so_phong,
					lte: in_max_so_phong,
				}
			}
		})

		return theater;
	},
	postTheater: async function(req){
		const body = req.body;
		const in_ma_rap = body?.ma_rap;
		const in_ten = body?.ten;
		const in_dia_chi = body?.dia_chi;
		const in_sdt = body?.sdt;
		const in_so_phong = body?.so_phong;

		const theater = await prisma.rap_phim.findMany({
			data:{
				ma_rap: in_ma_rap,
				ten: in_ten,
				dia_chi: in_dia_chi,
				sdt: in_sdt,
				so_phong: in_so_phong
			}
		})
	},
	patchTheater: async function(req){

	},
	deleteTheater: async function(req){

	},
	getRoom: async function(req) {

	},
	postRoom: async function(req){

	},
	patchRoom: async function(req){

	},
	deleteRoom: async function(req){

	},
	getSeat: async function(req) {

	},
	postSeat: async function(req){

	},
	patchSeat: async function(req){

	},
	deleteSeat: async function(req){

	},
}
