import { Request, Response } from "express"
import { UserPagination, UserReturn } from "../interfaces"
import createUserService from "../services/user/createUser.service"
import retrieveUserService from "../services/user/retrieveUser.service"
import readUsersService from "../services/user/readUsers.service"

const create = async (request: Request, response: Response ):Promise<Response> => {
    const newUser: UserReturn = await createUserService(request.body)

    return response.status(201).json(newUser)
}

const retrieve = async (request: Request, response: Response ):Promise<Response> => {
    const userData: UserReturn = await retrieveUserService(request.params.id)

    return response.status(200).json(userData)
}

const read = async (request: Request, response: Response): Promise<Response> =>{
    const userList: UserPagination = await readUsersService(request.query)

    return response.status(200).json(userList)
}

export default {
    create,
    retrieve,
    read 
}