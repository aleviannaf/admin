import { z } from "zod"

const sessionSchema = z.object({
    email: z.string().max(50).email(),
    password: z.string().max(120)
})

export { sessionSchema }