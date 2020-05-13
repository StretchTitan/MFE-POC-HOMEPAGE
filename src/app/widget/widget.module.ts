import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { WidgetComponent } from './widget.component';

@NgModule({
  declarations: [
    WidgetComponent
  ],
  imports: [
    BrowserModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  entryComponents: [WidgetComponent],
})

export class WidgetModule {
  constructor(private injector: Injector) {
    const widgetElement = createCustomElement(WidgetComponent, { injector: this.injector});
    customElements.define('mfe-poc-homepage-widget', widgetElement);
  }

  ngDoBootstrap() {}
}
