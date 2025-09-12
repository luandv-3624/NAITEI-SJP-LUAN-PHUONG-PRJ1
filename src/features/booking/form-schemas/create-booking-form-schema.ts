import { z } from 'zod';
import i18n from '@/i18n';

export const formSchema = z
  .object({
    startTime: z.string().nonempty(i18n.t('required_start', { ns: 'booking' })),
    endTime: z.string().nonempty(i18n.t('required_end', { ns: 'booking' })),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: i18n.t('end_after_start', { ns: 'booking' }),
    path: ['endTime'],
  });
