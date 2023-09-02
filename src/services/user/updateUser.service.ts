import format from "pg-format"
import { UserResult, UserReturn, UserUpdateRequest } from "../../interfaces"
import client from "../../database/config"
import { userWithoutPassword } from "../../schemas"

const updateUserService= async (userData: any, userId: string):Promise<UserReturn> => {
    console.log(userData)
    
    const query: string = format(
        `UPDATE users SET(%I) = ROW(%L) WHERE id = $1 RETURNING*;`,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryResult: UserResult = await client.query(query, [userId])

    return userWithoutPassword.parse(queryResult.rows[0])
}

export default updateUserService