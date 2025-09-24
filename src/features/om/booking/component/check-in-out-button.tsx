import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useCheckin, useCheckout } from '@/features/om/booking';
import { useTranslation } from 'react-i18next';

interface CheckInOutButtonProps {
  bookingId: string;
  checkedIn: boolean;
}

export function CheckInOutButton({
  bookingId,
  checkedIn,
}: CheckInOutButtonProps) {
  const { t } = useTranslation('booking');

  const checkInMutation = useCheckin();
  const checkOutMutation = useCheckout();

  const handleClick = () => {
    if (checkedIn) {
      checkOutMutation.mutate(bookingId);
    } else {
      checkInMutation.mutate(bookingId);
    }
  };

  const isLoading = checkInMutation.isPending || checkOutMutation.isPending;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            disabled={isLoading}
            onClick={handleClick}
          >
            {checkedIn ? (
              <LogOut className='w-4 h-4' />
            ) : (
              <LogIn className='w-4 h-4' />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {checkedIn
              ? t('booking_list.check_out')
              : t('booking_list.check_in')}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
