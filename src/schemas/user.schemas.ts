import { z } from "zod"

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(100),
    email: z.string().email().max(100),
    password: z.string().max(120),
    admin: z.boolean().default(false),
    active: z.boolean().default(true)
})

const userCreateSchema = userSchema.omit({
    id: true,
    active: true
})

const userWithoutPassword = userSchema.omit({
    password: true
})

const userReadSchema = userWithoutPassword.array()

const userPaginationSchema = z.object({
    prevPage: z.string().nullable(),
    nextPage: z.string().nullable(),
    currentPage: z.number().positive(),
    totalItens: z.number().positive(),
    data: userReadSchema
})

export {
    userSchema,
    userCreateSchema,
    userWithoutPassword,
    userReadSchema,
    userPaginationSchema
}