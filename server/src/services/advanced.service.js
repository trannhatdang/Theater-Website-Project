import prisma from "../common/prisma/prisma.init.js";
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnprocessableContentError,
} from "../helpers/handleError.js";

export const advancedService = {
	getAdvanced: async function(req){
		try{
			let {
				p_tu_khoa,
				p_gioi_tinh,
				p_luong_min,
				p_luong_max,
				p_chuc_vu,
				p_ten_rap,
				p_cot_sap_xep,
				p_kieu_sap_xep
			} = req.query;

			p_tu_khoa = p_tu_khoa !== 'undefined' ? p_tu_khoa : null
			p_gioi_tinh = p_gioi_tinh !== 'undefined' ? p_gioi_tinh : null
			p_luong_min = p_luong_min !== 'undefined' ? p_luong_min : null
			p_luong_max = p_luong_max !== 'undefined' ? p_luong_max : null
			p_chuc_vu = p_chuc_vu !== 'undefined' ? p_chuc_vu : null
			p_ten_rap = p_ten_rap !== 'undefined' ? p_ten_rap : null

			const result = await prisma.$queryRaw`call thu_tuc_tim_kiem_nhan_vien_nang_cao(${p_tu_khoa || null}, ${p_gioi_tinh || null}, ${p_luong_min || null}, ${p_luong_max || null}, ${p_chuc_vu || null}, ${p_ten_rap || null}, ${p_cot_sap_xep || null}, ${p_kieu_sap_xep || null});`

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getStats: async function(req){
		try{
			const {
				p_thang,
				p_nam,
				p_doanh_thu_min
			} = req.query;

			const result = await prisma.$queryRaw`call thu_tuc_thong_ke_hieu_suat_nhan_vien(${p_thang || null}, ${p_nam || null}, ${p_doanh_thu_min || null});`

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
}
