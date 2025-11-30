import express from "express";
import authRouter from "./auth.router.js"
import filmRouter from "./film.router.js"
import employeeRouter from "./employee.router.js"
import eventRouter from "./event.router.js"
import promotionRouter from "./promotion.router.js"
import theaterRouter from "./theater.router.js"

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use("/film", filmRouter);
rootRouter.use("/employee", employeeRouter);
rootRouter.use('/event', eventRouter);
rootRouter.use('/promotion', promotionRouter);
rootRouter.use('/theater', theaterRouter);

export default rootRouter;
