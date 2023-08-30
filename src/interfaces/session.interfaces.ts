import { z } from "zod"
import { sessionSchema } from "../schemas"

type SessionRequest = z.infer<typeof sessionSchema>

export { SessionRequest }