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
		console.log(req.body);
		const user = prisma.tai_khoan_khach_hang.create({
			data: {
				ten_tai_khoan: req.body.username,
				mat_khau: req.body.password
			}
		})
		console.log(user);
	}
}
