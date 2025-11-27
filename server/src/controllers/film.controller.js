import {filmService} from "../services/film.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";


export const filmController = {
	create: async function(req, res, next) {
		try{
			const result = await filmService.create(req)
			const response = handleSuccessResponse(
				'Success',
				undefined,
				result,
			);
			res.status(response.code).json(response);
		} catch (err) {
			next(err);
		}
	}
}
