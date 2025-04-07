import i18next from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
// Import your language translation files
import translation from 'zod-i18n-map/locales/pt/zod.json';

import { scan } from 'react-scan';
import resourceManager, { ResourceManager } from './utils/resource-manager';

async function registerResources() {
  const resources = await import.meta.glob('./services/**/*.resource.{ts,tsx}');

  for (const resource of Object.values(resources)) {
    const importer = (<{ default: (manager: ResourceManager) => void }>(
      await resource()
    )).default;

    importer(resourceManager);
  }
}

export async function bootstrap() {
  // lng and resources key depend on your locale.
  i18next.init({
    lng: 'es',
    resources: {
      es: { zod: translation },
    },
  });

  await registerResources();

  if (process.env.NODE_ENV === 'development') {
    scan();
  }

  z.setErrorMap(zodI18nMap);
}
