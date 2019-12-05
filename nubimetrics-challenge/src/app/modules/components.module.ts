import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { NubimetricsDetail, NubimetricsModalDetail, NubimetricsHeader, NubimetricsSearch, NubimetricsFilter, NubimetricsList, NubimetricsLayout } from './components/components.index';

import { ListingTypePipe } from '../core/pipes/listing-type.pipe';
import { ConditionTypePipe } from '../core/pipes/condition-type.pipe';
import { StatusTypePipe } from '../core/pipes/status-type.pipe';

@NgModule({
  declarations: [
    NubimetricsLayout,
    NubimetricsHeader,
    NubimetricsSearch,
    NubimetricsFilter,
    NubimetricsList,
    NubimetricsDetail,
    NubimetricsModalDetail,

    ListingTypePipe,
    ConditionTypePipe,
    StatusTypePipe
  ],
  entryComponents: [NubimetricsModalDetail],
  exports: [NubimetricsLayout],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: []
})
export class ComponentsModule { }
