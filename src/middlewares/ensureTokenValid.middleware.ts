import { NextFunction, Request, Response } from "express"
import AppError from "../AppError"
import { verify } from "jsonwebtoken"

const ensureTokenValid = (
    request: Request,
    response: Response,
    next: NextFunction
): Response | void => {
    let authorization: string | undefined = request.headers.authorization

    if (!authorization) {
        throw new AppError("Missing bearer token", 401)
    }

    authorization = authorization.split(" ")[1]

    verify(authorization, process.env.SECRET_KEY!, (err, decoded) => {
        if(err) throw new AppError(err.message, 401)

        response.locals = { ...response.locals, decoded}
    })

    return next()
}

export default ensureTokenValid