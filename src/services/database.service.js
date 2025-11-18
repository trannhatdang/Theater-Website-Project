import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const databaseService = {
	create: async function(req){
		console.log(req.body);
	}
}
