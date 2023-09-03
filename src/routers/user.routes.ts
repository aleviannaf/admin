import { Router } from "express"
import { userControllers } from "../controllers"
import middlewares from "../middlewares"
import { userCreateSchema, userUpdateSchema } from "../schemas"

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

userRouter.patch("/:id",
    middlewares.ensureTokenValid,
    middlewares.verifyUserPermission,
    middlewares.ensureBody(userUpdateSchema),
    userControllers.update
)

userRouter.delete("/:id",
    middlewares.ensureTokenValid,
    middlewares.verifyUserPermission,
    userControllers.softDelete
)

userRouter.put("/:id/recover",
    middlewares.ensureTokenValid,
    middlewares.verifyUserPermission,
    userControllers.recover
)

export default userRouter