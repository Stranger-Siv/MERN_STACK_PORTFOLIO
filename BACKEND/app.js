import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/error.js"
import messageRouter from "./router/messageRoutes.js"
import userRouter from "./router/userRoutes.js"
import timelineRouter from "./router/timelineRoutes.js"
import applicationRouter from "./router/softwareApplicationRoutes.js"
import skillRouter from "./router/skillRouter.js"
import projectRouter from "./router/projectRoutes.js"
import axios from "axios";

const app = express();
dotenv.config({ path: "./config/.env" })

app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true
}))

const url = `https://portfolio-nmg4.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

console.log()
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/"
    })
)

app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/timeline", timelineRouter)
app.use("/api/v1/softwareapplication", applicationRouter)
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter)

dbConnection();
app.use(errorMiddleware);

export default app;
