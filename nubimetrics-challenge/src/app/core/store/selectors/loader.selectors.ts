import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.models';
import { LoaderState } from '../reducers/loader.reducers';

/**
 * Referencia al almacen de loader
 * @param state Almacen de aplicación
 */
const loaderState = (state: AppState) => state.loader;

/**
 * Selector para obtener el estado de inicio|fin del loader
 */
export const selectIsLoading = createSelector(
  loaderState,
  (state: LoaderState) => state.loader
);