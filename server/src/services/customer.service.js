import prisma from "../common/prisma/prisma.init.js";
import {
	BadRequestError,
	ConflictError,
	NotFoundError,
	UnprocessableContentError,
} from "../helpers/handleError.js";

export const customerService = {
	getCustomer: async function(req){
		const { 
			ma_khach_hang,
			ten,
			sdt,
			gioi_tinh,
			email,
			isStrict
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.khach_hang.findMany({
					where:{
						ma_khach_hang: ma_khach_hang,
						ten: ten,
						sdt: sdt,
						gioi_tinh: gioi_tinh,
						email: email,
					},
				});
			}
			else{
				const result = await prisma.khach_hang.findMany({
					where:{
						ma_khach_hang: {
							contains: ma_khach_hang,
						},
						ten: {
							contains: ten,
						},
						sdt: {
							contains: sdt,
						},
						gioi_tinh: {
							contains: gioi_tinh,
						},
						email: {
							contains: email,
						}
					},
				});
			}

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	postCustomer: async function(req){
		const {
			ma_khach_hang,
			ten,
			sdt,
			gioi_tinh,
			email
		} = req.body;

		try{
			const result = await prisma.khach_hang.create({
				data:{
					ma_khach_hang: ma_khach_hang,
					ten: ten,
					sdt: sdt,
					gioi_tinh: gioi_tinh,
					email: email
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},

	patchCustomer: async function(req){
		const {
			ma_khach_hang
		} = req.query;

		const {
			new_ma_khach_hang,
			new_ten,
			new_sdt,
			new_gioi_tinh,
			new_email
		} = req.body;

		try{
			const result = await prisma.khach_hang.update({
				where:{
					ma_khach_hang: ma_khach_hang
				},
				data:{
					ma_khach_hang: new_ma_khach_hang,
					ten: new_ten,
					sdt: new_sdt,
					gioi_tinh: new_gioi_tinh,
					email: new_email
				}
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},

	deleteCustomer: async function(req){
		const {
			ma_khach_hang,
		} = req.query;

		try{
			const result = await prisma.khach_hang.delete({
				where:{
					ma_khach_hang: ma_khach_hang
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getCustomerAccount: async function(req){
		const { 
			ten_tai_khoan,
			ma_khach_hang,
			mat_khau,
			cap,
			min_so_diem_tich_duoc,
			max_so_diem_tich_duoc,
			min_so_diem_can_len_cap,
			max_so_diem_can_len_cap,
			isStrict
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.khach_hang.findMany({
					where:{
						ten_tai_khoan: ten_tai_khoan,
						ma_khach_hang: ma_khach_hang,
						mat_khau: mat_khau,
						cap: cap,
						so_diem_tich_duoc: {
							gte: min_so_diem_tich_duoc,
							lte: max_so_diem_tich_duoc,
						},
						so_diem_can_len_cap: {
							gte: min_so_diem_can_len_cap,
							lte: max_so_diem_can_len_cap,
						},
					},
				});

				return result;
			}
			else{
				const result = await prisma.khach_hang.findMany({
					where:{
						ten_tai_khoan: {
							contains: ten_tai_khoan,
						},
						ma_khach_hang: {
							contains: ma_khach_hang,
						},
						mat_khau: {
							contains: mat_khau,
						},
						cap: {
							contains: cap,
						},
						so_diem_tich_duoc: {
							gte: min_so_diem_tich_duoc,
							lte: max_so_diem_tich_duoc,
						},
						so_diem_can_len_cap: {
							gte: min_so_diem_can_len_cap,
							lte: max_so_diem_can_len_cap,
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

	postCustomerAccount: async function(req){
		const {
			ten_tai_khoan,
			ma_khach_hang,
			mat_khau,
			cap,
			so_diem_tich_duoc,
			so_diem_can_len_cap,
		} = req.body;

		try{
			const result = await prisma.khach_hang.create({
				data:{
					ma_khach_hang: ma_khach_hang,
					ten_tai_khoan: ten_tai_khoan,
					mat_khau: mat_khau,
					cap: cap,
					so_diem_tich_duoc: so_diem_tich_duoc,
					so_diem_can_len_cap: so_diem_can_len_cap,
				},
			});

			return result;
		}
		catch(e){
			throw UnprocessableContentError(e.message);
		}

	},

	patchCustomerAccount: async function(req){
		const {
			ma_khach_hang,
			ten_tai_khoan,
		} = req.query;

		const {
			new_ma_khach_hang,
			new_ten_tai_khoan,
			new_mat_khau,
			new_cap,
			new_so_diem_tich_duoc,
			new_so_diem_can_len_cap,
		} = req.body;

		try{
			const result = await prisma.khach_hang.update({
				where:{
					ma_khach_hang: ma_khach_hang,
					ten_tai_khoan: ten_tai_khoan,
				},
				data:{
					ma_khach_hang: new_ma_khach_hang,
					ten_tai_khoan: new_ten_tai_khoan,
					mat_khau: new_mat_khau,
					cap: new_cap,
					so_diem_tich_duoc: new_so_diem_tich_duoc,
					so_diem_can_len_cap: new_so_diem_can_len_cap,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}

	},

	deleteCustomerAccount: async function(req){
		const {
			ma_khach_hang,
			ten_tai_khoan,
		} = req.query;

		try{
			const result = await prisma.khach_hang.delete({
				where:{
					ma_khach_hang: ma_khach_hang,
					ten_tai_khoan: ten_tai_khoan,
				},
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	getLevel: async function(req){
		const { 
			min_cap,
			max_cap,
			min_so_diem_can,
			max_so_diem_can,
			ten_cap_do,
		} = req.query;

		try{
			if(isStrict){
				const result = await prisma.cap_do.findMany({
					where:{
						cap: {
							gte: min_cap,
							lte: max_cap,
						},
						so_diem_can: {
							gte: min_so_diem_can,
							lte: max_so_diem_can,
						},
						ten_cap_do: ten_cap_do,
					},
				});

				return result;
			}
			else{
				const result = await prisma.cap_do.findMany({
					where:{
						cap: {
							gte: min_cap,
							lte: max_cap,
						},
						so_diem_can: {
							gte: min_so_diem_can,
							lte: max_so_diem_can,
						},
						ten_cap_do: {
							contains: ten_cap_do,
						},
					},
				});

				return result;
			}

			return result;

		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	postLevel: async function(req){
		const {
			cap,
			so_diem_can,
			ten_cap_do,
		} = req.body;

		try{
			const result = await prisma.cap_do.create({
				data:{
					cap: cap,
					so_diem_can: so_diem_can,
					ten_cap_do: ten_cap_do,
				},
			});

			return result;

		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	patchLevel: async function(req){
		const {
			cap,
			so_diem_can,
			ten_cap_do,
		} = req.query;

		const {
			new_cap,
			new_so_diem_can,
			new_ten_cap_do,
		} = req.body;

		try{
			const result = await prisma.khach_hang.update({
				where:{
					cap: cap,
					so_diem_can: so_diem_can,
					ten_cap_do: ten_cap_do,
				},
				data:{
					cap: new_cap,
					so_diem_can: new_so_diem_can,
					ten_cap_do: new_ten_cap_do,
				},
			});

			return result;

		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},

	deleteLevel: async function(req){
		const {
			cap,
			so_diem_can,
			ten_cap_do,
		} = req.query;

		try{
			const result = await prisma.khach_hang.delete({
				where:{
					cap: cap,
					so_diem_can: so_diem_can,
					ten_cap_do: ten_cap_do
				}
			});

			return result;
		}
		catch(e){
			throw new UnprocessableContentError(e.message);
		}
	},
}
