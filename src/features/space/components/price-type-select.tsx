import { Combobox } from '@/components/ui/combobox';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetPriceTypes } from '../api/use-get-price-types';

export function PriceTypeSelect({
  disabled,
  ...props
}: React.ComponentProps<typeof Combobox>) {
  const { data, isFetching } = useGetPriceTypes();
  const { i18n, t } = useTranslation('space');

  const provinces = useMemo(
    () =>
      data !== undefined
        ? data.map(({ id, name, name_en }) => ({
            value: String(id),
            label: i18n.language === 'vi' ? name : name_en,
          }))
        : [],
    [data, i18n.language],
  );

  return (
    <Combobox
      {...props}
      data={provinces}
      disabled={isFetching || disabled}
      placeholderSearch={t('search_price_type')}
      placeholderSelect={t('search_by_price_type')}
      placeholderEmpty={t('no_price_type')}
    />
  );
}
