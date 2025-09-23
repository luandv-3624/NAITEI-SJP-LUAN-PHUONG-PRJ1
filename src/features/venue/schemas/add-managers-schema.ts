import i18n from '@/i18n';
import { z } from 'zod';

export const formSchema = z.object({
  userIds: z
    .array(z.int())
    .min(1, { error: i18n.t('manager_required', { ns: 'venue' }) }),
});
