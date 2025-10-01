import { BreadcrumbIndies } from '@/components/ui/breadcrumb-indies';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';
import { SpinLoading } from '@/components/spin-loading';
import { AxiosError, User as UserType } from '@/types';
import { NotFound } from '@/components/not-found';
import { GeneralError } from '@/components/general-error';
import { HTTP_STATUS_CODE } from '@/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Empty } from '@/components/empty';
import { useSearchParams } from 'react-router';
import { PaginationIndies } from '@/components/ui/pagination-indies';
import { useMemo } from 'react';
import { searchParamsToGetUsersQuery } from '../utils/search-params-to-get-users-query';
import { useGetUsers } from '../api/use-get-users';
import { UserFilters } from './user-filters';
import { useDateTimeFormatter } from '@/features/booking';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Activity,
  BadgeCheck,
  ScanLine,
  ShieldBan,
  ShieldUser,
  User,
  UserRoundCog,
} from 'lucide-react';
import { UserStatus } from '../types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUpdateUser } from '../api/use-update-user';
import { useUpdateUserStatus } from '../api/use-update-user-status';
import { Role } from '@/types/role';
import { useGetProfile } from '@/features/auth';

export function UsersList() {
  const { t } = useTranslation('user');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(
    () => searchParamsToGetUsersQuery(searchParams),
    [searchParams],
  );
  const { formatDate } = useDateTimeFormatter();
  const { data: manager } = useGetProfile();

  const { data: users, isPending, isError, error } = useGetUsers(query);
  const updateUser = useUpdateUser();
  const updateUserStatus = useUpdateUserStatus();

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  const notHavePermissionUpdateStatus = (user: UserType) =>
    user.role.id === Role.ADMIN ||
    (manager?.role.id === Role.MODERATOR && user.role.id === Role.MODERATOR);

  if (isPending) {
    return (
      <div className='space-y-4'>
        <Skeleton className='w-20 h-5' />
        <SpinLoading />
      </div>
    );
  }

  if (isError) {
    const err = error as AxiosError;

    if (err.response?.data.statusCode === HTTP_STATUS_CODE.NOT_FOUND) {
      return <NotFound />;
    }

    return <GeneralError message={err.response?.data.message} />;
  }

  return (
    <section className='space-y-4'>
      <BreadcrumbIndies
        items={[
          { label: t('home'), link: '/dashboard/admin/stats' },
          { label: t('users'), link: '/dashboard/admin/users' },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            <span>{t('users_filter')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UserFilters />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          {users.data.length === 0 ? (
            <Empty />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-30'>{t('id')}</TableHead>
                  <TableHead className='w-40'>{t('name')}</TableHead>
                  <TableHead>{t('email')}</TableHead>
                  <TableHead className='w-40'>{t('status')}</TableHead>
                  <TableHead className='w-40'>{t('phone_number')}</TableHead>
                  <TableHead className='w-40'>{t('role')}</TableHead>
                  <TableHead className='w-40'>{t('created_at')}</TableHead>
                  <TableHead className='w-40'>{t('verified')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className='font-bold'>#{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.status}
                        onValueChange={(value) => {
                          updateUserStatus.mutate({
                            userId: user.id,
                            status: value as UserStatus,
                          });
                        }}
                        disabled={notHavePermissionUpdateStatus(user)}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={UserStatus.ACTIVE}>
                            <Activity /> {t(UserStatus.ACTIVE)}
                          </SelectItem>
                          <SelectItem value={UserStatus.INACTIVE}>
                            <ShieldBan /> {t(UserStatus.INACTIVE)}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{user.phone_number}</TableCell>
                    <TableCell>
                      <Select
                        value={String(user.role.id)}
                        onValueChange={(value) => {
                          updateUser.mutate({
                            userId: user.id,
                            roleId: Number(value),
                          });
                        }}
                        disabled={
                          user.role.id === Role.ADMIN ||
                          manager?.role.id !== Role.ADMIN
                        }
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='1'>
                            <User /> {t('user')}
                          </SelectItem>
                          <SelectItem value='2'>
                            <UserRoundCog /> {t('moderator')}
                          </SelectItem>
                          <SelectItem value='3'>
                            <ShieldUser /> {t('admin')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      {user.email_verified_at ? (
                        <Badge variant='outline'>
                          <BadgeCheck /> {t('verified')}
                        </Badge>
                      ) : (
                        <Button
                          variant='outline'
                          size='sm'
                          disabled={notHavePermissionUpdateStatus(user)}
                          onClick={() => {
                            updateUserStatus.mutate({
                              userId: user.id,
                              status: UserStatus.VERIFIED,
                            });
                          }}
                        >
                          {t('verify')} <ScanLine />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {users.meta.last_page > 1 && (
        <div className='flex justify-center mt-4 w-full'>
          <PaginationIndies
            handlePageChange={handlePageChange}
            page={users.meta.current_page}
            totalPages={users.meta.last_page}
          />
        </div>
      )}
    </section>
  );
}
