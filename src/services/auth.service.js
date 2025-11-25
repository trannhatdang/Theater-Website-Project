import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const authService = {
	login: async function(req){
		console.log(req.body.username);
		console.log(req.body.password);

	},

	register: async function(req){
		const body = req.body;
		const customer = await prisma.khach_hang.findOne({
			where:{
				ten: req.body.FullName,
			}

		});

		if(customer != undefined) 
		{
			throw ConflictError;
		}

		const new_cus = await prisma.khach_hang.create({
			data: {
				ten:,
				sdt:,
				gioi_tinh:,
				email:,
			}
			
		})

		const user = await prisma.tai_khoan_khach_hang.create({
			data: {
				ten_tai_khoan: req.body.username,
				mat_khau: req.body.password
			}
		})
	}
}
