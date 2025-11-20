import { authController } from "../controllers/auth.controller.js"
import express from "express";

const authRouter = express.Router();

authRouter.get(
	'/login',
	authController.login
)

authRouter.post(
	'register',
	authController.register
)

export default authRouter;
