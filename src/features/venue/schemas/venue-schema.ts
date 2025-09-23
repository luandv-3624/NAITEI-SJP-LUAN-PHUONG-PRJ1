import i18n from '@/i18n';
import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .max(255, i18n.t('name_max_length', { ns: 'venue' }))
    .min(1, i18n.t('name_required', { ns: 'venue' })),
  address: z
    .string()
    .max(500, i18n.t('address_max_length', { ns: 'venue' }))
    .min(1, i18n.t('address_required', { ns: 'venue' })),
  ward_id: z.number().min(1, i18n.t('ward_required', { ns: 'venue' })),
  lat: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      error: i18n.t('lat_invalid', { ns: 'venue' }),
    })
    .refine((val) => Number(val) >= -90 && Number(val) <= 90, {
      error: i18n.t('lat_range', { ns: 'venue' }),
    }),
  lng: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      error: i18n.t('lng_invalid', { ns: 'venue' }),
    })
    .refine((val) => Number(val) >= -180 && Number(val) <= 180, {
      error: i18n.t('lng_range', { ns: 'venue' }),
    }),
  description: z.string().optional(),
});
