import { Badge } from '@/components/ui/badge';
import { IconType } from 'react-icons/lib';
import { BadgeCheck, BadgeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SpaceStatus } from '../types/space-status';

function getSpaceStatusBadge(status: SpaceStatus): {
  Icon: IconType;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
} {
  switch (status) {
    case SpaceStatus.AVAILABLE:
      return {
        Icon: BadgeCheck,
        variant: 'secondary',
      };
    case SpaceStatus.UNAVAILABLE:
      return {
        Icon: BadgeX,
        variant: 'destructive',
      };
  }
}

export function SpaceStatusBadge({
  status,
  ...props
}: { status: SpaceStatus } & Omit<
  React.ComponentProps<typeof Badge>,
  'variant'
>) {
  const { Icon, variant } = getSpaceStatusBadge(status);
  const { t } = useTranslation('space');
  return (
    <Badge variant={variant} {...props}>
      <Icon />
      {t(status)}
    </Badge>
  );
}
