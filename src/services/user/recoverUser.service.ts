import { QueryConfig } from "pg"
import { UserResult, UserReturn } from "../../interfaces"
import client from "../../database/config"
import { userWithoutPassword } from "../../schemas"
import AppError from "../../AppError"

const recoverUserService = async (id: string): Promise<UserReturn> => {
    const query: QueryConfig = {
        text: `SELECT active FROM users WHERE id = $1;`,
        values: [id]
    }

    const checkActive: UserResult = await client.query(query)

    if (checkActive.rows[0].active) {
        throw new AppError("User already active", 400)
    }
    
    const queryString: QueryConfig = {
        text: `UPDATE users SET active = TRUE WHERE id = $1 RETURNING *;`,
        values: [id]
    }

    const queryResult: UserResult = await client.query(queryString)

    return userWithoutPassword.parse(queryResult.rows[0])
}

export default recoverUserService