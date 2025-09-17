export function AmenityItem({
  icon,
  name,
}: {
  icon: React.ReactNode;
  name: string;
}) {
  return (
    <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors'>
      {icon}
      <span className='font-medium'>{name}</span>
    </div>
  );
}
