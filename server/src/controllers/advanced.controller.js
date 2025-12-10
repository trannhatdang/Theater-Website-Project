import { advancedService } from "../services/advanced.service.js"
import { handleError } from '../helpers/handleError.js'

const AdvancedControllerMap = {
	getAdvanced: advancedService.getAdvanced,
}

export default async function advancedController(req, res){
	try{
		const word = req.params?.type ? req.params.type[0] : "advanced";
		const type = word[0].toUpperCase() + word.slice(1)
		const method = req.method.toLowerCase();
		const fn = method + type;

		const result = await AdvancedControllerMap[fn](req)
		res.status(200).send(result)
	}
	catch(error){
		handleError(error, req, res)
	}
}
