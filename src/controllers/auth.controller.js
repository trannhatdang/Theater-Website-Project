import express from 'express'
import {authService} from '../services/auth.service.js'
import {handleSuccessResponse} from '../helpers/handleResponse.js'
import {handleError} from '../helpers/handleError.js'

export const authController = {
	login: async function(req, res, next){
		try{
			const result = authService.login(req)
			const response = handleSuccessResponse(
				"Login Success",
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	},

	register: async function(req, res, next){
		try{
			const result = authService.register(req, res)
			const response = handleSuccessResponse(
				"Register Success",
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			handleError(error, req, res, next);
		}
	}
}
