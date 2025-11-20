import prisma from "../common/prisma/prisma.init.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../helpers/handleError.js";

export const filmService = {
	create: async function(req){
		try{
			filters = req.filters;



			films = prisma.film.findMany({

			})
		}
		catch (error){

		}
	}
}
