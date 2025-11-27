import {employeeService} from "../services/employee.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";
import {handleError} from '../helpers/handleError.js'


export const employeeController = {
	get: async function(req, res, next) {
		try{
			const result = await employeeService.get(req)
			const response = handleSuccessResponse(
				"Get Employee Success",
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	create: async function() {

	}
}
