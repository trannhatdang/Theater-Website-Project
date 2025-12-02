import express from "express";
import "dotenv/config";
import cors from "cors";
import rootRouter from "./src/root.router.js";
import { PORT } from "./src/common/constant/config.constant.js";
import { handleError } from "./src/helpers/handleError.js"

const app = express();
const port = PORT ?? 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rootRouter);

app.listen(PORT, () => {
	console.log(`Dự án đang chạy trên PORT ${port}!`);
});
