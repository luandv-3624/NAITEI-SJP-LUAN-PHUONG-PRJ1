import { Card } from '@/components/ui/card';

export function InfoCard({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Card className='border-0 shadow-sm'>
      <div className='p-6'>
        <h3 className='text-lg font-semibold mb-4'>{title}</h3>
        {children}
        {footer && <div className='mt-4'>{footer}</div>}
      </div>
    </Card>
  );
}
