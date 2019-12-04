import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.models';
import { PagingState } from '../reducers/paginate.reducers';

const paginateState = (state: AppState) => state.paginate;

export const selectPageSizePaginate = createSelector(
  paginateState,
  (state: PagingState) => state.page_size
);

export const selectAllPaginate = createSelector(
  paginateState,
  (state: PagingState) => state
);