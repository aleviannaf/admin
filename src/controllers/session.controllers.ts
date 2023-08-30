import { Request, Response } from "express"
import createLoginService from "../services/login/createLogin.service"

const login = async (request: Request, response: Response ):Promise<Response> => {
    const token: Object = await createLoginService(request.body)

    return response.status(200).json(token)
}

export default { login }