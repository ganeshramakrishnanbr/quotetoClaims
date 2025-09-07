import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, isDevMode } from '@angular/core';

import { AppModule } from './app/app.module';

// Disable production mode for debugging
console.log('Development mode is:', isDevMode() ? 'enabled' : 'disabled');

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => console.log('Application bootstrap successful'))
  .catch(err => console.error('Application bootstrap failed:', err));
