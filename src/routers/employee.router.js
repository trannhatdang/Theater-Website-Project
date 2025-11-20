import { employeeController } from "../controllers/employee.controller.js"
import express from "express";

const employeeRouter = express.Router();

employeeRouter.get(
	'/',
	employeeController.get
)

employeeRouter.post(
	"/",
	employeeController.create
)

export default employeeRouter;
