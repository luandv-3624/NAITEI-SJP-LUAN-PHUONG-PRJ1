import { z } from 'zod';

export const formSchema = z
  .object({
    password: z.string().min(3),
    confirmPassword: z.string(),
    email: z.email(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
