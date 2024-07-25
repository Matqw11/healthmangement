import { z } from 'zod'

export const userFormValidation = z.object({
    name: z.string()
    .min(5, "name must be at least 5 characters.")
    .max(50, "name must be at most 50 characters."),
    email: z.string().email('invalid email address'),
    phone : z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), 'invalid phone number')
})