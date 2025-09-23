import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { formSchema } from '../schemas/space-schema';
import { Textarea } from '@/components/ui/textarea';
import { toInt } from '@/lib/to-int';
import { ReactNode } from 'react';
import { SpaceStatus } from '../types/space-status';
import { SpaceTypeSelect } from './space-type-select';
import { PriceTypeSelect } from './price-type-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SpaceFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialValues?: Partial<z.infer<typeof formSchema>>;
  submitBtn: ReactNode;
  disabled?: boolean;
};

export function SpaceForm({
  onSubmit,
  initialValues,
  submitBtn,
  disabled,
}: SpaceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      capacity: 0,
      space_type_id: 0,
      status: SpaceStatus.AVAILABLE,
      price_type_id: 0,
      price: '0',
      ...initialValues,
    },
  });

  const { t } = useTranslation('space');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('description')}</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='capacity'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('capacity')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  onChange={(e) => {
                    field.onChange(toInt(e.target.value, 0));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='space_type_id'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('space_type')}</FormLabel>
              <FormControl>
                <SpaceTypeSelect
                  value={field.value === 0 ? '' : String(field.value)}
                  onChange={(value) => {
                    field.onChange(toInt(value, 0));
                  }}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price_type_id'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('price_type')}</FormLabel>
              <FormControl>
                <PriceTypeSelect
                  value={field.value === 0 ? '' : String(field.value)}
                  onChange={(value) => {
                    field.onChange(toInt(value, 0));
                  }}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('price')}</FormLabel>
              <FormControl>
                <Input {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('space_status')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={SpaceStatus.AVAILABLE}>
                    {t(SpaceStatus.AVAILABLE)}
                  </SelectItem>
                  <SelectItem value={SpaceStatus.UNAVAILABLE}>
                    {t(SpaceStatus.UNAVAILABLE)}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={disabled}>
          {submitBtn}
        </Button>
      </form>
    </Form>
  );
}
