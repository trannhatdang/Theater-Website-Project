import {databaseService} from "../services/database.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";


export const databaseController {
	create: async function(req, res, next) {
		try{
			const result = await databaseService.create(req)
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
