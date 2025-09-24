import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileView } from './profile-view';
import { ProfileEdit } from './profile-edit';
import { useUpdateProfile } from '@/features/profile';
import { useTranslation } from 'react-i18next';
import { UpdateProfileRequest, User } from '../types/user';

interface ProfileManagementProps {
  profile: User;
}

export function ProfileManagement({ profile }: ProfileManagementProps) {
  const { t } = useTranslation('profile');
  const [isEditing, setIsEditing] = useState(false);

  const updateProfileMutation = useUpdateProfile();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (data: UpdateProfileRequest) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <div className='min-h-screen p-4 md:p-6'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>{t('title')}</h1>

        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? t('edit_profile') : t('profile_information')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <ProfileEdit
                profile={profile}
                onSave={handleSave}
                onCancel={handleCancel}
                isLoading={updateProfileMutation.isPending}
              />
            ) : (
              <ProfileView profile={profile} onEdit={handleEdit} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
