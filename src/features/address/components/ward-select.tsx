import { Combobox } from '@/components/ui/combobox';
import React, { useMemo } from 'react';
import { useGetWards } from '../api/use-get-wards';
import { useTranslation } from 'react-i18next';

export function WardSelect({
  provinceId,
  disabled,
  ...props
}: React.ComponentProps<typeof Combobox> & { provinceId: number }) {
  const { data, isFetching } = useGetWards(provinceId);
  const { i18n, t } = useTranslation('address');
  const wards = useMemo(
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
      data={wards}
      disabled={isFetching || provinceId === 0 || disabled}
      placeholderEmpty={t('no_ward')}
      placeholderSelect={t('search_by_ward')}
      placeholderSearch={t('search_ward')}
    />
  );
}
