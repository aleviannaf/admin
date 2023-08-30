import { QueryConfig } from "pg"
import { UserResult, UserReturn } from "../../interfaces"
import client from "../../database/config"
import AppError from "../../AppError"
import { userWithoutPassword } from "../../schemas"

const retrieveUserService = async (
    userId: string
): Promise<UserReturn> => {

   const query: QueryConfig = {
    text: `SELECT * FROM users WHERE id = $1;`,
    values: [userId]
   }

   const queryResult: UserResult = await client.query(query)
   
   if(queryResult.rowCount === 0){
    throw new AppError("User not found", 404)
   }

   return userWithoutPassword.parse(queryResult.rows[0])
}

export default retrieveUserService