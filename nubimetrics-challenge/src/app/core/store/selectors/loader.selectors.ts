import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.models';
import { LoaderState } from '../reducers/loader.reducers';

const loaderState = (state: AppState) => state.loader;

export const selectIsLoading = createSelector(
  loaderState,
  (state: LoaderState) => state.loader
);