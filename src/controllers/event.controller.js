import { eventService } from "../services/event.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";


export const eventController = {
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
