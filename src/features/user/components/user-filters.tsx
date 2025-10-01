import { InputDebounce } from '@/components/ui/input-debounce';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { UserSortBy } from '../types/user-sort-by';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { isValidSortBy, isValidSortOrder } from '../utils/type-check';
import { UserSortOrder } from '../types/user-sort-order';
import { useEffect } from 'react';

export function UserFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('user');

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

  const handleChangeSearch = (search: string) => {
    handleChangeBase('search', search);
  };

  const handleChangeSortBy = (sortBy: string) => {
    if (isValidSortBy(sortBy)) {
      handleChangeBase('sortBy', sortBy);
    }
  };

  const handleChangeSortOrder = (sortOrder: string) => {
    if (isValidSortOrder(sortOrder)) {
      handleChangeBase('sortOrder', sortOrder);
    }
  };

  useEffect(() => {
    handleChangeSortBy(searchParams.get('sortBy') || UserSortBy.NAME);
    handleChangeSortOrder(searchParams.get('sortOrder') || UserSortOrder.ASC);
  }, []);

  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
      <div className='space-y-2 lg:col-span-2 xl:col-span-1'>
        <Label className='text-muted-foreground'>{t('search')}</Label>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4' />
          <InputDebounce
            value={searchParams.get('search') || ''}
            onChange={(e) => {
              handleChangeSearch(e.target.value);
            }}
            className='bg-background pl-9'
          />
        </div>
      </div>
      <div className='space-y-2'>
        <Label className='text-muted-foreground'>{t('sortBy')}</Label>
        <Select
          onValueChange={handleChangeSortBy}
          defaultValue={searchParams.get('sortBy') || UserSortBy.NAME}
        >
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(UserSortBy).map((value) => (
              <SelectItem value={value} key={value}>
                {t(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='space-y-2'>
        <Label className='text-muted-foreground'>{t('sortOrder')}</Label>
        <Select
          onValueChange={handleChangeSortOrder}
          defaultValue={searchParams.get('sortOrder') || UserSortOrder.ASC}
        >
          <SelectTrigger className='w-full'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(UserSortOrder).map((value) => (
              <SelectItem value={value} key={value}>
                {t(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
