import express from "express";
import authRouter from "./auth.router.js"
import filmRouter from "./film.router.js"
import employeeRouter from "./employee.router.js"
import eventRouter from "./event.router.js"
import promotionRouter from "./promotion.router.js"
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use("/film", filmRouter);
rootRouter.use("/employee", employeeRouter);
rootRouter.use('/event', eventRouter);
rootRouter.use('/promotion', promotionRouter);

rootRouter.use(express.static('./src/static'))
rootRouter.get('/', (req, res) => {
	res.sendFile(path.resolve('./src/static/main.html'))
})

export default rootRouter;
