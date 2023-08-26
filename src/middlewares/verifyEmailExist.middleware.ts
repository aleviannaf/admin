import { Request, Response, NextFunction } from "express"
import { QueryResult } from "pg"
import client from "../database/config"
import AppError from "../AppError"

const verifyEmailExist =async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { email } = request.body

    if(!email) return next()

    const query: QueryResult = await client.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    )

    if(query.rowCount != 0){
        throw new AppError("E-mail already registered",409)
    }

    return next()
}

export default verifyEmailExist