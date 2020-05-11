import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { BananaComponent } from './banana/banana.component';
import { WidgetModule } from './widget/widget.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    BananaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WidgetModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  // Uncomment this line and run ng serve to only run this app locally
  // bootstrap: [AppComponent],
  entryComponents: [AppComponent],
})

export class AppModule {
  constructor(private injector: Injector) {
    const appElement = createCustomElement(AppComponent, { injector: this.injector});
    customElements.define('mfe-poc-homepage', appElement);
  }

  ngDoBootstrap() { }
}
