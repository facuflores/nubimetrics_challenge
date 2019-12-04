import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.models';
import { FilterOrderState } from '../reducers/filter-order.reducer';

const filterOrderState = (state: AppState) => state.filter_order;

export const selectSearchText = createSelector(
  filterOrderState,
  (state: FilterOrderState) => state.query
);