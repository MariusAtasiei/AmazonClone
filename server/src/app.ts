import express, { Request, Response } from "express"
import morgan from "morgan"
import mongo from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

mongo.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

mongo.connection.once("open", () => console.log("Database connected"))

// @ts-ignore
app.get("/check", (req: Request, res: Response) =>
  res.send("SERVER IS RUNNING")
)

import authRouter from "./routes/auth"
import userRouter from "./routes/user"

app.use("/auth", authRouter)
app.use("/user", userRouter)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
