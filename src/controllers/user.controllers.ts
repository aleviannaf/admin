import { Request, Response } from "express"
import { UserReturn } from "../interfaces"
import createUserService from "../services/user/createUser.service"
import retrieveUserService from "../services/user/retrieveUser.service"

const create = async (request: Request, response: Response ):Promise<Response> => {
    const newUser: UserReturn = await createUserService(request.body)

    return response.status(201).json(newUser)
}

const retrieve = async (request: Request, response: Response ):Promise<Response> => {
    const userData: UserReturn = await retrieveUserService(request.params.id)

    return response.status(200).json(userData)
}

export default {
    create,
    retrieve
}