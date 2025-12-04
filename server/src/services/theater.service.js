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
			isStrict,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.rap_phim.findMany({
					where: {
						ma_rap: ma_rap,
						ten: ten,
						dia_chi: dia_chi,
						sdt: sdt,
						so_phong: {
							gte: min_so_phong ? parseInt(min_so_phong) : undefined,
							lte: max_so_phong ? parseInt(max_so_phong) : undefined,
						},
					},
				});

				return result;
			}
			else{
				const result = await prisma.rap_phim.findMany({
					where: {
						ma_rap: {
							contains: ma_rap,
						},
						ten: {
							contains: ten,
						},
						dia_chi: {
							contains: dia_chi,
						},
						sdt: {
							contains: sdt,
						},
						so_phong: {
							gte: min_so_phong ? parseInt(min_so_phong) : undefined,
							lte: max_so_phong ? parseInt(max_so_phong) : undefined,
						}
					}
				})

				return result;
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
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
			const result = await prisma.rap_phim.create({
				data: {
					ma_rap: ma_rap,
					ten: ten,
					dia_chi: dia_chi,
					sdt: sdt,
					so_phong: so_phong ? parseInt(so_phong) : undefined
				}
			})

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message)
		}

	},
	patchTheater: async function(req){
		const { 
			ma_rap
		} = req.query;

		const {
			new_ma_rap,
			new_ten,
			new_dia_chi,
			new_sdt,
			new_so_phong
		} = req.body;

		try{
			const result = await prisma.rap_phim.update({
				where: {
					ma_rap: ma_rap,
				},
				data: {
					ma_rap: new_ma_rap,
					ten: new_ten,
					dia_chi: new_dia_chi,
					sdt: new_sdt,
					so_phong: new_so_phong ? parseInt(new_so_phong) : undefined,
				}
			})
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

		return result;
	},
	deleteTheater: async function(req){
		const {
			ma_rap
		} = req.query;

		try{
			const result = await prisma.rap_phim.delete({
				where: {
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

		try{
			if(isStrict){
				const result = await prisma.phong_chieu_phim.findMany({
					where: {
						ma_rap: ma_rap,
						ma_phong: ma_phong,
						so_ghe: {
							gte: min_so_ghe ? parseInt(min_so_ghe) : undefined,
							lte: max_so_ghe ? parseInt(max_so_ghe) : undefined,
						},
					},
				})
				return result;
			}
			else{
				const result = await prisma.phong_chieu_phim.findMany({
					where: {
						ma_rap: {
							contains: ma_rap,
						},
						ma_phong: {
							contains: ma_phong,
						},
						so_ghe: {
							gte: min_so_ghe ? parseInt(min_so_ghe) : undefined,
							lte: max_so_ghe ? parseInt(max_so_ghe) : undefined,
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
	postRoom: async function(req){
		const {
			ma_rap,
			ma_phong,
			so_ghe
		} = req.body;

		try{
			const result = await prisma.phong_chieu_phim.create({
				data: {
					ma_rap: ma_rap,
					ma_phong: ma_phong,
					so_ghe: so_ghe ? parseInt(so_ghe) : undefined,
				}
			})

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}

	},
	patchRoom: async function(req){
		const { 
			ma_phong,
			ma_rap,
		} = req.query;

		const {
			new_ma_phong,
			new_ma_rap,
			new_so_ghe
		} = req.body;

		try{
			const result = await prisma.phong_chieu_phim.update({
				where: {
					ma_rap: ma_rap,
					ma_phong: ma_phong,
				},
				data: {
					ma_phong: new_ma_phong,
					ma_rap: new_ma_rap,
					so_ghe: new_so_ghe ? parseInt(new_so_ghe) : undefined,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	deleteRoom: async function(req){
		const {
			ma_phong,
			ma_rap,
			so_ghe
		} = req.query;

		try{
			const result = await prisma.phong_chieu_phim.delete({
				where: {
					ma_phong: ma_phong,
					ma_rap: ma_rap,
					so_ghe: so_ghe ? parseInt(so_ghe) : undefined,
				},
			});

			return result;
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

		try{
			if(isStrict){
				const result = await prisma.ghe.findMany({
					where: {
						ma_rap: ma_rap,
						ma_phong: ma_phong,
						ma_ghe: ma_ghe,
						loai_ghe: loai_ghe
					},
				});

				return result;
			}
			else{
				const seat = await prisma.ghe.findMany({
					where: {
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
							contains: loai_ghe,
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
	postSeat: async function(req){
		const {
			ma_rap,
			ma_phong,
			ma_ghe,
			loai_ghe,
		} = req.body;

		try{
			const result = await prisma.ghe.create({
				data: {
					ma_rap: ma_rap,
					ma_phong: ma_phong,
					ma_ghe: ma_ghe,
					loai_ghe: loai_ghe,
				}
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	patchSeat: async function(req){
		const { 
			ma_rap,
			ma_phong,
			ma_ghe,
		}  = req.query;

		const {
			new_ma_rap,
			new_ma_phong,
			new_ma_ghe,
			new_loai_ghe,
		} = req.body;

		try{
			const result = await prisma.ghe.update({
				where: {
					ma_rap: ma_rap,
					ma_phong: ma_phong,
					ma_ghe: ma_ghe,
				},
				data: {
					ma_rap: new_ma_rap,
					ma_phong: new_ma_phong,
					ma_ghe: new_ma_ghe,
					loai_ghe: new_loai_ghe
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	deleteSeat: async function(req){
		const {
			ma_rap,
			ma_phong,
			ma_ghe,
		} = req.query;

		try{
			const result = await prisma.ghe.delete({
				where: {
					ma_rap: ma_rap,
					ma_phong: ma_phong,
					ma_ghe: ma_ghe
				},
			})

			return result;
		}
		catch (e){
			throw UnprocessableContentError(e.message);
		}
	},
}
