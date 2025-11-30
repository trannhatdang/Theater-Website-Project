import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const authService = {
	login: async function(req){
		const query = req.query;
		const in_username = body.username;
		const in_password = body.password;

		const user = await prisma.tai_khoan_khach_hang.findOne({
			where:{
				ten_tai_khoan: in_username,
				mat_khau: in_password
			}
		})

		return user;
	},

	register: async function(req){
		const body = req.body;
		const in_ten = body?.ten;
		const in_sdt = body?.sdt;
		const in_gioi_tinh = body?.gioi_tinh;
		const in_email = body?.email;
		const in_username = body?.username;
		const in_password = body?.password;

		const customer = await prisma.khach_hang.findOne({
			where:{
				ten: in_ten,
			}

		});

		if(customer != undefined) 
		{
			throw ConflictError;
		}

		const new_customer = await prisma.khach_hang.create({
			data: {
				ten: in_ten,
				sdt: in_sdt,
				gioi_tinh: in_gioi_tinh,
				email: in_email,
			}
			
		});

		const user = await prisma.tai_khoan_khach_hang.create({
			data: {
				ten_tai_khoan: in_username,
				mat_khau: in_password
			}
		});
	}
}
