import { advancedService } from "../services/advanced.service.js"
import { handleError } from '../helpers/handleError.js'

// Source - https://stackoverflow.com/a
// Posted by Aleksander Marek
// Retrieved 2025-12-11, License - CC BY-SA 4.0



BigInt.prototype.toJSON = function () { return Number(this) }

const AdvancedControllerMap = {
	getAdvanced: advancedService.getAdvanced,
	getStats: advancedService.getStats
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
