import { Combobox } from '@/components/ui/combobox';
import React, { useMemo } from 'react';
import { useGetSpaceTypes } from '../api/use-get-space-types';
import { useTranslation } from 'react-i18next';

export function SpaceTypeSelect({
  disabled,
  ...props
}: React.ComponentProps<typeof Combobox>) {
  const { data, isFetching } = useGetSpaceTypes();
  const { t } = useTranslation('space');

  const provinces = useMemo(
    () =>
      data !== undefined
        ? data.map(({ id, name }) => ({
            value: String(id),
            label: name,
          }))
        : [],
    [data],
  );

  return (
    <Combobox
      {...props}
      data={provinces}
      disabled={isFetching || disabled}
      placeholderSearch={t('search_space_type')}
      placeholderSelect={t('search_by_space_type')}
      placeholderEmpty={t('there_is_no_space_type')}
    />
  );
}
