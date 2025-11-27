import { eventController } from "../controllers/event.controller.js"
import express from "express";

const eventRouter = express.Router();

eventRouter.get('/', eventController.get);

export default eventRouter;
