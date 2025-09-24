import i18n from '@/i18n';
import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .max(255, i18n.t('name_max_length', { ns: 'space' }))
    .min(1, i18n.t('name_required', { ns: 'space' })),

  space_type_id: z
    .number()
    .min(1, i18n.t('space_type_required', { ns: 'space' })),

  capacity: z.number().min(1, i18n.t('capacity_min', { ns: 'space' })),

  price_type_id: z
    .number()
    .min(1, i18n.t('price_type_required', { ns: 'space' })),

  price: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      error: i18n.t('price_invalid', { ns: 'space' }),
    })
    .refine((val) => Number(val) > 0, {
      error: i18n.t('price_min', { ns: 'space' }),
    }),

  description: z.string().optional(),

  status: z.enum(['available', 'unavailable'], {
    error: i18n.t('status_invalid', { ns: 'space' }),
  }),
});
