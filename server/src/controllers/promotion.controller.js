import { promotionService } from "../services/promotion.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";

export const promotionControllerMap = {
	getPromotion: promotionService.getPromotion,
	postPromotion: promotionService.postPromotion,
	patchPromotion: promotionService.patchPromotion,
	deletePromotion: promotionService.deletePromotion,

	getTheaterPromotion: promotionService.getTheaterPromotion,
	postTheaterPromotion: promotionService.postTheaterPromotion,
	patchTheaterPromotion: promotionService.patchTheaterPromotion,
	deleteTheaterPromotion: promotionService.deleteTheaterPromotion,

	getExchangePromotion: promotionService.getExchangePromotion,
	postExchangePromotion: promotionService.postExchangePromotion,
	patchExchangePromotion: promotionService.patchExchangePromotion,
	deleteExchangePromotion: promotionService.deleteExchangePromotion,

	getRelationTheaterPromotion: promotionService.getRelationTheaterPromotion,
	postRelationTheaterPromotion: promotionService.postRelationTheaterPromotion,
	patchRelationTheaterPromotion: promotionService.patchRelationTheaterPromotion,
	deleteRelationTheaterPromotion: promotionService.deleteRelationTheaterPromotion,

	getRelationExchangePromotion: promotionService.getRelationExchangePromotion,
	postRelationExchangePromotion: promotionService.postRelationExchangePromotion,
	patchRelationExchangePromotion: promotionService.patchRelationExchangePromotion,
	deleteRelationExchangePromotion: promotionService.deleteRelationExchangePromotion,
}

export default async function promotionController(req, res) = {
	try{
		const word = req.params?.type ? req.params.type[0] : "promotion";
		const type = word[0].toUpperCase() + word.slice(1)
		const method = req.method.toLowerCase();
		const fn = method + type;

		const result = await promotionControllerMap[fn](req)
		res.status(200).send(result)
	}
	catch(error){
		handleError(error, req, res)
	}
}
