import { Combobox } from '@/components/ui/combobox';
import React, { useMemo } from 'react';
import { useGetProvinces } from '../api/use-get-provinces';
import { useTranslation } from 'react-i18next';

export function ProvinceSelect({
  disabled,
  ...props
}: React.ComponentProps<typeof Combobox>) {
  const { data, isFetching } = useGetProvinces();
  const { i18n, t } = useTranslation('address');

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
      placeholderSearch={t('search_province')}
      placeholderSelect={t('search_by_province')}
      placeholderEmpty={t('no_province')}
    />
  );
}
