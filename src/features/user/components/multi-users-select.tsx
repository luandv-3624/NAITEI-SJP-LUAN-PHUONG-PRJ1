import { MultiSelect } from '@/components/ui/multi-select';
import { useGetUsersSimpleList } from '../api';
import { useMemo } from 'react';

export function MultiUsersSelect({
  excludeUserIds,
  onChange,
  value,
  disabled,
}: {
  excludeUserIds?: number[];
  onChange: (userIds: string[]) => void;
  value?: string[];
  disabled?: boolean;
}) {
  const { data, isPending, isError } = useGetUsersSimpleList();

  const users = useMemo(() => {
    if (!data) return [];

    let users = data;

    if (excludeUserIds && excludeUserIds.length > 0) {
      users = users.filter((user) => !excludeUserIds.includes(user.id));
    }

    return users.map((user) => ({
      label: user.name,
      value: String(user.id),
    }));
  }, [data, excludeUserIds]);

  return (
    <MultiSelect
      options={users}
      onValueChange={onChange}
      defaultValue={value}
      disabled={isPending || isError || disabled}
    />
  );
}
