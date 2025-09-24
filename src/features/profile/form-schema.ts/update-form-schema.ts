import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
});
