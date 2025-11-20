import express from "express";
import filmRouter from "./film.router.js"
import employeeRouter from "./employee.router.js"
import eventRouter from "./event.router.js"
import promotionRouter from "./promotion.router.js"

const rootRouter = express.Router();

rootRouter.use("/film", filmRouter);

rootRouter.use(express.static('static'))
rootRouter.get('/', (req, res) => {
	res.send('Hello World');
})

export default rootRouter;
