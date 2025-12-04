import { BillService } from "../services/bill.service.js"
import { handleError } from '../helpers/handleError.js'

const BillControllerMap = {
	getBill: billService.getBill,
	postBill: billService.postBill,
	patchBill: billService.patchBill,
	deleteBill: billService.deleteBill,

	getFood: billService.getFood,
	postFood: billService.postFood,
	patchFood: billService.patchFood,
	deleteFood: billService.deleteFood,

	getRelationBillFood: billService.getRelationBillFood,
	postRelationBillFood: billService.postRelationBillFood,
	patchRelationBillFood: billService.patchRelationBillFood,
	deleteRelationBillFood: billService.deleteRelationBillFood,

	getTicket: billService.getTicket,
	postTicket: billService.postTicket,
	patchTicket: billService.patchTicket,
	deleteTicket: billService.deleteTicket,
}

export default async function billController(req, res){
	try{
		const word = req.params?.type ? req.params.type[0] : "Bill";
		const type = word[0].toUpperCase() + word.slice(1)
		const method = req.method.toLowerCase();
		const fn = method + type;

		const result = await BillControllerMap[fn](req)
		res.status(200).send(result)
	}
	catch(error){
		handleError(error, req, res)
	}
}
