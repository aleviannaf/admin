import { Request, Response, NextFunction } from "express"
import AppError from "../AppError"


const verifyUserPermission =async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const { id } = request.params

    const { sub, admin } = response.locals.decoded

    if(admin) return next()

    if(id !== sub){
        throw new AppError("Insufiicient permissions", 401)
    }
    
    return next()
}

export default verifyUserPermission