import { Card } from '@/components/ui/card';
import { Space } from '@/types';
import { useTranslation } from 'react-i18next';

function DetailRow({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className='flex justify-between py-2 border-b border-gray-100'>
      <span className='text-gray-600'>{title}</span>
      <span className='font-medium'>{value}</span>
    </div>
  );
}

function SummaryBox({ value, title }: { value: string; title: string }) {
  return (
    <div className='text-center'>
      <div className='text-2xl font-bold text-blue-600'>{value}</div>
      <div className='text-sm text-gray-600'>{title}</div>
    </div>
  );
}

export function SpaceDetailOverview({ space }: { space: Space }) {
  const { t } = useTranslation('space');

  return (
    <Card id='overview-section' className='mb-8 border-0 shadow-sm'>
      <div className='p-6'>
        <h2 className='text-2xl font-bold mb-4 text-gray-900'>
          Về {space.name}
        </h2>
        <p className='text-gray-700 leading-relaxed mb-6'>
          {space.description}
        </p>

        <div className='mb-6'>
          <h3 className='text-lg font-semibold mb-4'>
            {t('overview.details')}
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <DetailRow
              title={t('overview.type')}
              value={space.space_type.name}
            />
            <DetailRow
              title={t('overview.capacity')}
              value={`${space.capacity} người`}
            />
            <DetailRow
              title={t('overview.price')}
              value={`${parseInt(space.price).toLocaleString()}₫/${space.price_type.name}`}
            />
            <DetailRow
              title={t('overview.status')}
              value={
                <span className='text-green-600'>{t('status.available')}</span>
              }
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg'>
          <SummaryBox value='4.8' title={t('reviews.title')} />
          <SummaryBox value='156' title={t('reviews.see_all')} />
          <SummaryBox value='24/7' title={t('contact.title')} />
        </div>
      </div>
    </Card>
  );
}
