import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './modules/components/app/app.component';
import { NubimetricsHeader, NubimetricsSearch, NubimetricsFilter, NubimetricsList, NubimetricsLayout } from './modules/components/components.index';

@NgModule({
  declarations: [
    AppComponent,
    NubimetricsLayout,
    NubimetricsHeader,
    NubimetricsSearch,
    NubimetricsFilter,
    NubimetricsList
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
