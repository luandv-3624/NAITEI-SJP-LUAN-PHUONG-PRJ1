import { BrowserRouter, Route, Routes } from 'react-router';
import {
  Dashboard,
  ForgotPassword,
  GoogleCallback,
  Home,
  NotFoundPage,
  ResetPassword,
  SignIn,
  SignUp,
  SignUpSuccess,
  VerifyAccount,
} from './pages';
import {
  AdminLayout,
  AuthLayout,
  MainLayout,
  OMLayout,
  SignInOutLayout,
} from './layouts';
import { useThemeEffect } from './features/theme';
import {
  VenueDetailPage,
  SpaceDetailPage,
  BookingHistoryPage,
  BookingHistoryDetailPage,
  VenueListPage,
  BookingListPage,
} from './pages';
import './i18n';
import { useGetProfile, useSilentRefresh } from './features/auth';
import {
  CreateSpace,
  CreateVenue,
  ManageVenue,
  MyVenues,
  SpaceDetail,
  SpacesByVenues,
  UpdateSpace,
  UpdateVenue,
} from './pages/om';

function App() {
  useThemeEffect();

  const { isLoading } = useSilentRefresh();
  const { isEnabled, isPending: isProfileLoading } = useGetProfile();

  if (isLoading || (isEnabled && isProfileLoading)) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/venues/:venueId' element={<VenueDetailPage />} />
          <Route path='/spaces/:spaceId' element={<SpaceDetailPage />} />
          <Route path='/bookings' element={<BookingHistoryPage />} />
          <Route
            path='/bookings/:bookingId'
            element={<BookingHistoryDetailPage />}
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route element={<SignInOutLayout />}>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
          <Route path='/sign-up-success' element={<SignUpSuccess />} />
          <Route path='/verify-email' element={<VerifyAccount />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/google/callback' element={<GoogleCallback />} />
        </Route>
        <Route path='/dashboard'>
          <Route path='admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='venues' element={<VenueListPage />} />
          </Route>
          <Route path='om' element={<OMLayout />}>
            <Route path='venues' element={<MyVenues />} />
            <Route path='venues/:venueId' element={<ManageVenue />} />
            <Route path='venues/:venueId/spaces' element={<SpacesByVenues />} />
            <Route
              path='venues/:venueId/spaces/create'
              element={<CreateSpace />}
            />
            <Route
              path='venues/:venueId/spaces/:spaceId/edit'
              element={<UpdateSpace />}
            />
            <Route
              path='venues/:venueId/spaces/:spaceId'
              element={<SpaceDetail />}
            />
            <Route path='venues/:venueId/update' element={<UpdateVenue />} />
            <Route path='create-venue' element={<CreateVenue />} />
            <Route path='bookings' element={<BookingListPage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
