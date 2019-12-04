import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { PublicationReducer } from './core/store/reducers/publication.reducers';
import { PaginateReducer } from './core/store/reducers/paginate.reducers';

import { EffectsModule } from '@ngrx/effects';
import { PublicationEffets } from './core/store/effects/publication.effects';

import { AppComponent } from './modules/components/app/app.component';
import { ComponentsModule } from './modules/components.module';
import { ServiceModule } from './core/services/service.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      paginate: PaginateReducer,
      publication: PublicationReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([PublicationEffets]),
    ServiceModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
