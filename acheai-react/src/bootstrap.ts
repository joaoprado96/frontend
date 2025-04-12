import { scan } from 'react-scan';
import i18next from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
// Import your language translation files
import translation from 'zod-i18n-map/locales/pt/zod.json';


export async function bootstrap() {
  // lng and resources key depend on your locale.
  i18next.init({
    lng: 'pt',
    resources: {
      pt: { zod: translation },
    },
  });

  if (process.env.NODE_ENV === 'development') {
    scan();
  }

  z.setErrorMap(zodI18nMap);
}
