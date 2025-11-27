import { eventService } from "../services/event.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";
import { handleError } from "../helpers/handleError.js"


export const eventController = {
	get: async function(req, res, next) {
		try{
			const result = await filmService.create(req)
			const response = handleSuccessResponse(
				'Success',
				undefined,
				result,
			);
			res.status(response.code).json(response);
		} catch (err) {
			handleError(err, req, res, next)
		}
	}
}
