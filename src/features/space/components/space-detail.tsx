import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Phone,
  Mail,
  Users,
  Clock,
  CheckCircle,
  Star,
  Wifi,
  Coffee,
  Car,
  Monitor,
  Building2,
  Store,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Space, Review } from '@/types';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { CreateBookingForm } from '@/features/booking';
import { SPACE_STATUS, SpaceStatus } from '@/constants';
import { SpaceDetailOverview } from './space-detail-overview';
import {
  StarRating,
  InfoCard,
  ContactItem,
  AmenityItem,
} from '@/features/space';

const mockReviews: Review[] = [
  {
    id: 1,
    rating: 4,
    comment: 'Phòng họp rộng rãi, nhân viên thân thiện.',
    username: 'Nguyen Van A',
  },
  {
    id: 2,
    rating: 5,
    comment: 'Không gian yên tĩnh, rất thích hợp cho làm việc nhóm.',
    username: 'Nguyen Van B',
  },
];

const sections = ['overview', 'amenities', 'booking'];

export function SpaceDetail({ space }: { space: Space }) {
  const { t } = useTranslation('space');

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

  const getStatusBadge = (status: SpaceStatus) => {
    switch (status) {
      case SPACE_STATUS.AVAILABLE:
        return (
          <Badge className='bg-green-100 text-green-800 border-green-200'>
            <CheckCircle className='w-3 h-3 mr-1' />
            {t('status.available')}
          </Badge>
        );
      case SPACE_STATUS.UNAVAILABLE:
        return (
          <Badge className='bg-red-100 text-red-800 border-red-200'>
            {t('status.unavailable')}
          </Badge>
        );
      default:
        return <Badge variant='outline'>{status}</Badge>;
    }
  };

  const getAmenityIcon = (iconName: string) => {
    const icons = {
      Wifi,
      Monitor,
      Building2,
      Coffee,
      Car,
    };
    const IconComponent =
      (icons as Record<string, typeof Monitor>)[iconName] || Monitor;
    return <IconComponent className='w-5 h-5 text-blue-600' />;
  };

  return (
    <div className='min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 md:px-8 mt-6'>
        <div className='relative w-full h-[400px] rounded-2xl overflow-hidden'>
          <Carousel className='w-full h-full'>
            <CarouselContent>
              {space?.images && space?.images.length > 0 ? (
                space?.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={
                        image ||
                        'https://tiktak.com.vn/wp-content/uploads/2025/08/Asset-5.png'
                      }
                      loading='lazy'
                      className='w-full h-[400px] object-cover'
                      alt={`${space.name} - Ảnh ${index + 1}`}
                    />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <img
                    src={
                      'https://workiq.ie/wp-content/uploads/2025/08/coworking-paralax.jpg'
                    }
                    loading='lazy'
                    className='w-full h-[400px] object-cover'
                    alt={`${space.name}`}
                  />
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className='absolute left-4 top-1/2 -translate-y-1/2' />
            <CarouselNext className='absolute right-4 top-1/2 -translate-y-1/2' />
          </Carousel>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <div className='lg:col-span-3'>
          <div className='mb-8'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-3'>
                  <h1 className='text-3xl font-bold'>{space.name}</h1>
                  {getStatusBadge(space.status)}
                </div>

                <div className='flex items-center gap-4 mb-4'>
                  <div className='flex items-center gap-2'>
                    <Users className='w-5 h-5' />
                    <span>{space.capacity} người</span>
                  </div>
                  <Badge variant='outline'>{space.space_type.name}</Badge>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                    <span className='text-sm'>4.8</span>
                  </div>
                </div>

                <div className='flex items-center gap-2 text-gray-600'>
                  <MapPin className='w-4 h-4' />
                  <span>{space.venue.address}</span>
                </div>

                <div className='flex items-center gap-2 mt-2'>
                  <Store className='w-4 h-4' />
                  <span>T2-T6 8:00 - 17:00</span>
                </div>
              </div>

              <div className='bg-blue-50 rounded-xl p-6 min-w-72'>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-blue-600 mb-1'>
                    {parseInt(space.price).toLocaleString()}₫
                  </div>
                  <div className='mb-4'>/{space.price_type.name}</div>
                  <Button className='w-full bg-blue-600 hover:bg-blue-700 mb-3'>
                    {t('booking.reserve_now')}
                  </Button>
                  <Button className='w-full'>
                    {t('booking.check_availability')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={tabRef}
            className='sticky top-16 z-10 bg-background rounded-lg shadow-sm mb-8 border'
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
                  value='amenities'
                  className='flex-1 py-4 text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600 rounded-none'
                >
                  {t('tabs.amenities')}
                </TabsTrigger>
                <TabsTrigger
                  value='booking'
                  className='flex-1 py-4 text-base font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600 rounded-none'
                >
                  {t('tabs.booking')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <SpaceDetailOverview space={space} />

          <Card id='amenities-section' className='mb-8 border-0 shadow-sm'>
            <div className='p-6'>
              <h2 className='text-2xl font-bold mb-6'>
                {t('amenities.title')}
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {space?.amenities?.length ? (
                  space.amenities.map((amenity, idx) => (
                    <AmenityItem
                      key={idx}
                      icon={getAmenityIcon(amenity.code)}
                      name={amenity.name}
                    />
                  ))
                ) : (
                  <div className='col-span-full text-gray-500 text-center py-4'>
                    {t('no_amenities')}
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card id='booking-section' className='mb-8 border-0 shadow-sm'>
            <div className='p-6'>
              <h2 className='text-2xl font-bold mb-6'>
                {t('booking.important_notice')}
              </h2>
              <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6'>
                <div className='flex items-center gap-2 mb-2'>
                  <Clock className='w-5 h-5 text-yellow-600' />
                  <span className='font-semibold text-yellow-800'>
                    {t('booking.important_notice')}
                  </span>
                </div>
                <ul className='text-sm text-yellow-700 space-y-1'>
                  <li>• {t('booking.note_1')}</li>
                  <li>• {t('booking.note_2')}</li>
                  <li>• {t('booking.note_3')}</li>
                </ul>
              </div>

              <CreateBookingForm space={space} />
            </div>
          </Card>
        </div>

        <div className='lg:col-span-1'>
          <div className='sticky top-32 space-y-6'>
            <InfoCard
              title={space.venue.name}
              footer={
                <Button asChild variant='outline' className='w-full'>
                  <Link to={'/venues/' + space.venue.id}>
                    {t('venue.related_rooms')}
                  </Link>
                </Button>
              }
            >
              <div className='flex items-start gap-2 mb-4'>
                <MapPin className='w-4 h-4 text-gray-500 mt-0.5' />
                <span className='text-sm text-gray-600'>
                  {space.venue.address}
                </span>
              </div>
            </InfoCard>

            <InfoCard
              title={t('contact.title')}
              footer={
                <Button variant='outline' className='w-full'>
                  {t('contact.send_message')}
                </Button>
              }
            >
              <div className='space-y-3'>
                <ContactItem icon={Phone} text='1900-xxxx' />
                <ContactItem icon={Mail} text={t('contact.email')} />
                <ContactItem icon={Clock} text={t('contact.response_time')} />
              </div>
            </InfoCard>

            <InfoCard
              title={t('reviews.title')}
              footer={
                <Button variant='outline' className='w-full'>
                  {t('reviews.see_all')}
                </Button>
              }
            >
              <div className='space-y-4'>
                {mockReviews.map((review) => (
                  <StarRating key={review.id} review={review} />
                ))}
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}
