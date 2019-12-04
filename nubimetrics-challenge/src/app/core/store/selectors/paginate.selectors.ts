import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.models';
import { PagingState } from '../reducers/paginate.reducers';

const paginateState = (state: AppState) => state.paginate;

export const selectAllPaginate = createSelector(
  paginateState,
  (state: PagingState) => state
);