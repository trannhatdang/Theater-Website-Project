import { filmController } from "../controllers/film.controller.js"
import express from "express";

const filmRouter = express.Router();

filmRouter.post(
	"/",
	filmController.create
)

export default filmRouter;
