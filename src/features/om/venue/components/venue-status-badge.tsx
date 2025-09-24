import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { VenueStatus, VENUE_STATUS } from '@/constants';

interface VenueStatusBadgeProps {
  status: VenueStatus;
}

export function VenueStatusBadge({ status }: VenueStatusBadgeProps) {
  const { t } = useTranslation('venue');

  const getStatusVariant = (status: string) => {
    switch (status) {
      case VENUE_STATUS.APPROVED:
        return 'default';
      case VENUE_STATUS.PENDING:
        return 'secondary';
      case VENUE_STATUS.BLOCKED:
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return <Badge variant={getStatusVariant(status)}>{t(`${status}`)}</Badge>;
}
