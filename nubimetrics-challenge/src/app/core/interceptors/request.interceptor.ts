import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app.models';
import { LoaderStartAction, LoaderEndAction } from '../store/actions/loader.actions';

/**
 * Clase interceptora para las solicitudes
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  /**
   * Encargado de lanzar el loader y 
   * continuar con la peticioón
   * @param request solicitud
   * @param next 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new LoaderStartAction());
    return next.handle(request);
  }

}