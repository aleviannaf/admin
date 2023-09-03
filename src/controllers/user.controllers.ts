import { Request, Response } from "express"
import { User, UserPagination, UserReturn } from "../interfaces"
import createUserService from "../services/user/createUser.service"
import retrieveUserService from "../services/user/retrieveUser.service"
import readUsersService from "../services/user/readUsers.service"
import updateUserService from "../services/user/updateUser.service"
import softDeleteService from "../services/user/softDelete.service"
import recoverUserService from "../services/user/recoverUser.service"

const create = async (request: Request, response: Response): Promise<Response> => {
    const newUser: UserReturn = await createUserService(request.body)

    return response.status(201).json(newUser)
}

const retrieve = async (request: Request, response: Response): Promise<Response> => {
    const userData: UserReturn = await retrieveUserService(response.locals.decoded.sub)

    return response.status(200).json(userData)
}

const read = async (request: Request, response: Response): Promise<Response> => {
    const userList: UserPagination = await readUsersService(request.query)

    return response.status(200).json(userList)
}

const update = async (request: Request, response: Response): Promise<Response> => {
    const updateUser: UserReturn = await updateUserService(request.body, request.params.id)

    return response.status(200).json(updateUser)
}

const softDelete = async (request: Request, response: Response): Promise<Response> => {
    await softDeleteService(request.params.id)

    return response.status(204).send()
}

const recover = async (request: Request, response: Response): Promise<Response> => {
    const userData: UserReturn = await recoverUserService(request.params.id)

    return response.status(200).json(userData)
}

export default {
    create,
    retrieve,
    read,
    update,
    softDelete,
    recover
}