import { Star } from 'lucide-react';
import { Review } from '@/types';

export function StarRating({
  review: { rating, comment, username },
}: {
  review: Review;
}) {
  return (
    <div className='border-b border-gray-100 pb-3'>
      <div className='flex items-center gap-2 mb-2'>
        <div className='flex'>
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
          ))}
        </div>
        <span className='text-sm text-gray-600'>{username}</span>
      </div>
      <p className='text-sm text-gray-700'>{comment}</p>
    </div>
  );
}
