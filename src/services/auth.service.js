import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const authService = {
	login: async function(req, res){
		console.log(req.body.username);
		console.log(req.body.password);

	}

	register: async function(req, res){

	}
}
