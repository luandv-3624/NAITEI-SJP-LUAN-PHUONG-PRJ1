import { z } from 'zod';
import i18n from '@/i18n';

export const paymentFormSchema = (remaining: number) =>
  z
    .object({
      mode: z.enum(['full', 'partial']),
      partialAmount: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.mode === 'partial') {
        const val = data.partialAmount?.trim();
        if (!val) {
          ctx.addIssue({
            path: ['partialAmount'],
            message: i18n.t('payment.required_amount', { ns: 'booking' }),
            code: 'custom',
          });
          return;
        }
        const num = Number(val);
        if (isNaN(num)) {
          ctx.addIssue({
            path: ['partialAmount'],
            message: i18n.t('payment.invalid_number', { ns: 'booking' }),
            code: 'custom',
          });
        } else {
          if (num <= 0) {
            ctx.addIssue({
              path: ['partialAmount'],
              message: i18n.t('payment.min_label', { ns: 'booking' }),
              code: 'custom',
            });
          }
          if (num > remaining) {
            ctx.addIssue({
              path: ['partialAmount'],
              message: i18n.t('payment.max_label', {
                ns: 'booking',
                amount: remaining.toLocaleString(),
              }),
              code: 'custom',
            });
          }
        }
      }
    });
