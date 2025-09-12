import { z } from 'zod';

export const formSchema = z
  .object({
    email: z.email(),
    password: z.string(),
    name: z.string(),
    phone_number: z.string().regex(/^[0-9\-\+\(\)\s]*$/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
