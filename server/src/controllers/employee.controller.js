import { employeeService } from "../services/employee.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";
import { handleError } from '../helpers/handleError.js'


export const employeeController = {
	getEmployee: async function(req, res, next){
		try{
			const {data, metaData} = await employeeService.getEmployee(req)
			const response = handleSuccessResponse(
				"Get Employee Success",
				200,
				metaData,
				data
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	postEmployee: async function(req, res, next){
		try{
			const {data, metaData} = await employeeService.postEmployee(req)
			const response = handleSuccessResponse(
				"Post Employee Success",
				200,
				metaData,
				data
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	patchEmployee: async function(req, res, next){
		try{
			const {data, metaData} = await employeeService.patchEmployee(req)
			const response = handleSuccessResponse(
				"Patch Employee Success",
				200,
				metaData,
				data
			)
			res.send(response)
		}
		catch (err){
			handleError(error, req, res, next);
		}
	},
	deleteEmployee: async function(req, res, next){
		try{
			const {data, metaData} = await employeeService.deleteEmployee(req)
			const response = handleSuccessResponse(
				"Delete Employee Success",
				200,
				metaData,
				data
			)
			res.send(response)
		}
		catch(err){
			handle
		}

	}

}
