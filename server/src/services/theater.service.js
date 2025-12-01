import prisma from "../common/prisma/prisma.init.js";
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnprocessableContentError
} from "../helpers/handleError.js";

export const theaterService = {
	getTheater: async function(req) {
		const {
			ma_rap,
			ten,
			dia_chi,
			sdt,
			min_so_phong,
			max_so_phong,
			isStrict
		} = req.query;

		if(isStrict){
			const result = await prisma.rap_phim.findMany({
				where:{
					ma_rap: ma_rap,
					ten: ten,
					dia_chi: dia_chi,
					sdt: sdt,
				}
			})
			return result
		}
		else{
			const result = await prisma.rap_phim.findMany({
				where:{
					ma_rap: {
						contains: ma_rap,
					},
					ten:{
						contains: ten,
					},
					dia_chi:{
						contains: dia_chi,
					},
					sdt:{
						contains: sdt,
					},
					so_phong: {
						gte: min_so_phong ? parseInt(min_so_phong) : undefined,
						lte: max_so_phong ? parseInt(max_so_phong) : undefined,
					}
				}
			})
			return result
		}
	},
	postTheater: async function(req){
		const {
			ma_rap,
			ten,
			dia_chi,
			sdt,
			so_phong
		} = req.body;

		try{
			//theater must have an ID
			if(!ma_rap){
				throw Error("Theater must have an ID!");
			}

			//theater already exists
			const find_theater = await prisma.rap_phim.findUnique({
				where:{
					ma_rap: ma_rap
				}
			})

			if(find_theater){
				throw Error("Multiple theaters can't have the same ID!")
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message)
		}

		const result = await prisma.rap_phim.create({
			data:{
				ma_rap: ma_rap,
				ten: ten,
				dia_chi: dia_chi,
				sdt: sdt,
				so_phong: so_phong ? parseInt(so_phong) : undefined
			}
		})

		return result;
	},
	patchTheater: async function(req){
		const {ma_rap} = req.query;
		const {
			new_ma_rap,
			new_ten,
			new_dia_chi,
			new_sdt,
			new_so_phong
		} = req.body;

		try{
			//update creates conflicting info
			const find_theater = await prisma.rap_phim.findUnique({
				where:{
					ma_rap: new_ma_rap
				}
			})

			if(find_theater){
				throw Error("Update creates conflicting information!")
			}

			const result = await prisma.rap_phim.update({
				where:{
					ma_rap: ma_rap,
				},
				data:{
					ma_rap: new_ma_rap,
					ten: new_ten,
					dia_chi: new_dia_chi,
					sdt: new_sdt,
					so_phong: new_so_phong,
				}
			})
		}
		return result;
	},
	deleteTheater: async function(req){
		const {ma_rap} = req.query;

		try{
			const result = await prisma.rap_phim.delete({
				where:{
					ma_rap: ma_rap
				},
			})
			return result;
		}
		catch (e)
		{
			throw new UnprocessableContentError(e.message);
		}
	},
	getRoom: async function(req) {
		const {
			ma_rap,
			ma_phong,
			min_so_ghe,
			max_so_ghe,
			isStrict
		} = req.query;

		if(isStrict){
			const result = await prisma.phong_chieu_phim.findMany({
				where:{
					ma_rap: ma_rap,
					ma_phong: ma_phong,
					so_ghe:{
						gte: min_so_ghe,
						lte: max_so_ghe,
					},
				},
			})
			return result;
		}
		else{
			const result = await prisma.phong_chieu_phim.findMany({
				where:{
					ma_rap: {
						contains: ma_rap,
					},
					ma_phong: {
						contains: ma_phong,
					},
					so_ghe: {
						gte: min_so_ghe,
						lte: max_so_ghe,
					},
				},
			})
			return result;
		}
	},
	postRoom: async function(req){
		const {
			ma_rap,
			ma_phong,
			so_ghe
		} = req.body;

		try{
			//all required ID fields are required
			if(ma_rap || ma_phong){
				throw Error("Room must have all required ID fields!")
			}

			//room with that id already exists
			const find_room = await prisma.phong_chieu_phim.findUnique({
				where:{
					ma_rap: ma_rap,
					ma_phong: ma_phong
				}
			})

			if(find_room){
				throw Error("Multiple rooms can't have the same ID!")
			}

			//theater that has the room doesn't exist
			const find_theater = await prisma.rap_phim.findUnique({
				where:{
					ma_rap: ma_rap
				}
			})

			if(find_theater){
				throw Error("Requested theater doesn't exist!")
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}

		const result = await prisma.phong_chieu_phim.create({
			data:{
				ma_rap: ma_rap,
				ma_phong: ma_phong,
				so_ghe: so_ghe,
			}
		})

		return result;
	},
	patchRoom: async function(req){
		const {ma_phong} = req.query;
		const {
			new_ma_phong,
			new_ma_rap,
			new_so_ghe
		} = req.body;

		const result = await prisma.phong_chieu_phim.update({
			where:{
				ma_rap: ma_rap,
				ma_phong: ma_phong,
				so_ghe:{
					gte: min_so_ghe,
					lte: max_so_ghe,
				},
			},
			data:{
				ma_phong: new_ma_phong,
				ma_rap: new_ma_rap,
				so_ghe: new_so_ghe,
			}
		})
		return result;
	},
	deleteRoom: async function(req){
		const {
			ma_phong,
			ma_rap,
			so_ghe
		} = req.query;

		try{
			const result = await prisma.phong_chieu_phim.delete({
				where:{
					ma_phong: ma_phong,
					ma_rap: ma_rap,
					so_ghe: so_ghe ? parseInt(so_ghe) : undefined,
				},
			})
			return result
		}
		catch (e){
			throw UnprocessableContentError(e.message)
		}
	},
	getSeat: async function(req) {
		const {
			ma_rap,
			ma_phong,
			ma_ghe,
			loai_ghe,
			isStrict
		} = req.query;

		if(isStrict){
			const result = await prisma.ghe.findMany({
				where:{
					ma_rap: ma_rap,
					ma_phong: ma_phong,
					ma_ghe: ma_ghe,
					loai_ghe: loai_ghe
				},
			})
			return result;
		}
		else{
			const seat = await prisma.ghe.findMany({
				where:{
					ma_rap: {
						contains: ma_rap,
					},
					ma_phong: {
						contains: ma_phong,
					},
					ma_ghe: {
						contains: ma_ghe,
					},
					loai_ghe: {
						contains: loai_ghe
					},
				},
			})
			return result;
		}
	},
	postSeat: async function(req){
		const {
			ma_rap,
			ma_phong,
			ma_ghe,
			loai_ghe
		} = req.body;

		try{
			//all ids are needed
			if(!ma_rap || !body_ma_phong || !body_ma_ghe){
				throw Error("Seat must have all required ID fields!")
			}

			//seat type is required
			if(!loai_ghe){
				throw Error("Seat must have a type!")
			}

			//there is a seat that has the same id
			const find_seat = await prisma.ghe.findMany({
				where:{
					ma_rap: ma_rap,
					ma_phong: ma_phong,
					ma_ghe: ma_ghe
				}
			})

			if(find_seat){
				throw Error("Multiple seats can't have the same ID!")
			}

			//the room that the seat belongs to doesn't exist
			const find_room = await prisma.phong_chieu_phim.findUnique({
				where:{
					ma_rap: ma_rap,
					ma_phong: ma_phong
				}
			})

			if(!find_room){
				throw Error("Requested room doesn't exist!");
			}
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

		const result = await prisma.ghe.create({
			data:{
				ma_rap: ma_rap,
				ma_phong: ma_phong,
				ma_ghe: ma_ghe,
				loai_ghe: loai_ghe,
			}
		})

		return result;
	},
	patchSeat: async function(req){
		const { ma_rap}  = req.query;
		const {
			new_ma_rap,
			new_ma_phong,
			new_ma_ghe,
			new_loai_ghe
		} = req.body;

		try{
			const find_seat = await prisma.get.findUnique({
				where:{
					ma_rap: new_ma_rap,
					ma_phong: new_ma_phong,
					ma_ghe: new_ma_ghe
				}
			})

			//patch creates conflicting data
			if(find_seat){
				throw Error("New information conflicts with existing data!")
			}

			const result = await prisma.ghe.update({
				where:{
					ma_rap: ma_rap,
				},
				data:{
					ma_rap: new_ma_rap,
					ma_phong: new_ma_phong,
					ma_ghe: new_ma_ghe,
					loai_ghe: new_loai_ghe
				},
			})
		}
		catch(e){
			throw new UnprocessableContentError(e.message)
		}

		return result
	},
	deleteSeat: async function(req){
		const {
			ma_rap,
			ma_phong,
			ma_ghe,
			loai_ghe
		} = req.query;

		try{
			const result = await prisma.ghe.delete({
				where:{
					ma_rap: ma_rap,
					ma_phong: ma_phong,
					ma_ghe: ma_ghe,
					loai_ghe: loai_ghe,
				},
			})
			return result;
		}
		catch (e)
		{
			throw UnprocessableContentError(e.message);
		}
	},
}
