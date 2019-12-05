import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';

import { PublicationSearchAction,PublicationActionTypes, PublicationSearchedAction, PublicationSearchAllAction, PublicationFilteredAction, PublicationFindByIdAction, PublicationByIdSearchedAction } from '../actions/publication.actions';
import { PaginateRefreshAction } from '../actions/paginate.actions';
import { ConditionFilterAction, FilterOrderActionTypes, PriceOrderAction, SoldQuantityOrderAction, PriceRangeFilterAction, ClearFilterAndOrderAction } from '../actions/filter-order.actions';
import { NotifyErrorAction, NotificationActionTypes } from '../actions/notification.actions';

import { PublicationService } from '../../services/api/publication.service';
import { NotificationService } from '../../services/utils/notification.service';

import { ResponseApi } from '../../models/response-api.model';
import { Publication } from '../../models/publication.model';


@Injectable()
export class PublicationEffets {

  constructor(
    private actions$: Actions,
    private notifyService: NotificationService,
    private publicationService: PublicationService
  ) {}


  @Effect()
  publicationSearch$ = this.actions$.pipe(
    ofType<PublicationSearchAction>(PublicationActionTypes.SEARCH_PUBLICATIONS),
    map(action => action.payload),
    mergeMap(({text, offset, limit}) => {
      return this.publicationService.searchPublications(text, offset, limit).pipe(
        switchMap(({results}: ResponseApi) => [
          new PublicationSearchedAction({publications: results}),
          new PaginateRefreshAction()
        ]),
        catchError((err: Error) => {
          return of(new NotifyErrorAction({message: err.message}));
        })
      );
    })
  );

  @Effect()
  publicationSearchAll$ = this.actions$.pipe(
    ofType<PublicationSearchAllAction>(PublicationActionTypes.SEARCH_ALL_PUBLICATIONS),
    map(action => action.payload),
    mergeMap(({text, offset, limit}) => {
      return this.publicationService.searchAllPublications(text, offset, limit).pipe(
        switchMap((results: Publication[]) => [
          new PublicationSearchedAction({publications: results}),
          new PaginateRefreshAction(),
          new ClearFilterAndOrderAction()
        ]),
        catchError((err: Error) => {
          return of(new NotifyErrorAction({message: err.message}));
        })
      );
    })
  );

  @Effect()
  publicationFindById$ = this.actions$.pipe(
    ofType<PublicationFindByIdAction>(PublicationActionTypes.FIND_BY_ID_PUBLICATION),
    map(action => action.payload),
    mergeMap(({id}) => {
      return this.publicationService.findByIdPublication(id).pipe(
        switchMap((publication: Publication) => [
          new PublicationByIdSearchedAction({publication})
        ]),
        catchError((err: Error) => {
          return of(new NotifyErrorAction({message: err.message}));
        })
      );
    })
  );

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

  @Effect({dispatch: false})
  publicationErrors$ = this.actions$.pipe(
    ofType<NotifyErrorAction>(NotificationActionTypes.NOTIFY_ERROR),
    map(action => action.payload),
    tap(({message}) => {
      this.notifyService.danger(message);
    })
  );

}
