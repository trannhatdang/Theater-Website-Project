import {theaterService} from "../services/theater.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";
import {handleError} from '../helpers/handleError.js'


export const theaterController = {
	getTheater: async function(req, res, next) {
		try{
			const {data, metaData} = await theaterService.getTheater(req)
			const response = handleSuccessResponse(
				"Get Theater Success",
				200,
				undefined,
				data
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	postTheater: async function(req, res, next) {
		try{
			const result = await theaterService.postTheater(req)
			const response = handleSuccessResponse(
				"Post Theater Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	patchTheater: async function(req, res, next) {
		try{
			const result = await theaterService.patchTheater(req)
			const response = handleSuccessResponse(
				"Patch Theater Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	deleteTheater: async function(req, res, next) {
		try{
			const result = await theaterService.deleteTheater(req)
			const response = handleSuccessResponse(
				"Delete Theater Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	getRoom: async function(req, res, next) {
		try{
			const result = await theaterService.getRoom(req)
			const response = handleSuccessResponse(
				"Get Room Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	postRoom: async function(req, res, next) {
		try{
			const result = await theaterService.getTheater(req)
			const response = handleSuccessResponse(
				"Post Room Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	patchRoom: async function(req, res, next) {
		try{
			const result = await theaterService.getTheater(req)
			const response = handleSuccessResponse(
				"Get Room Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	deleteRoom: async function(req, res, next) {
		try{
			const result = await theaterService.deleteTheater(req)
			const response = handleSuccessResponse(
				"Get Room Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	getSeat: async function(req, res, next) {
		try{
			const result = await theaterService.getSeat(req)
			const response = handleSuccessResponse(
				"Get Seat Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	postSeat: async function(req, res, next) {
		try{
			const result = await theaterService.getSeat(req)
			const response = handleSuccessResponse(
				"Post Seat Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	patchSeat: async function(req, res, next) {
		try{
			const result = await theaterService.patchSeat(req)
			const response = handleSuccessResponse(
				"Patch Seat Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
	deleteSeat: async function(req, res, next) {
		try{
			const result = await theaterService.deleteSeat(req)
			const response = handleSuccessResponse(
				"Delete Seat Success",
				200,
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
}
