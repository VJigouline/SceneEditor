
import { enableProdMode } from '@angular/core';
import { ColorManagement } from 'three';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Keep the colour pipeline used before three.js r152, so that scenes look as they did in version 1.0.
ColorManagement.enabled = false;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
