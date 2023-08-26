import { z } from "zod"
import { NextFunction, Request, Response } from "express"

const ensureBody = (
    schema: z.ZodTypeAny
) => (
    request: Request,
    response: Response,
    next: NextFunction
): Response | void => {
   const validatedData: any = schema.parse(request.body)
   
   request.body = validatedData
   
   return next()
}

export default ensureBody