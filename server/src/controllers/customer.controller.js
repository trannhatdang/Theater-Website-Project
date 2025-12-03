import { customerService } from "../services/customer.service.js"
import { handleError } from '../helpers/handleError.js'

const customerControllerMap = {
	getCustomer: customerService.getCustomer,
	postCustomer: customerService.postCustomer,
	patchCustomer: customerService.patchCustomer,
	deleteCustomer: customerService.deleteCustomer,

	getLevel: customerService.getLevel,
	postLevel: customerService.postLevel,
	patchLevel: customerService.patchLevel,
	deleteLevel: customerService.deleteLevel,

	getCustomerAccount: customerService.getCustomerAccount,
	postCustomerAccount: customerService.postCustomerAccount,
	patchCustomerAccount: customerService.patchCustomerAccount,
	deleteCustomerAccount: customerService.deleteCustomerAccount,
}

export default async function customerController(req, res){
	try{
		const word = req.params?.type ? req.params.type[0] : "customer";
		const type = word[0].toUpperCase() + word.slice(1)
		const method = req.method.toLowerCase();
		const fn = method + type;

		const result = await customerControllerMap[fn](req)
		res.status(200).send(result)
	}
	catch(error){
		handleError(error, req, res)
	}
}
