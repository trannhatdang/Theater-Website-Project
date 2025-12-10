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
			const {
				p_tu_khoa,
				p_gioi_tinh,
				p_luong_min,
				p_luong_max,
				p_chuc_vu,
				p_ten_rap,
				p_cot_sap_xep,
				p_kieu_sap_xep
			} = req.query;

			const result = await prisma.$queryRaw`call thu_tuc_tim_kiem_nhan_vien_nang_cao(${p_tu_khoa || null}, ${p_gioi_tinh || null}, ${p_luong_min || null}, ${p_luong_max || null}, ${p_chuc_vu || null}, ${p_ten_rap || null}, ${p_cot_sap_xep || null}, ${p_kieu_sap_xep || null});`

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
}
