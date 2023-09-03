import { Request, Response, NextFunction } from "express"
import { QueryResult } from "pg"
import client from "../database/config"
import AppError from "../AppError"

const checkIdIfExist =async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { id } = request.params

    if(!id) return next()

    const query: QueryResult = await client.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
    )

    if(query.rowCount === 0){
        throw new AppError("User not found",404)
    }

    return next()
}

export default checkIdIfExist