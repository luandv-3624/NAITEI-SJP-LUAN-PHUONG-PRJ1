import { Badge } from '@/components/ui/badge';
import { IconType } from 'react-icons/lib';
import { VenueStatus } from '../../types';
import { CircleDot, FileCheck, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function getVenueStatusBadge(status: VenueStatus): {
  Icon: IconType;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
} {
  switch (status) {
    case VenueStatus.APPROVED:
      return {
        Icon: FileCheck,
        variant: 'secondary',
      };
    case VenueStatus.BLOCKED:
      return {
        Icon: ShieldAlert,
        variant: 'destructive',
      };
    case VenueStatus.PENDING:
      return {
        Icon: CircleDot,
        variant: 'default',
      };
  }
}

export function StatusBadge({
  status,
  ...props
}: { status: VenueStatus } & Omit<
  React.ComponentProps<typeof Badge>,
  'variant'
>) {
  const { Icon, variant } = getVenueStatusBadge(status);
  const { t } = useTranslation('venue');
  return (
    <Badge variant={variant} {...props}>
      <Icon />
      {t(status)}
    </Badge>
  );
}
