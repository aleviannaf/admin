import { z } from "zod"
import { userCreateSchema, userSchema, userWithoutPassword } from "../schemas"
import { QueryResult } from "pg"


type User = z.infer<typeof userSchema>
type UserRequest = z.infer<typeof userCreateSchema>
type UserReturn = z.infer<typeof userWithoutPassword>
type UserResult = QueryResult<User>

export {
    User,
    UserRequest,
    UserResult,
    UserReturn
}