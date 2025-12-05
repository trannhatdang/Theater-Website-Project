import prisma from "../common/prisma/prisma.init.js";
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnprocessableContentError,
} from "../helpers/handleError.js";

export const eventService = {
	getEvent: async function(req){
		const {
			ma_sk,
			ten_sk,
			quy_mo,
			min_do_tuoi_gioi_han,
			max_do_tuoi_gioi_han,
			min_chi_phi,
			max_chi_phi,
			min_thoi_gian,
			max_thoi_gian,
			noi_dung_su_kien,
			isStrict,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.su_kien.findMany({
					where: {
						ma_sk: ma_sk,
						ten_sk: ten_sk,
						quy_mo: quy_mo,
						do_tuoi_gioi_han: {
							gte: min_do_tuoi_gioi_han ? parseInt(min_do_tuoi_gioi_han) : undefined,
							lte: max_do_tuoi_gioi_han ? parseInt(max_do_tuoi_gioi_han) : undefined,
						},
						chi_phi: {
							gte: min_chi_phi ? parseInt(min_chi_phi) : undefined,
							lte: max_chi_phi ? parseInt(max_chi_phi) : undefined,
						},
						thoi_gian: {
							gte: min_thoi_gian ? new Date(min_thoi_gian) : undefined,
							lte: max_thoi_gian ? new Date(max_thoi_gian) : undefined,
						},
					},
				});

				return result;
			}
			else{
				const result = await prisma.su_kien.findMany({
					where: {
						ma_sk: {
							contains: ma_sk,
						},
						ten_sk: {
							contains: ten_sk,
						},
						quy_mo: {
							contains: quy_mo,
						},
						do_tuoi_gioi_han: {
							gte: min_do_tuoi_gioi_han ? parseInt(min_do_tuoi_gioi_han) : undefined,
							lte: max_do_tuoi_gioi_han ? parseInt(max_do_tuoi_gioi_han) : undefined,
						},
						chi_phi: {
							gte: min_chi_phi ? parseInt(min_chi_phi) : undefined,
							lte: max_chi_phi ? parseInt(max_chi_phi) : undefined,
						},
						thoi_gian: {
							gte: min_thoi_gian ? new Date(min_thoi_gian) : undefined,
							lte: max_thoi_gian ? new Date(max_thoi_gian) : undefined,
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
	postEvent: async function(req){
		const {
			ma_sk,
			ten_sk,
			quy_mo,
			do_tuoi_gioi_han,
			chi_phi,
			thoi_gian,
			noi_dung_su_kien,
		} = req.body;

		try{
			const result = await prisma.su_kien.create({
				data: {
					ma_sk: ma_sk,
					ten_sk: ten_sk,
					quy_mo: quy_mo,
					do_tuoi_gioi_han: do_tuoi_gioi_han ? parseInt(do_tuoi_gioi_han) : undefined,
					chi_phi: chi_phi ? parseInt(chi_phi) : undefined,
					thoi_gian: thoi_gian ? new Date(thoi_gian) : undefined,
					noi_dung_su_kien: noi_dung_su_kien,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	patchEvent: async function(req){
		const {
			ma_sk
		} = req.query;

		const {
			new_ma_sk,
			new_ten_sk,
			new_quy_mo,
			new_do_tuoi_gioi_han,
			new_chi_phi,
			new_thoi_gian,
			new_noi_dung_su_kien,
		} = req.body;

		try{
			const result = await prisma.su_kien.patch({
				where: {
					ma_sk: ma_sk,
				},
				data: {
					ma_sk: new_ma_sk,
					ten_sk: new_ten_sk,
					quy_mo: new_quy_mo,
					do_tuoi_gioi_han: new_do_tuoi_gioi_han ? parseInt(new_do_tuoi_gioi_han) : undefined,
					chi_phi: new_chi_phi ? parseInt(new_chi_phi) : undefined,
					thoi_gian: new_thoi_gian ? new Date(new_thoi_gian) : undefined,
					noi_dung_su_kien: new_noi_dung_su_kien,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	deleteEvent: async function(req){
		const {
			ma_sk,
		} = req.query;

		try{
			const result = await prisma.su_kien.delete({
				where: {
					ma_sk: ma_sk,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	getOrganisationParty: async function(req){
		const {
			ma_so_rieng,
			isStrict
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.don_vi_to_chuc.findMany({
					where: {
						ma_so_rieng: ma_so_rieng,
					},
				});

				return result;
			}
			else{
				const result = await prisma.don_vi_to_chuc.findMany({
					where: {
						ma_so_rieng: {
							contains: ma_so_rieng,
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
	postOrganisationParty: async function(req){
		const {
			ma_so_rieng,
		} = req.body;

		try{
			const result = await prisma.don_vi_to_chuc.create({
				data: {
					ma_so_rieng: ma_so_rieng,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	patchOrganisationParty: async function(req){
		const {
			ma_so_rieng,
		} = req.query;

		const {
			new_ma_so_rieng,
		} = req.body;

		try{
			const result = await prisma.don_vi_to_chuc.patch({
				where: {
					ma_so_rieng: ma_so_rieng,
				},
				data: {
					new_ma_so_rieng: new_ma_so_rieng,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	deleteOrganisationParty: async function(req){
		const {
			ma_so_rieng,
		} = req.query;

		try{
			const result = await prisma.don_vi_to_chuc.delete({
				where: {
					ma_so_rieng: ma_so_rieng,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	getOrganization: async function(req){
		const {
			ma_so_rieng,
			ten_to_chuc,
			email,
			sdt,
			isStrict
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.don_vi_to_chuc.findMany({
					where: {
						ma_so_rieng: ma_so_rieng,
						ten_to_chuc: ten_to_chuc,
						email: email,
						sdt: sdt,
					},
				});

				return result;
			}
			else{
				const result = await prisma.don_vi_to_chuc.findMany({
					where: {
						ma_so_rieng:{
							contains: ma_so_rieng,
						},
						ten_to_chuc:{
							contains: ten_to_chuc,
						},
						email:{
							contains: email,
						},
						sdt:{
							contains: sdt,
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
	postOrganization: async function(req){
		const {
			ma_so_rieng,
			ten_to_chuc,
			email,
			sdt,
		} = req.body;

		try{
			const result = await prisma.don_vi_to_chuc.create({
				data: {
					ma_so_rieng: ma_so_rieng,
					ten_to_chuc: ten_to_chuc,
					email: email,
					sdt: sdt,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	patchOrganization: async function(req){
		const {
			ma_so_rieng,
		} = req.query;

		const {
			new_ma_so_rieng,
			new_ten_to_chuc,
			new_email,
			new_sdt,
		} = req.body;

		try{
			const result = await prisma.don_vi_to_chuc.patch({
				where: {
					ma_so_rieng: ma_so_rieng,
				},
				data: {
					ma_so_rieng: new_ma_so_rieng,
					ten_to_chuc: new_ten_to_chuc,
					email: new_email,
					sdt: new_sdt,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	deleteOrganization: async function(req){
		const {
			ma_so_rieng,
		} = req.query;

		try{
			const result = await prisma.don_vi_to_chuc.delete({
				where: {
					ma_so_rieng: ma_so_rieng,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	getIndividual: async function(req){
		const {
			cccd,
			ten,
			email,
			sdt,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.ca_nhan.findMany({
					where: {
						cccd: cccd,
						ten: ten,
						email: email,
						sdt: sdt,
					},
				});

				return result;
			}
			else{
				const result = await prisma.ca_nhan.findMany({
					where: {
						cccd: {
							contains: cccd,
						},
						ten:{
							contains: ten,
						},
						email:{
							contains: email,
						},
						sdt:{
							contains: sdt,
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
	postIndividual: async function(req){
		const {
			cccd,
			ten,
			email,
			sdt,
		} = req.body;

		try{
			const result = await prisma.ca_nhan.create({
				data: {
					cccd: cccd,
					ten: ten,
					email: email,
					sdt: sdt,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	patchIndividual: async function(req){
		const {
			cccd,
		} = req.query;

		const {
			new_cccd,
			new_ten,
			new_email,
			new_sdt,
		} = req.body;

		try{
			const result = await prisma.ca_nhan.patch({
				where: {
					cccd: cccd,
				},
				data: {
					cccd: new_cccd,
					ten: new_ten,
					email: new_email,
					sdt: new_sdt,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	deleteIndividual: async function(req){
		const {
			cccd,
		} = req.query;

		try{
			const result = await prisma.ca_nhan.delete({
				where: {
					cccd: cccd,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getRelationOrangize: async function(req){
		const {
			ma_don_vi_to_chuc,
			ma_su_kien,
			ma_rap_phim,
			ma_phong_phim,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.to_chuc_su_kien.findMany({
					where: {
						ma_don_vi_to_chuc: ma_don_vi_to_chuc,
						ma_su_kien: ma_su_kien,
						ma_rap_phim: ma_rap_phim,
						ma_phong_phim: ma_phong_phim,
					},
				});

				return result;
			}
			else{
				const result = await prisma.to_chuc_su_kien.findMany({
					where: {
						ma_don_vi_to_chuc:{
							contains: ma_don_vi_to_chuc,
						},
						ma_su_kien:{
							contains: ma_su_kien,
						},
						ma_rap_phim:{
							contains: ma_rap_phim,
						},
						ma_phong_phim:{
							contains: ma_phong_phim,
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
	postRelationOrangize: async function(req){
		const {
			ma_don_vi_to_chuc,
			ma_su_kien,
			ma_rap_phim,
			ma_phong_phim,
		} = req.body;

		try{
			const result = await prisma.to_chuc_su_kien.create({
				data: {
					ma_don_vi_to_chuc: ma_don_vi_to_chuc,
					ma_su_kien: ma_su_kien,
					ma_rap_phim: ma_rap_phim,
					ma_phong_phim: ma_phong_phim,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	patchRelationOrangize: async function(req){
		const {
			ma_don_vi_to_chuc,
			ma_su_kien,
			ma_rap_phim,
		} = req.query;

		const {
			new_ma_don_vi_to_chuc,
			new_ma_su_kien,
			new_ma_rap_phim,
			new_ma_phong_phim
		} = req.body;

		try{
			const result = await prisma.to_chuc_su_kien.patch({
				where: {
					ma_don_vi_to_chuc: ma_don_vi_to_chuc,
					ma_su_kien: ma_su_kien,
					ma_rap_phim: ma_rap_phim,
				},
				data: {
					ma_don_vi_to_chuc: new_ma_don_vi_to_chuc,
					ma_su_kien: new_ma_su_kien,
					ma_rap_phim: new_ma_rap_phim,
					ma_phong_phim: new_ma_phong_phim,
				},
			});
			
			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	deleteRelationOrangize: async function(req){
		const {
			ma_don_vi_to_chuc,
			ma_su_kien,
			ma_rap_phim,
		} = req.query;

		try{
			const result = await prisma.to_chuc_su_kien.delete({
				where: {
					ma_don_vi_to_chuc: ma_don_vi_to_chuc,
					ma_su_kien: ma_su_kien,
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
