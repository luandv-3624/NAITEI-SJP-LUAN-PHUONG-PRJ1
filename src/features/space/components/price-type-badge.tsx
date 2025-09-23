import { TbDeviceUnknown } from 'react-icons/tb';
import { Badge } from '@/components/ui/badge';
import { PriceType } from '../types';
import { IconType } from 'react-icons/lib';
import { TbClockHour4 } from 'react-icons/tb';
import { FaCalendarDay } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

function getPriceTypeBadge(id: number): {
  Icon: IconType;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
} {
  switch (id) {
    case 1:
      return {
        Icon: MdCalendarMonth,
        variant: 'outline',
      };
    case 2:
      return {
        Icon: FaCalendarDay,
        variant: 'default',
      };
    case 3:
      return {
        Icon: TbClockHour4,
        variant: 'secondary',
      };
    default:
      return {
        Icon: TbDeviceUnknown,
        variant: 'destructive',
      };
  }
}

export function PriceTypeBadge({
  priceType,
  ...props
}: { priceType: PriceType } & Omit<
  React.ComponentProps<typeof Badge>,
  'variant'
>) {
  const { Icon, variant } = getPriceTypeBadge(priceType.id);
  const { i18n } = useTranslation();

  return (
    <Badge variant={variant} {...props}>
      <Icon />
      {i18n.language === 'vi' ? priceType.name : priceType.name_en}
    </Badge>
  );
}
