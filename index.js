import express from "express"
import {config} from "dotenv"
import { mongoConnection } from "./config/data/data.js";
import userRoutes  from './routes/user.routes.js'
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

config({path:"./config/.env"});
mongoConnection()
const app=express()

// middlewares
app.use(express.json())
app.use(cookieParser())

// routes
app.use("/api/users",userRoutes)
app.use(errorMiddleware)

app.listen(process.env.PORT,()=>console.log(`server is working on port ${process.env.PORT}`))