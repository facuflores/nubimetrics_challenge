import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { PublicationSearchAction,PublicationActionTypes, PublicationSearchedAction } from '../actions/publication.actions';
import { PublicationService } from '../../services/api/publication.service';
import { ResponseApi } from '../../models/response-api.model';
import { PaginateRefreshAction } from '../actions/paginate.actions';


@Injectable()
export class PublicationEffets {

  constructor(
    private actions$: Actions,
    private publicationService: PublicationService
  ) {}

  @Effect()
  publicationSearch$ = this.actions$.pipe(
    ofType<PublicationSearchAction>(PublicationActionTypes.SEARCH_PUBLICATIONS),
    map(action => action.payload),
    mergeMap(({text, offset, limit}) => {
      return this.publicationService.searchPublications(text, offset, limit).pipe(
        switchMap(({paging, results}: ResponseApi) => [
          new PublicationSearchedAction({publications: results}),
          new PaginateRefreshAction({paging})
        ]),
        catchError(() => EMPTY)
      );
    })
  );

}
