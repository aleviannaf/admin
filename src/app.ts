import "express-async-errors"
import express, { Application, json } from "express"
import middlewares from "./middlewares"
import userRouter from "./routers/user.routes"
import sessionRouter from "./routers/session.routes"

const app: Application = express()
app.use(json())

app.use("/users", userRouter)
app.use("/login", sessionRouter)


app.use(middlewares.handleErrors)

export default app