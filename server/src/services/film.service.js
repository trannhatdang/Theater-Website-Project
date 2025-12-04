import prisma from "../common/prisma/prisma.init.js";
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnprocessableContentError
} from "../helpers/handleError.js";

export const filmService = {
	getFilm: async function(req){
		const { 
			ma_phim,
			ten_phim,
			min_thoi_luong,
			max_thoi_luong,
			min_do_tuoi_yeu_cau,
			max_do_tuoi_yeu_cau,
			min_thoi_gian_cong_chieu,
			max_thoi_gian_cong_chieu,
			tom_tat_noi_dung,
			dao_dien,
			isStrict
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.phim.findMany({
					where:{
						ma_phim: ma_phim,
						ten_phim: ten_phim,
						thoi_luong: {
							lte: min_thoi_luong ? new Date(min_thoi_luong) : undefined,
							gte: max_thoi_luong ? new Date(max_thoi_luong) : undefined,
						},
						do_tuoi_yeu_cau: {
							lte: min_do_tuoi_yeu_cau ? parseInt(min_do_tuoi_yeu_cau) : undefined,
							gte: max_do_tuoi_yeu_cau ? parseInt(max_do_tuoi_yeu_cau) : undefined,
						},
						thoi_gian_cong_chieu: {
							lte: min_thoi_gian_cong_chieu ? new Date(min_thoi_gian_cong_chieu) : undefined,
							gte: max_thoi_gian_cong_chieu ? new Date(max_thoi_gian_cong_chieu) : undefined,
						},
						tom_tat_noi_dung: tom_tat_noi_dung,
						dao_dien: dao_dien,
					},
				});

				return result;
			}
			else{
				const result = await prisma.phim.findMany({
					where:{
						ma_phim: {
							contains: ma_phim,
						},
						ten_phim: {
							contains: ten_phim,
						},
						thoi_luong: {
							lte: min_thoi_luong ? new Date(min_thoi_luong) : undefined,
							gte: max_thoi_luong ? new Date(max_thoi_luong) : undefined,
						},
						do_tuoi_yeu_cau: {
							lte: min_do_tuoi_yeu_cau ? parseInt(min_do_tuoi_yeu_cau) : undefined,
							gte: max_do_tuoi_yeu_cau ? parseInt(max_do_tuoi_yeu_cau) : undefined,
						},
						thoi_gian_cong_chieu: {
							lte: min_thoi_gian_cong_chieu ? new Date(min_thoi_gian_cong_chieu) : undefined,
							gte: max_thoi_gian_cong_chieu ? new Date(max_thoi_gian_cong_chieu) : undefined,
						},
						tom_tat_noi_dung: {
							contains: tom_tat_noi_dung,
						},
						dao_dien: {
							contains: dao_dien,
						}
					},
				});

				return result;
			}
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	postFilm: async function(req){
		const {
			ma_phim,
			ten_phim,
			thoi_luong,
			do_tuoi_yeu_cau,
			thoi_gian_cong_chieu,
			tom_tat_noi_dung,
			dao_dien,
		} = req.body;

		try{
			const result = await prisma.phim.create({
				data:{
					ma_phim: ma_phim,
					ten_phim: ten_phim,
					thoi_luong: thoi_luong ? new Date(thoi_luong) : undefined,
					do_tuoi_yeu_cau: do_tuoi_yeu_cau ? parseInt(do_tuoi_yeu_cau) : undefined,
					thoi_gian_cong_chieu: thoi_gian_cong_chieu ? new Date(thoi_gian_cong_chieu) : undefined,
					tom_tat_noi_dung: tom_tat_noi_dung,
					dao_dien: dao_dien,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},

	patchFilm: async function(req){
		const {
			ma_phim
		} = req.query;

		const {
			new_ma_phim,
			new_ten_phim,
			new_thoi_luong,
			new_do_tuoi_yeu_cau,
			new_thoi_gian_cong_chieu,
			new_tom_tat_noi_dung,
			new_dao_dien,
		} = req.body;

		try{
			const result = await prisma.phim.update({
				where:{
					ma_phim: ma_phim,
				},
				data:{
					ma_phim: new_ma_phim,
					ten_phim: new_ten_phim,
					thoi_luong: new_thoi_luong ? new Date(new_thoi_luong) : undefined,
					do_tuoi_yeu_cau: new_do_tuoi_yeu_cau ? parseInt(new_do_tuoi_yeu_cau) : undefined,
					thoi_gian_cong_chieu: new_thoi_gian_cong_chieu ? new Date(new_thoi_gian_cong_chieu) : undefined,
					tom_tat_noi_dung: new_tom_tat_noi_dung,
					dao_dien: new_dao_dien,
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	deleteFilm: async function(req){
		const {
			ma_phim,
		} = req.query;

		try{
			const result = await prisma.phim.delete({
				where:{
					ma_phim: ma_phim
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getGenre: async function(req){
		const { 
			ma_phim,
			the_loai,
			isStrict,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.the_loai.findMany({
					where:{
						ma_phim: ma_phim,
						the_loai: the_loai,
					},
				});

				return result;
			}
			else{
				const result = await prisma.the_loai.findMany({
					where:{
						ma_phim: {
							contains: ma_phim,
						},
						the_loai: {
							contains: the_loai,
						},
					},
				});

				return result;
			}

		}
		catch(e){
			throw new UnprocessableContentError(e.meesage);
		}
	},

	postGenre: async function(req){
		const {
			ma_phim,
			the_loai,
		} = req.body;

		try{
			const result = await prisma.the_loai.create({
				data:{
					ma_phim: ma_phim,
					the_loai: the_loai,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},

	patchGenre: async function(req){
		const {
			ma_phim,
			the_loai,
		} = req.query;

		const {
			new_ma_phim,
			new_the_loai,
		} = req.body;

		try{
			const result = await prisma.the_loai.update({
				where:{
					ma_phim: ma_phim,
					the_loai: the_loai
				},
				data:{
					ma_phim: new_ma_phim,
					the_loai: new_the_loai,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}

	},

	deleteGenre: async function(req){
		const {
			ma_phim,
			the_loai,
		} = req.query;

		try{
			const result = await prisma.the_loai.delete({
				where:{
					ma_phim: ma_phim,
					the_loai: the_loai
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
	getActor: async function(req){
		const { 
			ma_phim,
			dien_vien,
			isStrict
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.dien_vien.findMany({
					where:{
						ma_phim: ma_phim,
						dien_vien: dien_vien,
					},
				});

				return result;
			}
			else{
				const result = await prisma.dien_vien.findMany({
					where:{
						ma_phim: {
							contains: ma_phim,
						},
						dien_vien: {
							contains: dien_vien,
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

	postActor: async function(req){
		const {
			ma_phim,
			dien_vien,
		} = req.body;

		try{
			const result = await prisma.dien_vien.create({
				data:{
					ma_phim: ma_phim,
					dien_vien: dien_vien,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},

	patchActor: async function(req){
		const {
			ma_phim,
			dien_vien,
		} = req.query;

		const {
			new_ma_phim,
			new_dien_vien,
		} = req.body;

		try{
			const result = await prisma.dien_vien.update({
				where:{
					ma_phim: ma_phim,
					dien_vien: dien_vien
				},
				data:{
					ma_phim: new_ma_phim,
					dien_vien: new_dien_vien,
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}

	},

	deleteActor: async function(req){
		const {
			ma_phim,
			dien_vien,
		} = req.query;

		try{
			const result = await prisma.dien_vien.delete({
				where:{
					ma_phim: ma_phim,
					dien_vien: dien_vien
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getScreening: async function(req){
		const { 
			ma_luot_chieu,
			min_thoi_gian_bat_dau,
			max_thoi_gian_bat_dau,
			min_thoi_gian_ket_thuc,
			max_thoi_gian_ket_thuc,
			hinh_thuc_chieu,
			ngon_ngu,
			phu_de_hoac_long_tieng,
			ma_phim,
			ma_rap,
			ma_phong_chieu,
			ma_nhan_vien_quan_ly,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.suat_chieu.findMany({
					where:{
						ma_luot_chieu: ma_luot_chieu,
						thoi_gian_bat_dau:{
							gte: min_thoi_gian_bat_dau ? new Date(min_thoi_gian_bat_dau) : undefined,
							lte: max_thoi_gian_bat_dau ? new Date(max_thoi_gian_bat_dau) : undefined,
						},
						thoi_gian_ket_thuc:{
							gte: min_thoi_gian_ket_thuc ? new Date(min_thoi_gian_ket_thuc) : undefined,
							lte: max_thoi_gian_ket_thuc ? new Date(max_thoi_gian_ket_thuc) : undefined,
						},
						hinh_thuc_chieu: hinh_thuc_chieu,
						ngon_ngu: {
							contains: ngon_ngu,
						},
						phu_de_hoac_long_tieng: phu_de_hoac_long_tieng,
						ma_rap: ma_rap,
						ma_phong_chieu: ma_phong_chieu,
						ma_nhan_vien_quan_ly: ma_nhan_vien_quan_ly
					},
				});

				return result;
			}
			else{
				const result = await prisma.suat_chieu.findMany({
					where:{
						ma_luot_chieu:{
							contains: ma_luot_chieu,
						},
						thoi_gian_bat_dau:{
							gte: min_thoi_gian_bat_dau ? new Date(min_thoi_gian_bat_dau) : undefined,
							lte: max_thoi_gian_bat_dau ? new Date(max_thoi_gian_bat_dau) : undefined,
						},
						thoi_gian_ket_thuc:{
							gte: min_thoi_gian_ket_thuc ? new Date(min_thoi_gian_ket_thuc) : undefined,
							lte: max_thoi_gian_ket_thuc ? new Date(max_thoi_gian_ket_thuc) : undefined,
						},
						hinh_thuc_chieu:{
							contains: hinh_thuc_chieu
						},
						ngon_ngu: {
							contains: ngon_ngu,
						},
						phu_de_hoac_long_tieng: phu_de_hoac_long_tieng,
						ma_rap: {
							contains: ma_rap,
						},
						ma_phong_chieu: {
							contains: ma_phong_chieu,
						},
						ma_nhan_vien_quan_ly: {
							contains: ma_nhan_vien_quan_ly
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

	postScreening: async function(req){
		const {
			ma_luot_chieu,
			thoi_gian_bat_dau,
			thoi_gian_ket_thuc,
			hinh_thuc_chieu,
			ngon_ngu,
			phu_de_hoac_long_tieng,
			ma_phim,
			ma_rap,
			ma_phong_chieu,
			ma_nhan_vien_quan_ly,
		} = req.body;

		try{
			const result = await prisma.suat_chieu.create({
				data:{
					ma_suat_chieu: ma_suat_chieu,
					thoi_gian_bat_dau: thoi_gian_bat_dau ? new Date(thoi_gian_bat_dau) : undefined,
					thoi_gian_ket_thuc: thoi_gian_ket_thuc ? new Date(thoi_gian_ket_thuc) : undefined,
					hinh_thuc_chieu: hinh_thuc_chieu,
					ngon_ngu: ngon_ngu,
					phu_de_hoac_long_tieng: phu_de_hoac_long_tieng,
					ma_phim: ma_phim,
					ma_rap: ma_rap,
					ma_phong_chieu: ma_phong_chieu,
					ma_nhan_vien_quan_ly: ma_nhan_vien_quan_ly,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},

	patchScreening: async function(req){
		const {
			ma_luot_chieu
		} = req.query;

		const {
			new_ma_luot_chieu,
			new_thoi_gian_bat_dau,
			new_thoi_gian_ket_thuc,
			new_hinh_thuc_chieu,
			new_ngon_ngu,
			new_phu_de_hoac_long_tieng,
			new_ma_phim,
			new_ma_rap,
			new_ma_phong_chieu,
			new_ma_nhan_vien_quan_ly,
		} = req.body;

		try{
			const result = await prisma.suat_chieu.update({
				where:{
					ma_suat_chieu: ma_suat_chieu
				},
				data:{
					ma_suat_chieu: new_suat_chieu,
					thoi_gian_bat_dau: new_thoi_gian_bat_dau ? new Date(new_thoi_gian_bat_dau) : undefined,
					thoi_gian_ket_thuc: new_thoi_gian_ket_thuc ? new Date(new_thoi_gian_ket_thuc) : undefined,
					hinh_thuc_chieu: new_hinh_thuc_chieu,
					ngon_ngu: new_ngon_ngu,
					phu_de_hoac_long_tieng: new_phu_de_hoac_long_tieng,
					ma_phim: new_ma_phim,
					ma_rap: new_ma_rap,
					ma_phong_chieu: new_ma_phong_chieu,
					ma_nhan_vien_quan_ly: new_ma_nhan_vien_quan_ly,
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}

	},

	deleteScreening: async function(req){
		const { 
			ma_luot_chieu,
		} = req.query;

		try{
			const result = await prisma.suat_chieu.delete({
				where:{
					ma_suat_chieu: ma_suat_chieu,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
}
