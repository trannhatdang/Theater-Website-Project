import { theaterService } from "../services/theater.service.js"
import { handleError } from '../helpers/handleError.js'

export const theaterController = {
	getTheater: async function(req, res, next) {
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
	},
}
