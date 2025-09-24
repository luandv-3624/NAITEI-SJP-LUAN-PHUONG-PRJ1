import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { z } from 'zod';
import { formSchema } from '@/features/booking';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Space } from '@/types/space';
import { useTranslation } from 'react-i18next';
import { calculateTotalPrice } from '@/lib';
import { useCreateBooking } from '@/features/booking';

type BookingFormValues = z.infer<typeof formSchema>;

type Props = {
  space: Space;
};

export function CreateBookingForm({ space }: Props) {
  const { t } = useTranslation('space');

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: '',
      endTime: '',
    },
  });

  const startTime = form.watch('startTime');
  const endTime = form.watch('endTime');

  const totalPrice = useMemo(
    () =>
      calculateTotalPrice(
        startTime,
        endTime,
        parseInt(space.price),
        space.price_type.code,
      ),
    [startTime, endTime],
  );

  const createBooking = useCreateBooking();

  function onSubmit(values: BookingFormValues) {
    const payload: { space_id: number; start_time: string; end_time: string } =
      {
        space_id: space.id,
        start_time: values.startTime,
        end_time: values.endTime,
      };

    createBooking.mutate(payload);
  }

  const isLoading = createBooking.isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid grid-cols-1 lg:grid-cols-2 gap-8'
      >
        <div className='grid grid-cols-1 gap-20'>
          <FormField
            control={form.control}
            name='startTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='block text-lg font-semibold'>
                  {t('booking.start_time')}
                </FormLabel>
                <FormControl>
                  <Input
                    type='datetime-local'
                    className='w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    min={new Date().toISOString().slice(0, 16)}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='endTime'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='block text-lg font-semibold'>
                  {t('booking.end_time')}
                </FormLabel>
                <FormControl>
                  <Input
                    type='datetime-local'
                    className='w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    min={new Date().toISOString().slice(0, 16)}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4'>{t('booking.summary')}</h3>
          <div className='rounded-lg p-4 space-y-3'>
            <div className='flex justify-between'>
              <span>{t('booking.space')}:</span>
              <span className='font-medium'>{space.name}</span>
            </div>
            <div className='flex justify-between'>
              <span>{t('booking.capacity')}:</span>
              <span className='font-medium'>{space.capacity} người</span>
            </div>
            <div className='flex justify-between'>
              <span>{t('booking.price')}:</span>
              <span className='font-medium'>
                {parseInt(space.price.toString()).toLocaleString()}₫/
                {space.price_type.name}
              </span>
            </div>
            <hr className='border-gray-200' />
            <div className='flex justify-between text-lg font-semibold'>
              <span>{t('booking.total')}:</span>
              <span className='text-blue-600'>
                {totalPrice.toLocaleString()}₫
              </span>
            </div>
            {isLoading ? (
              <Button className='w-full mt-4' disabled>
                {t('booking.booking_in_progress')}
              </Button>
            ) : (
              <Button type='submit' className='w-full mt-4'>
                {t('booking.confirm_booking')}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
