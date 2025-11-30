import {theaterService} from "../services/theater.service.js"
import { handleSuccessResponse } from "../helpers/handleResponse.js";
import {handleError} from '../helpers/handleError.js'


export const theaterController = {
	getTheater: async function(req, res, next) {
		try{
			const result = await theaterService.getTheater(req)
			const response = handleSuccessResponse(
				message="Get Theater Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Post Theater Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Patch Theater Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Delete Theater Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Get Room Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Post Room Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Get Room Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Get Room Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Get Room Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Post Room Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Get Room Success",
				code=200,
				metaData=undefined,
				data=result
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
				message="Get Room Success",
				code=200,
				metaData=undefined,
				data=result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},
}
