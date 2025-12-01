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


	/*getTheater: async function(req, res, next) {
		try{
			const data = await theaterService.getTheater(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	postTheater: async function(req, res, next) {
		try{
			const data = await theaterService.postTheater(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	patchTheater: async function(req, res, next) {
		try{
			const data = await theaterService.patchTheater(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	deleteTheater: async function(req, res, next) {
		try{
			const data = await theaterService.deleteTheater(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	getRoom: async function(req, res, next) {
		try{
			const data = await theaterService.getRoom(req)
			res.status(200).send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	postRoom: async function(req, res, next) {
		try{
			const data = await theaterService.getTheater(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	patchRoom: async function(req, res, next) {
		try{
			const data = await theaterService.getTheater(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	deleteRoom: async function(req, res, next) {
		try{
			const data = await theaterService.deleteTheater(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	getSeat: async function(req, res, next) {
		try{
			const data = await theaterService.getSeat(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	postSeat: async function(req, res, next) {
		try{
			const data = await theaterService.getSeat(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	patchSeat: async function(req, res, next) {
		try{
			const {data, metaData} = await theaterService.patchSeat(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	deleteSeat: async function(req, res, next) {
		try{
			const data = await theaterService.deleteSeat(req)
			res.status(200).send(data)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},*/
}
