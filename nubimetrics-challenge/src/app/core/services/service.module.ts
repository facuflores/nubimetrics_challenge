import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptor } from '../interceptors/request.interceptor';
import { ErrorInterceptor } from '../interceptors/error.interceptor';

import { PublicationService } from './api/publication.service';
import { NotificationService } from './utils/notification.service';

@NgModule({
  imports: [],
  providers: [
    NotificationService,
    PublicationService,
    RequestInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    ErrorInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class ServiceModule { }
