import { Badge } from '@/components/ui/badge';
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  CircleCheckBig,
} from 'lucide-react';
import { BookingStatus, BOOKING_STATUS } from '@/constants';
import { useTranslation } from 'react-i18next';
import { ComponentType, SVGProps } from 'react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const { t } = useTranslation('booking');

  const statusConfig: Record<BookingStatus, { color: string; icon: IconType }> =
    {
      [BOOKING_STATUS.PENDING]: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: AlertCircle,
      },
      [BOOKING_STATUS.CONFIRMED_UNPAID]: {
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: Clock,
      },
      [BOOKING_STATUS.PAID_PENDING]: {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Clock,
      },
      [BOOKING_STATUS.PARTIAL_PENDING]: {
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: Clock,
      },
      [BOOKING_STATUS.ACCEPTED]: {
        color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        icon: CircleCheckBig,
      },
      [BOOKING_STATUS.DONE]: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
      },
      [BOOKING_STATUS.REJECTED]: {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: XCircle,
      },
      [BOOKING_STATUS.CANCELLED]: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
      },
    };

  const config = statusConfig[status] || statusConfig[BOOKING_STATUS.PENDING];
  const Icon = config.icon;

  return (
    <Badge className={config.color}>
      <Icon className='w-3 h-3 mr-1' />
      {t(`booking_status.${status}`)}
    </Badge>
  );
}
