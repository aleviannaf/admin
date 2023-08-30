import { UserPagination, UserRead, UserResult } from "../../interfaces"
import client from "../../database/config"
import { QueryConfig, QueryResult } from "pg"
import { userPaginationSchema } from "../../schemas"


const readUsersService = async (payload: any): Promise<UserPagination> => {
    let perPage = Number(payload.perPage) || 5
    let page = payload.page ? Number(payload.page) : 1


    const queryResultAllUsers: QueryResult = await client.query("SELECT COUNT(*) FROM users;")

    const totalUsers: number = parseInt(queryResultAllUsers.rows[0].count)

    const queryConfig: QueryConfig = {
        text: `SELECT * FROM users OFFSET $1 LIMIT $2;`,
        values: [perPage * (page - 1), perPage]
    }

    const queryResult: QueryResult = await client.query(queryConfig)

    const baseUrl: string = `http://localhost:3000/users`
    const prevPage: string | null = page == 1 ? null : `${baseUrl}?page=${page - 1}&perPage=${perPage}`
    const nextPage: string | null = page >= (totalUsers / perPage) ? null : `${baseUrl}?page=${page + 1}&perPage=${perPage}`


    const pagination: UserPagination = userPaginationSchema.parse({
        prevPage: prevPage,
        nextPage: nextPage,
        currentPage: page,
        totalItens: totalUsers,
        data: queryResult.rows
    })

    return pagination
}

export default readUsersService