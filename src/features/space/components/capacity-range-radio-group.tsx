import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CapacityRange } from '../types/capacity-range';
import { capacityRangeLabel } from '../utils/capacity-range-label';
import { useTranslation } from 'react-i18next';

export function CapacityRangeRadioGroup({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useTranslation('space');

  return (
    <RadioGroup
      className='flex flex-col'
      onValueChange={onChange}
      value={value}
    >
      <div className='flex items-center gap-3'>
        <RadioGroupItem value='all' id='capacity-range-all' />
        <Label htmlFor='capacity-range-all'>{t('all')}</Label>
      </div>
      {Object.values(CapacityRange)
        .filter((v) => typeof v !== 'string')
        .map((v) => (
          <div className='flex items-center gap-3' key={v}>
            <RadioGroupItem value={`${v}`} id={`capacity-range-${v}`} />
            <Label htmlFor={`capacity-range-${v}`}>
              {t(capacityRangeLabel[v].label)}
            </Label>
          </div>
        ))}
    </RadioGroup>
  );
}
