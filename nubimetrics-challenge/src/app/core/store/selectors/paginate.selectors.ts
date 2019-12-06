import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.models';
import { PagingState } from '../reducers/paginate.reducers';

/**
 * Referencia al almacen de paginación
 * @param state Almacen de aplicación
 */
const paginateState = (state: AppState) => state.paginate;

/**
 * Selector para obtener el estado de cambio de tamaño de pagina
 */
export const selectPageSizePaginate = createSelector(
  paginateState,
  (state: PagingState) => state.page_size
);

/**
 * Selector para obtener el estado completo de paginación
 */
export const selectAllPaginate = createSelector(
  paginateState,
  (state: PagingState) => state
);