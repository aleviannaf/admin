import { z } from "zod"
import { userCreateSchema, userPaginationSchema, userReadSchema, userSchema, userWithoutPassword } from "../schemas"
import { QueryResult } from "pg"


type User = z.infer<typeof userSchema>
type UserRequest = z.infer<typeof userCreateSchema>
type UserReturn = z.infer<typeof userWithoutPassword>
type UserRead = z.infer<typeof userReadSchema>
type UserPagination = z.infer<typeof userPaginationSchema>
type UserResult = QueryResult<User>


export {
    User,
    UserRequest,
    UserResult,
    UserReturn,
    UserRead,
    UserPagination 
}