import { InputDebounce } from '@/components/ui/input-debounce';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PriceTypeSelect } from '../price-type-select';
import { SpaceTypeSelect } from '../space-type-select';
import { Search } from 'lucide-react';

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

  const handleChangeName = (name: string) => {
    handleChangeBase('name', name);
  };

  const handleChangePriceType = (id: string) => {
    handleChangeBase('priceTypeId', id);
  };

  const handleChangeSpaceType = (id: string) => {
    handleChangeBase('spaceTypeId', id);
  };

  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
      <div className='space-y-2 lg:col-span-2 xl:col-span-1'>
        <Label className='text-muted-foreground'>{t('name')}</Label>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4' />
          <InputDebounce
            value={searchParams.get('name') || ''}
            onChange={(e) => {
              handleChangeName(e.target.value);
            }}
            className='bg-background pl-9'
          />
        </div>
      </div>
      <div className='space-y-2'>
        <Label className='text-muted-foreground'>{t('price_type')}</Label>
        <PriceTypeSelect
          value={searchParams.get('priceTypeId') || ''}
          onChange={handleChangePriceType}
        />
      </div>
      <div className='space-y-2'>
        <Label className='text-muted-foreground'>{t('space_type')}</Label>
        <SpaceTypeSelect
          value={searchParams.get('spaceTypeId') || ''}
          onChange={handleChangeSpaceType}
        />
      </div>
    </section>
  );
}
