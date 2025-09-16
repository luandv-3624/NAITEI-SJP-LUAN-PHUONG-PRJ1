import { BrowserRouter, Route, Routes } from 'react-router';
import { Home, SignIn, SignUp, SignUpSuccess, VerifyAccount } from './pages';
import { AuthLayout, MainLayout, SignInOutLayout } from './layouts';
import { useThemeEffect } from './features/theme';
import { VenueDetailPage } from './pages';
import './i18n';
import { useGetProfile, useSilentRefresh } from './features/auth';

function App() {
  useThemeEffect();

  const { isLoading } = useSilentRefresh();
  const { isEnabled, isLoading: isProfileLoading } = useGetProfile();

  if (isLoading || (isEnabled && isProfileLoading)) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/venues/:venueId' element={<VenueDetailPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route element={<SignInOutLayout />}>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
          <Route path='/sign-up-success' element={<SignUpSuccess />} />
          <Route path='/verify-email' element={<VerifyAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
