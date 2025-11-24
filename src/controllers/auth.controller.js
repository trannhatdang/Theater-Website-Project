import express from 'express'
import {authService} from '../services/auth.service.js'
import {handleSuccessResponse} from '../helpers/handleResponse.js'

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
			console.log(error);
		}
	},

	register: async function(req, res, next){
		try{
			const result = authService.register(req)
			const response = handleSuccessResponse(
				"Register Success",
				undefined,
				result
			)
			res.send(response)
		}
		catch (error){
			console.log(error);
		}
	}
}
