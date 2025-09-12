import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { BookingPaymentStatus, BOOKING_PAYMENT_STATUS } from '@/constants';
import { useTranslation } from 'react-i18next';
import { ComponentType, SVGProps } from 'react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export function PaymentStatusBadge({
  status,
}: {
  status: BookingPaymentStatus;
}) {
  const { t } = useTranslation('booking');

  const statusConfig: Record<
    BookingPaymentStatus,
    { color: string; icon: IconType }
  > = {
    [BOOKING_PAYMENT_STATUS.UNPAID]: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: XCircle,
    },
    [BOOKING_PAYMENT_STATUS.PARTIAL]: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: AlertCircle,
    },
    [BOOKING_PAYMENT_STATUS.PAID]: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle,
    },
  };

  const config =
    statusConfig[status] || statusConfig[BOOKING_PAYMENT_STATUS.UNPAID];
  const Icon = config.icon;

  return (
    <Badge className={config.color}>
      <Icon className='w-3 h-3 mr-1' />
      {t(`payment_status.${status}`)}
    </Badge>
  );
}
