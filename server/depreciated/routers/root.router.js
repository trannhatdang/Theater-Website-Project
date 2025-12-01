import authRouter from "./auth.router.js"
import filmRouter from "./film.router.js"
import employeeRouter from "./employee.router.js"
import eventRouter from "./event.router.js"
import promotionRouter from "./promotion.router.js"

import express from "express";
import authController from "./controllers/auth.controller.js"
import filmController from "./controllers/film.controller.js"
import employeeController from "./"
import theaterController from "./controllers/theater.controller.js"

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use("/film", filmRouter);
rootRouter.use("/employee", employeeRouter);
rootRouter.use('/event', eventRouter);
rootRouter.use('/promotion', promotionRouter);
rootRouter.use('/theater{/*type}', theaterController);

export default rootRouter;
