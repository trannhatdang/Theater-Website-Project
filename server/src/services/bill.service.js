import prisma from "../common/prisma/prisma.init.js";
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnprocessableContentError,
} from "../helpers/handleError.js";

export const billService = {
	getFood: async function(req){
		const {
			ma_sp,
			ten,
			min_kich_co,
			max_kich_co,
			min_gia_tien,
			max_gia_tien,
			ma_nhan_vien_phuc_vu,
			ma_khach_hang,
			isStrict,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.do_an_thuc_uong.findMany({
					where:{
						ma_sp: ma_sp,
						ten: ten,
						kich_co:{
							gte: min_kich_co ? parseInt(min_kich_co) : undefined,
							lte: max_kich_co ? parseInt(max_kich_co) : undefined,
						},
						gia_tien:{
							gte: min_gia_tien ? parseInt(min_gia_tien) : undefined,
							lte: max_gia_tien ? parseInt(max_gia_tien) : undefined,
						},
						ma_nhan_vien_phuc_vu: ma_nhan_vien_phuc_vu,
						ma_khach_hang: ma_khach_hang,
					},
				});

				return result;
			}
			else{
				const result = await prisma.do_an_thuc_uong.findMany({
					where:{
						ma_sp:{
							contains: ma_sp,
						},
						ten:{
							contains: ten,
						},
						kich_co:{
							gte: min_kich_co ? parseInt(min_kich_co) : undefined,
							lte: max_kich_co ? parseInt(max_kich_co) : undefined,
						},
						gia_tien: {
							gte: min_gia_tien ? parseInt(min_gia_tien) : undefined,
							lte: max_gia_tien ? parseInt(max_gia_tien) : undefined,
						},
						ma_nhan_vien_phuc_vu:{
							contains: ma_nhan_vien_phuc_vu,
						},
						ma_khach_hang:{
							contains: ma_khach_hang,
						},
					},
				});

				return result;
			}
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	postFood: async function(req){
		const {
			ma_sp,
			ten,
			kich_co,
			gia_tien,
			ma_nhan_vien_phuc_vu,
			ma_khach_hang,
		} = req.body;

		try{
			if(gia_tien && gia_tien < 0){
				throw Error("gia_tien must be non-negative!")
			}
			const result = await prisma.do_an_thuc_uong.create({
				data:{
					ma_sp: ma_sp,
					ten: ten,
					kich_co: kich_co ? parseInt(kich_co) : undefined,
					gia_tien: gia_tien ? parseInt(gia_tien) : undefined,
					ma_nhan_vien_phuc_vu: ma_nhan_vien_phuc_vu,
					ma_khach_hang: ma_khach_hang,
				}
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	patchFood: async function(req){
		const {
			ma_sp,
		} = req.query;

		const {
			new_ma_sp,
			new_ten,
			new_kich_co,
			new_gia_tien,
			new_ma_nhan_vien_phuc_vu,
			new_ma_khach_hang,
		} = req.body;

		try{
			const result = await prisma.do_an_thuc_uong.patch({
				where:{
					ma_sp: ma_sp,
				},
				data:{
					ma_sp: new_ma_sp,
					ten: new_ten,
					kich_co: new_kich_co ? parseInt(new_kich_co) : undefined,
					gia_tien: new_gia_tien ? parseInt(new_gia_tien) : undefined,
					ma_nhan_vien_phuc_vu: new_ma_nhan_vien_phuc_vu,
					ma_khach_hang: new_ma_khach_hang,
				}
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},
	deleteFood: async function(req){
		const {
			ma_sp
		} = req.query;

		try{
			const result = await prisma.do_an_thuc_uong.delete({
				where:{
					ma_sp: ma_sp,
				},
			});
			
			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	getBill: async function(req){
		const {
			ma_hoa_don,
			trang_thai_thanh_toan,
			max_thoi_gian,
			min_thoi_gian,
			phuong_thuc_thanh_toan,
			ma_nhan_vien_phu_trach,
			ma_khach_hang,
			ma_km,
			max_tong_tien,
			min_tong_tien,
			isStrict,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.hoa_don.findMany({
					where:{
						ma_hoa_don: ma_hoa_don,
						trang_thai_thanh_toan: trang_thai_thanh_toan,
						thoi_gian:{
							gte: max_thoi_gian ? new Date(max_thoi_gian) : undefined,
							lte: min_thoi_gian ? new Date(min_thoi_gian) : undefined,
						},
						phuong_thuc_thanh_toan: phuong_thuc_thanh_toan,
						ma_nhan_vien_phu_trach: ma_nhan_vien_phu_trach,
						ma_khach_hang: ma_khach_hang,
						ma_km: ma_km,
						tong_tien:{
							gte: max_tong_tien ? parseInt(max_tong_tien) : undefined,
							lte: min_tong_tien ? parseInt(min_tong_tien) : undefined,
						}
					},
				});

				return result;
			}
			else{
				const result = await prisma.hoa_don.findMany({
					where:{
						ma_hoa_don:{
							contains: ma_hoa_don,
						},
						trang_thai_thanh_toan:{
							contains: trang_thai_thanh_toan,
						},
						thoi_gian:{
							gte: max_thoi_gian ? new Date(max_thoi_gian) : undefined,
							lte: min_thoi_gian ? new Date(min_thoi_gian) : undefined,
						},
						phuong_thuc_thanh_toan:{
							contains: phuong_thuc_thanh_toan,
						},
						ma_nhan_vien_phu_trach:{
							contains: ma_nhan_vien_phu_trach,
						},
						ma_khach_hang:{
							contains: ma_khach_hang,
						},
						ma_km:{
							contains: ma_km,
						},
						tong_tien:{
							gte: min_tong_tien ? parseInt(min_tong_tien) : undefined,
							lte: max_tong_tien ? parseInt(max_tong_tien) : undefined,
						}
					},
				});

				return result;
			}
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	postBill: async function(req){
		const {
			ma_hoa_don,
			trang_thai_thanh_toan,
			thoi_gian,
			phuong_thuc_thanh_toan,
			ma_nhan_vien_phu_trach,
			ma_khach_hang,
			ma_km,
			tong_tien,
		} = req.body;

		try{
			const result = await prisma.hoa_don.create({
				data:{
					ma_hoa_don: ma_hoa_don,
					trang_thai_thanh_toan: trang_thai_thanh_toan,
					thoi_gian: thoi_gian ? new Date(thoi_gian) : undefined,
					phuong_thuc_thanh_toan: phuong_thuc_thanh_toan,
					ma_nhan_vien_phu_trach: ma_nhan_vien_phu_trach,
					ma_khach_hang: ma_khach_hang,
					ma_km: ma_km,
					tong_tien: tong_tien ? parseInt(tong_tien) : undefined,
				}
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	patchBill: async function(req){
		const {
			ma_hoa_don,
		} = req.query;

		const {
			new_ma_hoa_don,
			new_trang_thai_thanh_toan,
			new_thoi_gian,
			new_phuong_thuc_thanh_toan,
			new_ma_nhan_vien_phu_trach,
			new_ma_khach_hang,
			new_ma_km,
			new_tong_tien,
		} = req.body;

		try{
			const result = await prisma.hoa_don.patch({
				where:{
					ma_hoa_don: ma_hoa_don,
				},
				data:{
					ma_hoa_don: new_ma_hoa_don,
					trang_thai_thanh_toan: new_trang_thai_thanh_toan,
					thoi_gian: new_thoi_gian ? new Date(new_thoi_gian) : undefined,
					phuong_thuc_thanh_toan: new_phuong_thuc_thanh_toan,
					ma_nhan_vien_phu_trach: new_ma_nhan_vien_phu_trach,
					ma_khach_hang: new_ma_khach_hang,
					ma_km: new_ma_km,
					tong_tien: new_tong_tien ? parseInt(new_tong_tien) : undefined,
				}
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},
	deleteBill: async function(req){
		const {
			ma_hoa_don
		} = req.query;

		try{
			const result = await prisma.hoa_don.delete({
				where:{
					ma_hoa_don: ma_hoa_don,
				},
			});
			
			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	getRelationBillFood: async function(req){
		const {
			ma_hoa_don,
			ma_do_an_thuc_uong,
			min_so_luong,
			max_so_luong,
			isStrict,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.hoa_don_bao_gom_do_an_thuc_uong.findMany({
					where:{
						ma_hoa_don: ma_hoa_don,
						ma_do_an_thuc_uong: ma_do_an_thuc_uong,
						so_luong:{
							gte: max_so_luong ? parseInt(max_so_luong) : undefined,
							lte: min_so_luong ? parseInt(min_so_luong) : undefined,
						}
					},
				});

				return result;
			}
			else{
				const result = await prisma.hoa_don_bao_gom_do_an_thuc_uong.findMany({
					where:{
						ma_hoa_don:{
							contains: ma_hoa_don,
						},
						ma_do_an_thuc_uong:{
							contains: ma_do_an_thuc_uong,
						},
						so_luong:{
							gte: max_so_luong ? parseInt(max_so_luong) : undefined,
							lte: min_so_luong ? parseInt(min_so_luong) : undefined,
						},
					},
				});

				return result;
			}
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	postRelationBillFood: async function(req){
		const {
			ma_hoa_don,
			ma_do_an_thuc_uong,
			so_luong,
		} = req.body;

		try{
			const result = await prisma.hoa_don_bao_gom_do_an_thuc_uong.create({
				data:{
					ma_hoa_don: ma_hoa_don,
					ma_do_an_thuc_uong: ma_do_an_thuc_uong,
					so_luong: so_luong ? parseInt(so_luong) : undefined,
				}
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	patchRelationBillFood: async function(req){
		const {
			ma_hoa_don,
			ma_do_an_thuc_uong,
		} = req.query;

		const {
			new_ma_hoa_don,
			new_ma_do_an_thuc_uong,
			new_so_luong,
		} = req.body;

		try{
			const result = await prisma.hoa_don_bao_gom_do_an_thuc_uong.patch({
				where:{
					ma_hoa_don: ma_hoa_don,
					ma_do_an_thuc_uong: ma_do_an_thuc_uong,
				},
				data:{
					ma_hoa_don: new_ma_hoa_don,
					ma_do_an_thuc_uong: new_ma_do_an_thuc_uong,
					so_luong: new_so_luong ? parseInt(new_so_luong) : undefined,
				}
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	deleteRelationBillFood: async function(req){
		const {
			ma_hoa_don,
			ma_do_an_thuc_uong,
		} = req.query;

		try{
			const result = await prisma.hoa_don_bao_gom_do_an_thuc_uong.delete({
				where:{
					ma_hoa_don: ma_hoa_don,
					ma_do_an_thuc_uong: ma_do_an_thuc_uong,
				},
			});
			
			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},

	getTicket: async function(req){
		const {
			ma_ve,
			max_gia_ve,
			min_gia_ve,
			ma_rap,
			ma_phong,
			ma_ghe,
			ma_luot_chieu,
			ma_hoa_don,
			ma_nhan_vien_ban_ve,
			min_thoi_gian_thanh_toan,
			max_thoi_gian_thanh_toan,
			ma_khach_hang,
			isStrict,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.ve.findMany({
					where:{
						ma_ve: ma_ve,
						gia_ve: {
							gte: min_gia_ve ? parseInt(min_gia_ve) : undefined,
							lte: max_gia_ve ? parseInt(max_gia_ve) : undefined,
						},
						ma_rap: ma_rap,
						ma_phong: ma_phong,
						ma_ghe: ma_ghe,
						ma_luot_chieu: ma_luot_chieu,
						ma_hoa_don: ma_hoa_don,
						ma_nhan_vien_ban_ve: ma_nhan_vien_ban_ve,
						thoi_gian_thanh_toan:{
							gte: min_thoi_gian_thanh_toan,
							lte: max_thoi_gian_thanh_toan,
						},
						ma_khach_hang: ma_khach_hang,
					},
				});

				return result;
			}
			else{
				const result = await prisma.ve.findMany({
					where:{
						ma_ve:{
							contains: ma_ve,
						},
						gia_ve: {
							gte: min_gia_ve ? parseInt(min_gia_ve) : undefined,
							lte: max_gia_ve ? parseInt(max_gia_ve) : undefined,
						},
						ma_rap:{
							contains: ma_rap,
						},
						ma_phong:{
							contains: ma_phong,
						},
						ma_ghe:{
							contains: ma_ghe,
						},
						ma_luot_chieu:{
							contains: ma_luot_chieu,
						},
						ma_hoa_don:{
							contains: ma_hoa_don,
						},
						ma_nhan_vien_ban_ve:{
							contains: ma_nhan_vien_ban_ve,
						},
						thoi_gian_thanh_toan:{
							gte: min_thoi_gian_thanh_toan ? new Date(min_thoi_gian_thanh_toan) : undefined,
							lte: max_thoi_gian_thanh_toan ? new Date(max_thoi_gian_thanh_toan) : undefined,
						},
						ma_khach_hang:{
							contains: ma_khach_hang,
						},
					},
				});

				return result;
			}
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	postTicket: async function(req){
		const {
			ma_ve,
			gia_ve,
			ma_rap,
			ma_phong,
			ma_ghe,
			ma_luot_chieu,
			ma_hoa_don,
			ma_nhan_vien_ban_ve,
			thoi_gian_thanh_toan,
			ma_khach_hang,
		} = req.body;

		try{
			const result = await prisma.ve.create({
				data:{
					ma_ve: ma_ve,
					gia_ve: gia_ve ? parseInt(gia_ve) : undefined,
					ma_rap: ma_rap,
					ma_phong: ma_phong,
					ma_ghe: ma_ghe,
					ma_luot_chieu: ma_luot_chieu,
					ma_hoa_don: ma_hoa_don,
					ma_nhan_vien_ban_ve: ma_nhan_vien_ban_ve,
					thoi_gian_thanh_toan: thoi_gian_thanh_toan ? new Date(thoi_gian_thanh_toan) : undefined,
					ma_khach_hang: ma_khach_hang,
				}
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	patchTicket: async function(req){
		const {
			ma_ve,
		} = req.query;

		const {
			new_ma_ve,
			new_gia_ve,
			new_ma_rap,
			new_ma_phong,
			new_ma_ghe,
			new_ma_luot_chieu,
			new_ma_hoa_don,
			new_ma_nhan_vien_ban_ve,
			new_thoi_gian_thanh_toan,
			new_ma_khach_hang,
		} = req.body;

		try{
			const result = await prisma.ve.patch({
				where:{
					ma_ve: ma_ve,
				},
				data:{
					ma_ve: new_ma_ve,
					gia_ve: new_gia_ve ? parseInt(new_gia_ve) : undefined,
					ma_rap: new_ma_rap,
					ma_phong: new_ma_phong,
					ma_ghe: new_ma_ghe,
					ma_luot_chieu: new_ma_luot_chieu,
					ma_hoa_don: new_ma_hoa_don,
					ma_nhan_vien_ban_ve: new_ma_nhan_vien_ban_ve,
					thoi_gian_thanh_toan: new_thoi_gian_thanh_toan ? new Date(new_thoi_gian_thanh_toan) : undefined,
					ma_khach_hang: new_ma_khach_hang,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
	deleteTicket: async function(req){
		const {
			ma_ve
		} = req.query;

		try{
			const result = await prisma.ve.delete({
				where:{
					ma_ve: ma_ve
				},
			});
			
			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}
	},
}
