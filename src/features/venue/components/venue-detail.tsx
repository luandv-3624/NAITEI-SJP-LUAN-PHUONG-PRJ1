import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Users, Clock, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Venue } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useTranslation } from 'react-i18next';

const sections = ['overview', 'spaces', 'location'];

export function VenueDetail({ venue }: { venue: Venue }) {
  const { t } = useTranslation('venue');

  const province = venue.ward?.province?.name || '';
  const ward = venue.ward?.name || '';
  const [activeTab, setActiveTab] = useState('overview');
  const tabRef = useRef<HTMLDivElement | null>(null);

  const handleTabChange = (value: string) => {
    const el = document.getElementById(`${value}-section`);
    if (el && tabRef.current) {
      const tabHeight = tabRef.current.offsetHeight;
      const y =
        el.getBoundingClientRect().top + window.scrollY - tabHeight - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActiveTab(value);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = activeTab;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSection = entry.target.id.replace('-section', '');
            break;
          }
        }
        if (visibleSection !== activeTab) {
          setActiveTab(visibleSection);
        }
      },
      {
        rootMargin: '-120px 0px -60% 0px',
        threshold: 0,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(`${id}-section`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className='bg-green-100 text-green-800 border-green-200'>
            <CheckCircle className='w-3 h-3 mr-1' />
            {t('status.approved')}
          </Badge>
        );
      case 'available':
        return (
          <Badge className='bg-blue-100 text-blue-800 border-blue-200'>
            {t('status.available')}
          </Badge>
        );
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  return (
    <div className='min-h-screen'>
      <div>
        <div className='max-w-7xl mx-auto px-4 md:px-8 mt-6'>
          <div className='relative w-full h-[400px] rounded-2xl overflow-hidden'>
            <img
              src={
                venue.avatar
                  ? venue.avatar
                  : 'https://files.smartos.space/1732715599385-pexels-pixabay-33109.jpg'
              }
              loading='lazy'
              className='w-full h-full object-cover'
              alt={venue.name}
            />
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <div className='lg:col-span-3'>
          <div
            ref={tabRef}
            className='sticky top-18 z-10 rounded-lg shadow-sm mb-8 border bg-background'
          >
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className='w-full bg-transparent border-0 p-0 h-auto'>
                <TabsTrigger
                  value='overview'
                  className='flex-1 py-4 text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600 rounded-none'
                >
                  {t('tabs.overview')}
                </TabsTrigger>
                <TabsTrigger
                  value='location'
                  className='flex-1 py-4 text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600 rounded-none'
                >
                  {t('tabs.location')}
                </TabsTrigger>
                <TabsTrigger
                  value='spaces'
                  className='flex-1 py-4 text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600 rounded-none'
                >
                  {t('tabs.spaces', { count: venue.spaces.length })}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card id='overview-section' className='mb-8 border-0 shadow-sm'>
            <div className='p-6'>
              <h2 className='text-2xl font-bold mb-4'>
                {t('overview.title', { name: venue.name })}
              </h2>
              <p className='text-gray-700 leading-relaxed mb-6'>
                {venue.description}
              </p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg'>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>
                    {venue.spaces.length}
                  </div>
                  <div className='text-sm'>{t('overview.totalSpaces')}</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>
                    {venue.spaces.reduce(
                      (total, space) => total + space.capacity,
                      0,
                    )}
                  </div>
                  <div className='text-sm'>{t('overview.totalCapacity')}</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>24/7</div>
                  <div className='text-sm'>{t('overview.support')}</div>
                </div>
              </div>
            </div>
          </Card>

          <Card id='location-section' className='mb-8 border-0 shadow-sm'>
            <div className='p-6'>
              <h2 className='text-2xl font-bold mb-6'>{t('location.title')}</h2>
              <div className='mb-4'>
                <div className='flex items-start gap-3'>
                  <MapPin className='w-5 h-5 text-blue-600 mt-0.5' />
                  <div>
                    <div className='font-medium'>{venue.address}</div>
                    <div className='text-gray-600 text-sm'>
                      {ward}, {province}
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-100 rounded-lg h-64 flex items-center justify-center'>
                <div className='text-center'>
                  <MapPin className='w-12 h-12 text-gray-400 mx-auto mb-2' />
                  <p className='text-gray-500'>
                    {t('location.map.interactive')}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${venue.lat},${venue.lng}`}
                    target='_blank'
                    rel='noopener'
                    className='text-blue-600 hover:underline'
                  >
                    {t('location.map.openGoogle')}
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card id='spaces-section' className='mb-8 border-0 shadow-sm'>
            <div className='p-6 relative'>
              <h2 className='text-2xl font-bold mb-6'>{t('spaces.title')}</h2>

              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                  slidesToScroll: 1,
                }}
                className='w-full'
              >
                <CarouselContent className='w-full pl-2'>
                  {venue.spaces.map((space) => (
                    <CarouselItem key={space.id} className='basis-full'>
                      <div className='border rounded-xl p-6 hover:shadow-md transition-all duration-200 h-full flex flex-col'>
                        {/* Header */}
                        <div className='flex justify-between items-start mb-4'>
                          <div>
                            <h3 className='text-xl font-semibold mb-2'>
                              {space.name}
                            </h3>
                            <div className='flex items-center gap-4 mb-3'>
                              <div className='flex items-center gap-2'>
                                <Users className='w-4 h-4' />
                                <span>
                                  {t('spaces.capacity', {
                                    count: space.capacity,
                                  })}
                                </span>
                              </div>
                              <Badge variant='outline'>
                                {space.type?.name}
                              </Badge>
                              {getStatusBadge(space.status)}
                            </div>
                            <p className='text-gray-700 mb-4'>
                              {space.description}
                            </p>
                          </div>
                          <div className='text-right'>
                            <div className='text-2xl font-bold text-blue-600'>
                              {parseInt(space.price).toLocaleString()}₫
                            </div>
                            <div className='text-gray-500'>
                              /{space.price_type?.name}
                            </div>
                          </div>
                        </div>

                        <div className='mb-6'>
                          <h3 className='text-lg font-semibold mb-4'>
                            {t('spaces.amenities')}
                          </h3>
                          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            {space.amenities.map((amenity, idx) => (
                              <div
                                key={idx}
                                className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'
                              >
                                <span className='text-sm font-medium'>
                                  {amenity.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className='flex justify-end items-center mt-auto'>
                          <Button className='bg-blue-600 hover:bg-blue-700'>
                            {t('spaces.button.bookNow')}
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className='absolute left-2 top-1/2 -translate-y-1/2 shadow-md rounded-full' />
                <CarouselNext className='absolute right-2 top-1/2 -translate-y-1/2 shadow-md rounded-full' />
              </Carousel>
            </div>
          </Card>
        </div>

        <div className='lg:col-span-1'>
          <div className='sticky top-18'>
            <Card className='mb-6 border-0 shadow-sm'>
              <div className='p-6'>
                <h3 className='text-lg font-semibold mb-4'>
                  {t('contact.title')}
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Phone className='w-4 h-4' />
                    <span className='text-sm'>{t('contact.phone')}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Mail className='w-4 h-4' />
                    <span className='text-sm'>{t('contact.mail')}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Clock className='w-4 h-4' />
                    <span className='text-sm'>{t('contact.responseTime')}</span>
                  </div>
                </div>
                <Button variant='outline' className='w-full mt-4'>
                  {t('contact.sendMessage')}
                </Button>
              </div>
            </Card>

            <Card className='border-0 shadow-sm'>
              <div className='p-6'>
                <h3 className='text-lg font-semibold mb-4'>
                  {t('quickStats.title')}
                </h3>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>
                      {t('quickStats.status')}
                    </span>
                    <span className='font-medium'>{t('status.approved')}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>
                      {t('quickStats.area')}
                    </span>
                    <span className='font-medium'>{ward}</span>
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
