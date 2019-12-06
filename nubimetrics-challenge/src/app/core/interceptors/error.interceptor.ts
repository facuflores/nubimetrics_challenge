import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Clase interceptora para manejo de errores
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
        return next.handle(request).pipe(catchError(this.handleError));
    }

    /**
     * Metodo que de acuerdo al tipo de error
     * devuelve el mensaje correspondiente
     * @param err http error
     */
    private handleError(err: HttpErrorResponse): any {
      let errMessage = null;
      
      if (err.error instanceof ErrorEvent) {
        errMessage = 'No se ha podido realizar la solicitud !';
      } else if (err.status == 404) {
        errMessage = 'No se ha podido encontrar la publicación !';
      } else if (err.status >= 500) {
        errMessage = 'El servidor no podido procesar la solicitud !';
      } else {
        errMessage = 'Algo ha pasado. Por favor intentelo nuevamente !'
      }
      
      return throwError(new Error(errMessage));
    }

}