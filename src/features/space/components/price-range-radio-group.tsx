import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PriceRange } from '../types/price-range';
import { priceRangeLabel } from '../utils/price-range-label';
import { useTranslation } from 'react-i18next';

export function PriceRangeRadioGroup({
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
        <RadioGroupItem value='all' id='price-range-all' />
        <Label htmlFor='price-range-all'>{t('all')}</Label>
      </div>
      {Object.values(PriceRange)
        .filter((v) => typeof v !== 'string')
        .map((v) => (
          <div className='flex items-center gap-3' key={v}>
            <RadioGroupItem value={`${v}`} id={`price-range-${v}`} />
            <Label htmlFor={`price-range-${v}`}>
              {t(priceRangeLabel[v].label)}
            </Label>
          </div>
        ))}
    </RadioGroup>
  );
}
