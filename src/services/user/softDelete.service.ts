import { QueryConfig } from "pg"
import client from "../../database/config"
import { UserResult } from "../../interfaces"
import AppError from "../../AppError"

const softDeleteService = async (id: string): Promise<void> => {
    const query: QueryConfig = {
        text: `SELECT active FROM users WHERE id = $1;`,
        values: [id]
    }

    const queryResult: UserResult = await client.query(query)

    if (!queryResult.rows[0].active) {
        throw new AppError("User already disabled", 400)
    }
    
    const queryString: QueryConfig = {
        text: `UPDATE users SET active = FALSE WHERE id = $1;`,
        values: [id]
    }

    await client.query(queryString)
}

export default softDeleteService