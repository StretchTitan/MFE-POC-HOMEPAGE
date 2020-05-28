import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { HomepageWidgetComponent } from './homepage-widget.component';

@NgModule({
  declarations: [
    HomepageWidgetComponent,
  ],
  imports: [
    BrowserModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [HomepageWidgetComponent],
})

export class HomepageWidgetModule {
  constructor(private injector: Injector) {
    const widgetElement = createCustomElement(HomepageWidgetComponent, { injector: this.injector});
    customElements.define('mfe-homepage-widget', widgetElement);
  }

  ngDoBootstrap() {}
}
