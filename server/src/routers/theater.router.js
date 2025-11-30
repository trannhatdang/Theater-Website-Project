import { theaterController } from "../controllers/theater.controller.js"
import express from "express";

const theaterRouter = express.Router();

theaterRouter.get(
	'/',
	theaterController.getTheater
)
theaterRouter.post(
	'/',
	theaterController.postTheater
)
theaterRouter.patch(
	'/',
	theaterController.patchTheater
)
theaterRouter.delete(
	'/',
	theaterController.deleteTheater
)

theaterRouter.get(
	'/room',
	theaterController.getRoom
)
theaterRouter.post(
	'/room',
	theaterController.postRoom
)
theaterRouter.patch(
	'/room',
	theaterController.patchRoom
)
theaterRouter.delete(
	'/room',
	theaterController.deleteRoom
)

theaterRouter.get(
	'/seat',
	theaterController.getSeat
)
theaterRouter.post(
	'/seat',
	theaterController.postSeat
)
theaterRouter.patch(
	'/seat',
	theaterController.patchSeat
)
theaterRouter.delete(
	'/seat',
	theaterController.deleteSeat
)

export default theaterRouter;
