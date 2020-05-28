import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HomepageWidgetModule } from './homepage-widget.module';

platformBrowserDynamic()
  .bootstrapModule(HomepageWidgetModule)
  .catch((err) => console.error(err));
