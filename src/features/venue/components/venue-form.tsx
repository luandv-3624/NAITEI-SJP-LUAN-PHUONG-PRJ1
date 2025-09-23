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
import { formSchema } from '../schemas/venue-schema';
import { Textarea } from '@/components/ui/textarea';
import { ProvinceSelect, WardSelect } from '@/features/address';
import { toInt } from '@/lib/to-int';
import { ReactNode, useState } from 'react';
import { Label } from '@/components/ui/label';

type VenueFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialValues?: Partial<z.infer<typeof formSchema>> & { province_id: number };
  submitBtn: ReactNode;
  disabled?: boolean;
};

export function VenueForm({
  onSubmit,
  initialValues,
  submitBtn,
  disabled,
}: VenueFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      ward_id: 0,
      address: '',
      lat: '',
      lng: '',
      ...initialValues,
    },
  });

  const [provinceId, setProvinceId] = useState<string>(
    initialValues?.province_id ? String(initialValues.province_id) : '',
  );

  const { t } = useTranslation('venue');

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
        <div className='grid gap-2'>
          <Label htmlFor='provinceId'>{t('province')}</Label>
          <ProvinceSelect
            id='provinceId'
            value={provinceId}
            onChange={(value) => {
              form.setValue('ward_id', 0);
              setProvinceId(value);
            }}
            disabled={disabled}
          />
        </div>
        <FormField
          control={form.control}
          name='ward_id'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('ward')}</FormLabel>
              <FormControl>
                <WardSelect
                  provinceId={toInt(provinceId, 0)}
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
          name='address'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('address')}</FormLabel>
              <FormControl>
                <Input {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lat'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('lat')}</FormLabel>
              <FormControl>
                <Input {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lng'
          render={({ field }) => (
            <FormItem className='grid gap-2'>
              <FormLabel>{t('lng')}</FormLabel>
              <FormControl>
                <Input {...field} disabled={disabled} />
              </FormControl>
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
