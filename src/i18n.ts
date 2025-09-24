import i18n, { type LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from './atoms';
import { localeAtom } from './features/locale';
import THEME_EN from './locales/en/theme.json';
import THEME_VI from './locales/vi/theme.json';
import COMMON_EN from './locales/en/common.json';
import COMMON_VI from './locales/vi/common.json';
import AUTH_EN from './locales/en/auth.json';
import AUTH_VI from './locales/vi/auth.json';
import VENUE_EN from './locales/en/venue.json';
import VENUE_VI from './locales/vi/venue.json';
import SPACE_EN from './locales/en/space.json';
import SPACE_VI from './locales/vi/space.json';
import BOOKING_EN from './locales/en/booking.json';
import BOOKING_VI from './locales/vi/booking.json';
import ADDRESS_EN from './locales/en/address.json';
import ADDRESS_VI from './locales/vi/address.json';
import USER_EN from './locales/en/user.json';
import USER_VI from './locales/vi/user.json';

const resources = {
  en: {
    theme: THEME_EN,
    common: COMMON_EN,
    auth: AUTH_EN,
    venue: VENUE_EN,
    space: SPACE_EN,
    booking: BOOKING_EN,
    address: ADDRESS_EN,
    user: USER_EN,
  },
  vi: {
    theme: THEME_VI,
    common: COMMON_VI,
    auth: AUTH_VI,
    venue: VENUE_VI,
    space: SPACE_VI,
    booking: BOOKING_VI,
    address: ADDRESS_VI,
    user: USER_VI,
  },
};

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    const lang = store.get(localeAtom);
    return lang;
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
