import { theaterService } from "../services/theater.service.js"
import { handleError } from '../helpers/handleError.js'

const theaterControllerMap = {
	getTheater: theaterService.getTheater,
	postTheater: theaterService.postTheater,
	patchTheater: theaterService.patchTheater,
	deleteTheater: theaterService.deleteTheater,
	getRoom: theaterService.getRoom,
	postRoom: theaterService.postRoom,
	patchRoom: theaterService.patchRoom,
	deleteRoom: theaterService.deleteRoom,
	getSeat: theaterService.getSeat,
	postSeat: theaterService.postSeat,
	patchSeat: theaterService.patchSeat,
	deleteSeat: theaterService.deleteSeat,
}

export default async function theaterController(req, res){
	try{
		const word = req.params?.type ? req.params.type[0] : "theater";
		const type = word[0].toUpperCase() + word.slice(1)
		const method = req.method.toLowerCase();
		const fn = method + type;

		const result = await theaterControllerMap[fn](req)
		res.status(200).send(result)
	}
	catch(error){
		handleError(error, req, res, next)
	}
}
