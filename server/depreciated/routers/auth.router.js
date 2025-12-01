import { authController } from "../controllers/auth.controller.js"
import express from "express";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
	res.sendFile(path.resolve('./src/static/auth/auth.html'))
})

authRouter.post(
	'/login',
	authController.login
)

authRouter.post(
	'/register',
	authController.register
)

export default authRouter;
