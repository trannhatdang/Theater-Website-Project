import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const theaterService = {
	getTheater: async function(req) {
		const query = req.query;
		const query_ma_rap = query?.ma_rap;
		const query_ten = query?.ten;
		const query_dia_chi = query?.dia_chi;
		const query_sdt = query?.sdt;
		const query_min_so_phong = query?.min_so_phong;
		const query_max_so_phong = query?.max_so_phong;

		const theater = await prisma.rap_phim.findMany({
			where:{
				ma_rap: {
					contains: query_ma_rap,
				},
				ten:{
					contains: query_ten,
				},
				dia_chi:{
					contains: query_dia_chi,
				},
				sdt:{
					contains: query_sdt,
				},
				so_phong: {
					gte: parseInt(query_min_so_phong),
					lte: parseInt(query_max_so_phong),
				}
			}
		})

		return theater;
	},
	postTheater: async function(req){
		const body = req.body;
		const body_ma_rap = body?.ma_rap;
		const body_ten = body?.ten;
		const body_dia_chi = body?.dia_chi;
		const body_sdt = body?.sdt;
		const body_so_phong = body?.so_phong;

		if(body_ma_rap !== undefined){
			throw BadRequestError("Theater must have an ID!");
		}

		const find_theater = await prisma.rap_phim.find({
			where:{
				ma_rap: body_ma_rap
			}
		})

		if(find_theater !== null){
			throw BadRequestError("Multiple theaters can't have the same ID!")
		}

		const theater = await prisma.rap_phim.create({
			data:{
				ma_rap: body_ma_rap,
				ten: body_ten,
				dia_chi: body_dia_chi,
				sdt: body_sdt,
				so_phong: parseInt(body_so_phong)
			}
		})

		return theater;
	},
	patchTheater: async function(req){
		const query = req.query;
		const query_ma_rap = query?.ma_rap;
		const query_dia_chi = query?.dia_chi;
		const query_sdt = query?.sdt;
		const query_min_so_phong = query?.min_so_phong;
		const query_max_so_phong = query?.max_so_phong;

		const body = req.body;
		const body_ten = body?.ten;
		const body_dia_chi = body?.dia_chi;
		const body_sdt = body?.sdt;
		const body_so_phong = body?.so_phong;

		const find_theater = await prisma.rap_phim.findMany({
			where:{
				ma_rap: {
					contains: query_ma_rap,
				},
				dia_chi: {
					contains: query_dia_chi,
				},
				sdt: {
					contains: query_sdt,
				},
				so_phong: {
					gte: parseInt(query_min_so_phong),
					lte: parseInt(query_max_so_phong),
				},
			},
		})

		if(find_theater.length > 1 && body_ten !== undefined){
			throw BadRequestError("Multiple theaters can't have the same ID!");
		}

		const theater = await prisma.rap_phim.upsert({
			where:{
				ma_rap: {
					contains: query_ma_rap,
				},
				dia_chi: {
					contains: query_dia_chi,
				},
				sdt: {
					contains: query_sdt,
				},
				so_phong: {
					gte: parseInt(query_min_so_phong),
					lte: parseInt(query_max_so_phong),
				},
			},
			data:{
				ma_rap: body_ma_rap,
				ten: body_ten,
				dia_chi: body_dia_chi,
				sdt: body_dt,
				so_phong: parseInt(body_so_phong)
			}
		})

		return theater;
	},
	deleteTheater: async function(req){
		const query = req.query;
		const query_ma_rap = query?.ma_rap;
		const query_ten = query?.ten;
		const query_dia_chi = query?.dia_chi;
		const query_sdt = query?.sdt;
		const query_so_phong = query?.so_phong;

		try{
			const theater = await prisma.rap_phim.delete({
				where:{
					ma_rap: {
						contains: query_ma_rap,
					},
					ten:{
						contains: query_ten,
					},
					dia_chi:{
						contains: query_dia_chi,
					},
					sdt:{
						contains: query_sdt,
					},
					so_phong: {
						gte: parseInt(query_min_so_phong),
						lte: parseInt(query_max_so_phong),
					},
				},
			})
		}
		catch (e)
		{
			throw BadRequestError(e.message);
		}

		return theater;
	},
	getRoom: async function(req) {
		const query = req.query;
		const query_ma_rap = query?.ma_rap;
		const query_ma_phong = query?.ma_phong;
		const query_min_so_ghe = query?.min_so_ghe;
		const query_max_so_ghe = query?.max_so_ghe;

		const room = await prisma.phong_chieu_phim.findMany({
			where:{
				ma_rap: {
					contains: query_ma_rap,
				},
				ma_phong: {
					contains: query_ma_phong,
				},
				so_ghe: {
					gte: parseInt(query_min_so_ghe),
					lte: parseInt(query_max_so_ghe),
				},
			},
		})

		return room;
	},
	postRoom: async function(req){
		const body = req.body;
		const body_ma_rap = body?.ma_rap;
		const body_ma_phong = body?.ma_phong;
		const body_so_ghe = body?.so_ghe;

		if(body_ma_rap !== undefined || body_ma_phong !== undefined){
			throw BadRequestError("Room must have all required ID fields!")
		}

		const find_room = await prisma.phong_chieu_phim.findUnique({
			where:{
				ma_rap: body_ma_rap,
				ma_phong: body_ma_phong
			}
		})

		if(find_room !== null){
			throw BadRequestError("Multiple rooms can't have the same ID!")
		}

		const room = await prisma.phong_chieu_phim.create({
			data:{
				ma_rap: body_ma_rap,
				ma_phong: body_ma_phong,
				so_ghe: parseInt(body_so_ghe),
			}
		})

		return room;
	},
	patchRoom: async function(req){
		const query = req.query;
		const query_ma_phong = query?.ma_phong;
		const query_ma_rap = query?.ma_rap;
		const query_min_so_ghe = query?.min_so_ghe;
		const query_max_so_ghe = query?.max_so_ghe;

		const body = req.body;
		const in_ma_rap = body?.ma_rap;
		const in_so_ghe = body?.so_ghe;

		const find_room = await prisma_phong_chieu_phim.findMany({
			where:{
				ma_phong: {
					contains: query_ma_phong,
				},
				ma_rap: {
					contains: query_ma_rap,
				},
				so_ghe: {
					gte: parseInt(query_min_so_ghe),
					lte: parseInt(query_max_so_ghe),
				},
			}
		})

		if(find_room.length > 1 && body_ma_phong !== undefined && body_ma_rap !== undefined)
		{
			throw BadRequestError("Multiple rooms can't have the same ID!");
		}

		const room = await prisma.phong_chieu_phim.upsert({
			where:{
				ma_phong: {
					contains: query_ma_phong,
				},
				ma_rap: {
					contains: query_ma_rap,
				},
				so_ghe: {
					gte: parseInt(query_min_so_ghe),
					lte: parseInt(query_max_so_ghe),
				},
			},
			data:{
				ma_phong: body_ma_phong,
				ma_rap: body_ma_rap,
				so_ghe: parseInt(body_so_ghe),
			}
		})

		return room;
	},
	deleteRoom: async function(req){
		const query = req.query;
		const query_ma_phong = query?.ma_phong;
		const query_ma_rap = query?.ma_rap;
		const query_min_so_ghe = query?.min_so_ghe;
		const query_max_so_ghe = query?.max_so_ghe;

		try{
			const room = await prisma.phong_chieu_phim.delete({
				where:{
					ma_phong: {
						contains: query_ma_phong,
					},
					ma_rap: {
						contains: query_ma_rap,
					},
					so_ghe:{
						gte: parseInt(query_min_so_ghe),
						lte: parseInt(query_max_so_ghe)
					},
				},
			})
		}
		catch (e){
			throw BadRequestError(e.message)
		}

		return room;
	},
	getSeat: async function(req) {
		const query = req.query;
		const query_ma_rap = query?.ma_rap;
		const query_ma_phong = query?.ma_phong;
		const query_ma_ghe = query?.ma_ghe;
		const query_loai_ghe = query?.loai_ghe;

		const seat = await prisma.ghe.findMany({
			where:{
				ma_rap: {
					contains: query_ma_rap,
				},
				ma_phong: {
					contains: query_ma_phong,
				},
				so_ghe: {
					gte: parseInt(query_min_so_ghe),
					lte: parseInt(query_max_so_ghe),
				},
			},
		})

		return seat;
	},
	postSeat: async function(req){
		const body = req.body;
		const body_ma_rap = body?.ma_rap;
		const body_ma_phong = body?.ma_phong;
		const body_ma_ghe = body?.ma_ghe;
		const body_loai_ghe = body?.loai_ghe;

		if(body_ma_rap !== undefined || body_ma_phong !== undefined || body_ma_ghe !== undefined){
			throw BadRequestError("Seat must have all required ID fields!")
		}

		const find_seat = await prisma.ghe.findMany({
			where:{
				ma_rap: body_ma_rap,
				ma_phong: body_ma_phong,
				ma_ghe: body_ma_ghe
			}
		})

		if(find_seat !== null){
			throw BadRequestError("Multiple seats can't have the same ID!")
		}

		const seat = await prisma.ghe.create({
			data:{
				ma_rap: body_ma_rap,
				ma_phong: body_ma_phong,
				ma_ghe: body_ma_ghe,
				loai_ghe: body_loai_ghe,
			}
		})

		return seat;
	},
	patchSeat: async function(req){
		const query = req.query;
		const query_ma_rap = query?.ma_rap;
		const query_ma_phong = query?.ma_phong;
		const query_ma_ghe = query?.ma_ghe;
		const query_loai_ghe = query?.loai_ghe;

		const body = req.body;
		const body_ma_rap = body?.ma_rap;
		const body_ma_phong = body?.ma_phong;
		const body_ma_ghe = body?.ma_ghe;
		const body_loai_ghe = body?.loai_ghe;

		const find_seat = await prisma.ghe.findMany({
			where:{
				ma_rap:{
					contains: query_ma_rap,
				},
				ma_phong:{
					contains: query_ma_phong,
				},
				ma_ghe:{
					contains: query_ma_rap,
				},
				loai_ghe:{
					contains: query_loai_ghe,
				},
			},
		})

		if(find_seat.length > 1 && body_ma_rap !== undefined && body_ma_phong !== undefined && body_ma_ghe !== undefined){
			throw BadRequestError("Multiple seats can't have the same ID!");
		}

		const seat = await prisma.ghe.upsert({
			where:{
				ma_rap:{
					contains: query_ma_rap,
				},
				ma_phong:{
					contains: query_ma_phong,
				},
				ma_ghe:{
					contains: query_ma_rap,
				},
				loai_ghe:{
					contains: query_loai_ghe,
				},
			},
			data:{
				ma_rap: body_ma_rap,
				ma_phong: body_ma_phong,
				ma_ghe: body_ma_ghe,
				loai_ghe: body_loai_ghe
			}
		})

		return seat;
	},
	deleteSeat: async function(req){
		const query = req.query;
		const query_ma_rap = query?.ma_rap;
		const query_ma_phong = query?.ma_phong;
		const query_ma_ghe = query?.ma_ghe;
		const query_loai_ghe = query?.loai_ghe;

		try{
			const seat = await prisma.ghe.delete({
				where:{
					ma_rap: {
						contains: query_ma_rap,
					},
					ma_phong: {
						contains: query_ma_phong,
					},
					ma_ghe: {
						contains: query_ma_ghe,
					},
					loai_ghe: {
						contains: query_loai_ghe,
					},
				},
			})
		}
		catch (e)
		{
			throw BadRequestError(e.message);
		}

		return seat;
	},
}
