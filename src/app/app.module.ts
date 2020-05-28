import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { LazyElementsModule, LAZY_ELEMENTS_REGISTRY } from '@angular-extensions/elements';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { ChannelsComponent } from './channels/channels.component';
import { PushPipe } from './push.pipe';
import { CustomLazyRegistry } from './custom-lazy-registry';
import { EmptyComponent } from './empty/empty.component';
import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    EquipmentComponent,
    ChannelsComponent,
    PushPipe,
    EmptyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LazyElementsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    PushPipe,
    {
      provide: LAZY_ELEMENTS_REGISTRY,
      useClass: CustomLazyRegistry
    }
  ],
  // Uncomment this line and run ng serve to only run this app locally
  // bootstrap: [AppComponent],
  entryComponents: [AppComponent],
})

export class AppModule {
  constructor(private injector: Injector) {
    const appElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('mfe-poc-homepage', appElement);
  }

  ngDoBootstrap() { }
}
