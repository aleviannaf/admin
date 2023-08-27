import { Request, Response } from "express"
import { UserReturn } from "../interfaces"
import createUserService from "../services/user/createUser.service"

const create = async (request: Request, response: Response ):Promise<Response> => {
    const newUser: UserReturn = await createUserService(request.body)

    return response.status(201).json(newUser)
}

export default {
    create
}