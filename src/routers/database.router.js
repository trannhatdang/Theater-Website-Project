import databaseController from "../controllers/database.controller.js"
import express from "express";

const databaseRouter = express.Router();


bookingRouter.post(
	"/",
	bookingController.create
)

export default databaseRouter;
