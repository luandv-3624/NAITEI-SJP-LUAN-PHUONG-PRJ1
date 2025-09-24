import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { MoreVertical } from 'lucide-react';
import { BOOKING_STATUS, BookingStatus } from '@/constants';
import { useUpdateStatus } from '@/features/om/booking';
import { useTranslation } from 'react-i18next';

interface UpdateStatusButtonProps {
  bookingId: string;
}

export function UpdateStatusButton({ bookingId }: UpdateStatusButtonProps) {
  const { t } = useTranslation('booking');
  const updateStatusMutation = useUpdateStatus();

  const handleUpdate = (status: BookingStatus) => {
    updateStatusMutation.mutate({ bookingId, status });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                size='sm'
                disabled={updateStatusMutation.isPending}
              >
                <MoreVertical className='w-4 h-4' />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('update_booking_status')}</p>
          </TooltipContent>

          <DropdownMenuContent>
            {Object.entries(BOOKING_STATUS).map(([key, value]) => (
              <DropdownMenuItem key={key} onClick={() => handleUpdate(value)}>
                {t(`booking_status.${value}`)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
}
