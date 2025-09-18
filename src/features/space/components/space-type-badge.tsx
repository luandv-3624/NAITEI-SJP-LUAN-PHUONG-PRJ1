import { HiBuildingOffice } from 'react-icons/hi2';
import { PiDesktopTower } from 'react-icons/pi';
import { MdMeetingRoom } from 'react-icons/md';
import { TbDeviceUnknown } from 'react-icons/tb';
import { Badge } from '@/components/ui/badge';
import { SpaceType } from '../types';
import { IconType } from 'react-icons/lib';

function getSpaceTypeBadge(id: number): {
  Icon: IconType;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
} {
  switch (id) {
    case 1:
      return {
        Icon: HiBuildingOffice,
        variant: 'destructive',
      };
    case 2:
      return {
        Icon: PiDesktopTower,
        variant: 'default',
      };
    case 3:
      return {
        Icon: MdMeetingRoom,
        variant: 'secondary',
      };
    default:
      return {
        Icon: TbDeviceUnknown,
        variant: 'outline',
      };
  }
}

export function SpaceTypeBadge({
  spaceType,
  ...props
}: { spaceType: SpaceType } & Omit<
  React.ComponentProps<typeof Badge>,
  'variant'
>) {
  const { Icon, variant } = getSpaceTypeBadge(spaceType.id);
  return (
    <Badge variant={variant} {...props}>
      <Icon />
      {spaceType.name}
    </Badge>
  );
}
