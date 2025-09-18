import { DatePicker } from '@/components/ui/date-picker';
import { InputDebounce } from '@/components/ui/input-debounce';
import { Label } from '@/components/ui/label';
import { ProvinceSelect, WardSelect } from '@/features/address';
import { PriceRangeRadioGroup } from './price-range-radio-group';
import { CapacityRangeRadioGroup } from './capacity-range-radio-group';
import { useSearchParams } from 'react-router';
import { toInt } from '@/lib/to-int';
import { SpaceList } from './space-list';
import { PriceTypeSelect } from './price-type-select';
import { SpaceTypeSelect } from './space-type-select';
import { useTranslation } from 'react-i18next';

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('space');

  const handleChangeBase = (
    key: string,
    value: string,
    condition: (value: string) => boolean = (v) => !!v,
    additionalAction?: (prev: URLSearchParams) => void,
  ) => {
    setSearchParams((prev) => {
      if (condition(value)) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      prev.set('page', '1');
      if (additionalAction) {
        additionalAction(prev);
      }
      return prev;
    });
  };

  const handleChangeProvince = (id: string) => {
    handleChangeBase(
      'provinceId',
      id,
      (v) => !!v,
      (prev) => {
        prev.delete('wardId');
      },
    );
  };

  const handleChangeWard = (id: string) => {
    handleChangeBase('wardId', id);
  };

  const handleChangeFrom = (date: Date | undefined) => {
    handleChangeBase('from', date ? date.toISOString() : '');
  };

  const handleChangeName = (name: string) => {
    handleChangeBase('name', name);
  };

  const handleChangePriceType = (id: string) => {
    handleChangeBase('priceTypeId', id);
  };

  const handleChangePriceRange = (priceRange: string) => {
    handleChangeBase('priceRange', priceRange, (v) => !!v && v !== 'all');
  };

  const handleChangeCapacityRange = (capacityRange: string) => {
    handleChangeBase('capacityRange', capacityRange, (v) => !!v && v !== 'all');
  };

  const handleChangeSpaceType = (id: string) => {
    handleChangeBase('spaceTypeId', id);
  };

  return (
    <section className='space-y-8'>
      <section className='grid grid-cols-4 gap-8'>
        <div className='space-y-2'>
          <Label>{t('province')}</Label>
          <ProvinceSelect
            value={searchParams.get('provinceId') || ''}
            onChange={handleChangeProvince}
          />
        </div>
        <div className='space-y-2'>
          <Label>{t('ward')}</Label>
          <WardSelect
            provinceId={toInt(searchParams.get('provinceId'), 0)}
            value={searchParams.get('wardId') || ''}
            onChange={handleChangeWard}
          />
        </div>
        <div className='space-y-2'>
          <Label>{t('from')}</Label>
          <DatePicker
            placeholder={t('from')}
            date={
              searchParams.get('from')
                ? new Date(searchParams.get('from')!)
                : undefined
            }
            setDate={handleChangeFrom}
          />
        </div>
        <div className='space-y-2'>
          <Label>{t('name')}</Label>
          <InputDebounce
            value={searchParams.get('name') || ''}
            onChange={(e) => {
              handleChangeName(e.target.value);
            }}
          />
        </div>
      </section>
      <div className='flex gap-8'>
        <section className='space-y-8 min-w-50'>
          <div className='space-y-2'>
            <Label>{t('price_type')}</Label>
            <PriceTypeSelect
              value={searchParams.get('priceTypeId') || ''}
              onChange={handleChangePriceType}
            />
          </div>
          <div className='space-y-2'>
            <Label>{t('space_type')}</Label>
            <SpaceTypeSelect
              value={searchParams.get('spaceTypeId') || ''}
              onChange={handleChangeSpaceType}
            />
          </div>
          <div className='space-y-2'>
            <Label>{t('price_range')}</Label>
            <PriceRangeRadioGroup
              value={searchParams.get('priceRange') || 'all'}
              onChange={handleChangePriceRange}
            />
          </div>
          <div className='space-y-2'>
            <Label>{t('capacity_range')}</Label>
            <CapacityRangeRadioGroup
              value={searchParams.get('capacityRange') || 'all'}
              onChange={handleChangeCapacityRange}
            />
          </div>
        </section>
        <section className='grow'>
          <SpaceList />
        </section>
      </div>
    </section>
  );
}
