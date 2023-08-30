import { Router } from "express"
import { sessionControllers } from "../controllers"
import middlewares from "../middlewares"
import { sessionSchema } from "../schemas"


const sessionRouter: Router = Router()

sessionRouter.post("",
    middlewares.ensureBody(sessionSchema),
    sessionControllers.login
)

export default sessionRouter