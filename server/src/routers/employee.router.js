import { employeeController } from "../controllers/employee.controller.js"
import express from "express";

const employeeRouter = express.Router();

employeeRouter.get(
	'/',
	employeeController.getEmployee
)

employeeRouter.post(
	"/",
	employeeController.postEmployee
)

export default employeeRouter;
