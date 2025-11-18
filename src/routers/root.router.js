import express from "express";
import databaseRouter from "./database.router.js"

const rootRouter = express.Router();

rootRouter.use("/database", databaseRouter);

rootRouter.get(
	'/', (req, res) =>
	{
		rootController.send('Hello World')
	}
)

export default rootRouter;
