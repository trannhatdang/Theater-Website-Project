import {employeeService} from "../services/employee.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";
import {handleError} from '../helpers/handleError.js'


export const employeeController = {
	getEmployee: async function(req, res, next) {
		try{
			const result = await employeeService.getEmployee(req)
			const response = handleSuccessResponse(
				message="Get Employee Success",
				code=200,
				metaData=undefined,
				data=result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	postEmployee: async function(req, res, next) {
		try{
			const result = await employeeService.postEmployee(req)
			const response = handleSuccessResponse(
				"Post Employee Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	}
}
