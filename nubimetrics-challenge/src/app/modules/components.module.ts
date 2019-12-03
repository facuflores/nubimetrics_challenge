import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NubimetricsHeader, NubimetricsSearch, NubimetricsFilter, NubimetricsList, NubimetricsLayout } from './components/components.index';

import { ListingTypePipe } from '../core/pipes/listing-type.pipe';
import { ConditionTypePipe } from '../core/pipes/condition-type.pipe';

@NgModule({
  declarations: [
    NubimetricsLayout,
    NubimetricsHeader,
    NubimetricsSearch,
    NubimetricsFilter,
    NubimetricsList,

    ListingTypePipe,
    ConditionTypePipe
  ],
  exports: [NubimetricsLayout],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: []
})
export class ComponentsModule { }
