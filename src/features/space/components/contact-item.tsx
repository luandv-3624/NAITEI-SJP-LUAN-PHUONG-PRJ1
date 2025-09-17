export function ContactItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className='flex items-center gap-3 text-gray-600'>
      <Icon className='w-4 h-4' />
      <span className='text-sm'>{text}</span>
    </div>
  );
}
