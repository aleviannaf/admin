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

userRouter.get("",
    middlewares.ensureTokenValid,
    middlewares.verifyUserPermission,
    userControllers.read
)

userRouter.get("/profile",
    middlewares.ensureTokenValid,
    middlewares.verifyUserPermission,
    userControllers.retrieve
)

export default userRouter