import express from "express";
import databaseRouter form "database.router.js"

const rootRouter = express.Router();

rootRouter.use("/database", databaseRouter);

export default rootRouter;
