import { Request, Response, NextFunction } from "express"
import AppError from "../AppError"


const verifyAdmin =async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { admin } = response.locals.decoded

    if(!admin){
        throw new AppError("Insufiicient permissions", 401)
    }
    
    return next()
}

export default verifyAdmin