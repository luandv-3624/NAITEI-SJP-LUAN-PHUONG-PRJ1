import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function VenueDetailSkeleton() {
  return (
    <div className='bg-gray-50 min-h-screen animate-pulse'>
      <div>
        <div className='max-w-7xl mx-auto px-4 md:px-8 mt-6'>
          <div className='relative w-full h-[400px] rounded-2xl overflow-hidden'>
            <div className='w-full h-[400px] bg-gray-200 animate-pulse'></div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <div className='lg:col-span-3'>
          <div className='sticky top-2 z-10 bg-white rounded-lg shadow-sm mb-8 border'>
            <div className='w-full bg-transparent border-0 p-0 h-auto'>
              <div className='flex'>
                <div className='flex-1 py-4 px-6'>
                  <div className='h-5 bg-gray-200 rounded w-20 mx-auto'></div>
                </div>
                <div className='flex-1 py-4 px-6'>
                  <div className='h-5 bg-gray-200 rounded w-12 mx-auto'></div>
                </div>
                <div className='flex-1 py-4 px-6'>
                  <div className='h-5 bg-gray-200 rounded w-24 mx-auto'></div>
                </div>
              </div>
            </div>
          </div>

          <Card className='mb-8 border-0 shadow-sm'>
            <div className='p-6'>
              <div className='h-8 bg-gray-200 rounded w-48 mb-4'></div>
              <div className='space-y-3 mb-6'>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-4 bg-gray-200 rounded w-5/6'></div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg'>
                <div className='text-center space-y-2'>
                  <div className='h-8 bg-gray-200 rounded w-8 mx-auto'></div>
                  <div className='h-4 bg-gray-200 rounded w-16 mx-auto'></div>
                </div>
                <div className='text-center space-y-2'>
                  <div className='h-8 bg-gray-200 rounded w-8 mx-auto'></div>
                  <div className='h-4 bg-gray-200 rounded w-20 mx-auto'></div>
                </div>
                <div className='text-center space-y-2'>
                  <div className='h-8 bg-gray-200 rounded w-8 mx-auto'></div>
                  <div className='h-4 bg-gray-200 rounded w-12 mx-auto'></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className='mb-8 border-0 shadow-sm'>
            <div className='p-6'>
              <div className='h-8 bg-gray-200 rounded w-24 mb-6'></div>
              <div className='mb-4'>
                <div className='flex items-start gap-3'>
                  <MapPin className='w-5 h-5 text-gray-300 mt-0.5' />
                  <div className='space-y-2 flex-1'>
                    <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-200 rounded-lg h-64 flex items-center justify-center'>
                <div className='text-center'>
                  <MapPin className='w-12 h-12 text-gray-300 mx-auto mb-2' />
                  <div className='h-4 bg-gray-300 rounded w-24 mx-auto mb-2'></div>
                  <div className='h-4 bg-gray-300 rounded w-20 mx-auto'></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className='mb-8 border-0 shadow-sm'>
            <div className='p-6'>
              <div className='h-8 bg-gray-200 rounded w-40 mb-6'></div>
              <div className='grid grid-cols-1 gap-6'>
                <div className='border rounded-xl p-6 bg-white'>
                  <div className='flex justify-between items-start mb-4'>
                    <div className='flex-1'>
                      <div className='h-6 bg-gray-200 rounded w-32 mb-2'></div>
                      <div className='flex items-center gap-4 mb-3'>
                        <div className='flex items-center gap-2'>
                          <div className='w-4 h-4 bg-gray-200 rounded'></div>
                          <div className='h-4 bg-gray-200 rounded w-16'></div>
                        </div>
                        <div className='h-6 bg-gray-200 rounded-full w-20'></div>
                        <div className='h-6 bg-gray-200 rounded-full w-16'></div>
                      </div>
                      <div className='space-y-2 mb-4'>
                        <div className='h-4 bg-gray-200 rounded w-full'></div>
                        <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                      </div>
                    </div>
                    <div className='text-right ml-4'>
                      <div className='h-8 bg-gray-200 rounded w-20 mb-1'></div>
                      <div className='h-4 bg-gray-200 rounded w-12'></div>
                    </div>
                  </div>
                  <div className='mb-6'>
                    <div className='h-5 bg-gray-200 rounded w-16 mb-4'></div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      {[1, 2, 3, 4].map((amenity) => (
                        <div
                          key={amenity}
                          className='flex items-center gap-3 p-3 bg-gray-100 rounded-lg'
                        >
                          <div className='w-5 h-5 bg-gray-200 rounded'></div>
                          <div className='h-4 bg-gray-200 rounded w-16'></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='flex justify-end items-center'>
                    <div className='h-10 bg-gray-200 rounded w-20'></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className='lg:col-span-1'>
          <div className='sticky top-2 space-y-6'>
            {/* Contact Card Skeleton */}
            <Card className='border-0 shadow-sm'>
              <div className='p-6'>
                <div className='h-5 bg-gray-200 rounded w-16 mb-4'></div>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Phone className='w-4 h-4 text-gray-200' />
                    <div className='h-4 bg-gray-200 rounded w-24'></div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Mail className='w-4 h-4 text-gray-200' />
                    <div className='h-4 bg-gray-200 rounded w-24'></div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Clock className='w-4 h-4 text-gray-200' />
                    <div className='h-4 bg-gray-200 rounded w-28'></div>
                  </div>
                </div>
                <div className='h-10 bg-gray-200 rounded w-full mt-4'></div>
              </div>
            </Card>

            <Card className='border-0 shadow-sm'>
              <div className='p-6'>
                <div className='h-5 bg-gray-200 rounded w-28 mb-4'></div>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <div className='h-4 bg-gray-200 rounded w-16'></div>
                    <div className='h-4 bg-gray-200 rounded w-20'></div>
                  </div>
                  <div className='flex justify-between'>
                    <div className='h-4 bg-gray-200 rounded w-12'></div>
                    <div className='h-4 bg-gray-200 rounded w-16'></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
