import { Router } from "express"
import { userControllers } from "../controllers"
import middlewares from "../middlewares"
import { userCreateSchema } from "../schemas"

const userRouter: Router = Router()

userRouter.post("",
    middlewares.ensureBody(userCreateSchema),
    middlewares.verifyEmailExist,
    userControllers.create
)

export default userRouter