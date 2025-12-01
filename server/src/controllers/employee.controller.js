import { employeeService } from "../services/employee.service.js"
import { handleError } from '../helpers/handleError.js'

const employeeControllerMap = {
	getEmployee: employeeService.getEmployee,
	postEmployee: employeeService.postEmployee,
	patchEmployee: employeeService.patchEmployee,
	deleteEmployee: employeeService.deleteEmployee,

	getManager: employeeService.getManager,
	postManager: employeeService.postManager,
	patchManager: employeeService.patchManager,
	deleteManager: employeeService.deleteManager,

	getSalesperson: employeeService.getSalesperson,
	postSalesperson: employeeService.postSalesperson,
	patchSalesperson: employeeService.patchSalesperson,
	deleteSalesperson: employeeService.deleteSalesperson,

	getWorkShift: employeeService.getWorkShift,
	postWorkShift: employeeService.postWorkShift,
	patchWorkShift: employeeService.patchWorkShift,
	deleteWorkShift: employeeService.deleteWorkShift,
}

export default async function employeeController(req, res){
	try{
		const word = req.params?.type ? req.params.type[0] : "employee";
		const type = word[0].toUpperCase() + word.slice(1)
		const method = req.method.toLowerCase();
		const fn = method + type;

		const result = await employeeControllerMap[fn](req)
		res.status(200).send(result)
	}
	catch(error){
		handleError(error, req, res)
	}
}
