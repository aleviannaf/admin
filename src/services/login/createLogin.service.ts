import { QueryConfig } from "pg"
import { SessionRequest, UserResult } from "../../interfaces"
import client from "../../database/config"
import AppError from "../../AppError"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

const createLoginService = async (payload: SessionRequest): Promise<Object> => {
    const { email, password } = payload

    const queryConfig: QueryConfig = {
        text: `SELECT * FROM users WHERE email = $1;`,
        values: [email]
    }

    const queryResult: UserResult = await client.query(queryConfig)

    if (queryResult.rowCount === 0) {
        throw new AppError("Username or password is incorrect", 401)
    }

    if (!queryResult.rows[0].active) {
        throw new AppError("This developer is inactive", 401)
    }

    const checkPassword: boolean = await compare(password, queryResult.rows[0].password)

    if (!checkPassword) {
        throw new AppError("Username or password is incorrect", 401)
    }

    const token: string = sign(
        { email: queryResult.rows[0].email, admin: queryResult.rows[0].admin },
        String(process.env.SECRET_KEY!),
        { subject: String(queryResult.rows[0].id), expiresIn: "3h" }
    )

    return { token }
}

export default createLoginService