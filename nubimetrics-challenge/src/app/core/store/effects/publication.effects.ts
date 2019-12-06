import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';

import { PublicationSearchAction,PublicationActionTypes, PublicationSearchedAction, PublicationSearchAllAction, PublicationFilteredAction, PublicationFindByIdAction, PublicationByIdSearchedAction } from '../actions/publication.actions';
import { PaginateRefreshAction } from '../actions/paginate.actions';
import { ConditionFilterAction, FilterOrderActionTypes, PriceOrderAction, SoldQuantityOrderAction, PriceRangeFilterAction, ClearFilterAndOrderAction } from '../actions/filter-order.actions';
import { NotifyErrorAction, NotificationActionTypes } from '../actions/notification.actions';
import { LoaderEndAction } from '../actions/loader.actions';

import { PublicationService } from '../../services/api/publication.service';
import { NotificationService } from '../../services/utils/notification.service';

import { ResponseApi } from '../../models/response-api.model';
import { Publication } from '../../models/publication.model';
import { AppState } from '../models/app.models';


/**
 * Clase de efectos - Publicación
 */
@Injectable()
export class PublicationEffets {

  constructor(
    private actions$: Actions,
    private notifyService: NotificationService,
    private publicationService: PublicationService,
    private store: Store<AppState>
  ) {}


  /**
   * Encargado de comunicar al servicio la realización de
   * la busqueda de publicaciones y refrescar los datos del almacen
   */
  @Effect()
  publicationSearch$ = this.actions$.pipe(
    ofType<PublicationSearchAction>(PublicationActionTypes.SEARCH_PUBLICATIONS),
    map(action => action.payload),
    mergeMap(({text, offset, limit}) => {
      return this.publicationService.searchPublications(text, offset, limit).pipe(
        switchMap(({results}: ResponseApi) => [
          new PublicationSearchedAction({publications: results}),
          new PaginateRefreshAction(),
          new LoaderEndAction()
        ]),
        catchError((err: Error) => {
          this.store.dispatch(new LoaderEndAction());
          return of(new NotifyErrorAction({message: err.message}));
        })
      );
    })
  );

  /**
   * Encargado de comunicar al servicio la realización de
   * la busqueda de publicaciones por su texto y refrescar los datos del almacen
   */
  @Effect()
  publicationSearchAll$ = this.actions$.pipe(
    ofType<PublicationSearchAllAction>(PublicationActionTypes.SEARCH_ALL_PUBLICATIONS),
    map(action => action.payload),
    mergeMap(({text, offset, limit}) => {
      return this.publicationService.searchAllPublications(text, offset, limit).pipe(
        switchMap((results: Publication[]) => [
          new PublicationSearchedAction({publications: results}),
          new PaginateRefreshAction(),
          new ClearFilterAndOrderAction(),
          new LoaderEndAction()
        ]),
        catchError((err: Error) => {
          this.store.dispatch(new LoaderEndAction());
          return of(new NotifyErrorAction({message: err.message}));
        })
      );
    })
  );

  /**
   * Encargado de comunicar al servicio la realización de la
   * busqueda de una publicación por su id y refrescar el almacen
   */
  @Effect()
  publicationFindById$ = this.actions$.pipe(
    ofType<PublicationFindByIdAction>(PublicationActionTypes.FIND_BY_ID_PUBLICATION),
    map(action => action.payload),
    mergeMap(({id}) => {
      return this.publicationService.findByIdPublication(id).pipe(
        switchMap((publication: Publication) => [
          new PublicationByIdSearchedAction({publication}),
          new LoaderEndAction()
        ]),
        catchError((err: Error) => {
          this.store.dispatch(new LoaderEndAction());
          return of(new NotifyErrorAction({message: err.message}));
        })
      );
    })
  );

  /**
   * Encargado de comunicar al servicio la realización del
   * filtrado de publicaciones por su condición y refrescar los datos del almacen
   */
  @Effect()
  publicationConditionFilter$ = this.actions$.pipe(
    ofType<ConditionFilterAction>(FilterOrderActionTypes.FILTER_CONDITION),
    map(action => action.payload),
    mergeMap(({condition, publications}) => {
      return this.publicationService.filterPublicationsByCondition(condition, publications).pipe(
        switchMap((publications: Publication[]) => [
          new PublicationFilteredAction({publications})
        ]),
        catchError(() => EMPTY)
      );
    })
  );

  /**
   * Encargado de comunicar al servicio la realización del
   * filtrado de publicaciones entre un minimo,máximo y refrescar los datos del almacen
   */
  @Effect()
  publicationPriceRangeFilter$ = this.actions$.pipe(
    ofType<PriceRangeFilterAction>(FilterOrderActionTypes.FILTER_RANGE_PRICE),
    map(action => action.payload),
    mergeMap(({min, max, publications}) => {
      return this.publicationService.filterPublicationsByRangePrice(min, max, publications).pipe(
        switchMap((publications: Publication[]) => [
          new PublicationFilteredAction({publications})
        ]),
        catchError(() => EMPTY)
      );
    })
  );

  /**
   * Encargado de comunicar al servicio la realización de
   * la ordenación de publicaciones por su precio y refrescar los datos del almacen
   */
  @Effect()
  publicationPriceOrder$ = this.actions$.pipe(
    ofType<PriceOrderAction>(FilterOrderActionTypes.ORDER_BY_PRICE),
    map(action => action.payload),
    mergeMap(({order, publications}) => {
      return this.publicationService.orderPublicationByPrice(order, publications).pipe(
        switchMap((publications: Publication[]) => [
          new PublicationFilteredAction({publications})
        ]),
        catchError(() => EMPTY)
      );
    })
  );

  /**
   * Encargado de comunicar al servicio la realización de
   * la ordenación de publicaciones por cantidad vendidas y refrescar los datos del almacen
   */
  @Effect()
  publicationSoldQuantityOrder$ = this.actions$.pipe(
    ofType<SoldQuantityOrderAction>(FilterOrderActionTypes.ORDER_BY_SOLD_QUANTITY),
    map(action => action.payload),
    mergeMap(({order, publications}) => {
      return this.publicationService.orderPublicationBySoldQuantity(order, publications).pipe(
        switchMap((publications: Publication[]) => [
          new PublicationFilteredAction({publications})
        ]),
        catchError(() => EMPTY)
      );
    })
  );

  /**
   * Encargado de comunicar al servicio de notificaciones 
   * el error correspondiente
   */
  @Effect({dispatch: false})
  publicationErrors$ = this.actions$.pipe(
    ofType<NotifyErrorAction>(NotificationActionTypes.NOTIFY_ERROR),
    map(action => action.payload),
    tap(({message}) => {
      this.notifyService.danger(message);
    })
  );

}
