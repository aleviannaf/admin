import { NextFunction, Request, Response } from "express"
import AppError from "../AppError"
import { verify } from "jsonwebtoken"
import { QueryConfig } from "pg"
import { UserResult } from "../interfaces"
import client from "../database/config"

const ensureTokenValid = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    let authorization: string | undefined = request.headers.authorization

    if (!authorization) {
        throw new AppError("Missing bearer token", 401)
    }

    authorization = authorization.split(" ")[1]

    verify(authorization, process.env.SECRET_KEY!, (err, decoded) => {
        if(err) throw new AppError(err.message, 401)

        response.locals = { ...response.locals, decoded}
    })

    const query: QueryConfig = {
        text: `SELECT active FROM users WHERE id = $1;`,
        values: [response.locals.decoded.sub]
    }

    const queryResult: UserResult = await client.query(query)

    if(!queryResult.rows[0].active){
        throw new AppError("User not exist", 400)
    }

    return next()
}

export default ensureTokenValid