import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.models';
import { FilterOrderState } from '../reducers/filter-order.reducer';

/**
 * Referencia al almacen de filtrado y ordenación
 * @param state Almacen de aplicación
 */
const filterOrderState = (state: AppState) => state.filter_order;

/**
 * Selector para obtener el estado de texto a filtrar
 */
export const selectSearchText = createSelector(
  filterOrderState,
  (state: FilterOrderState) => state.query
);

/**
 * Selector para obtener el estado de refresco a 
 * ordenar o filtrar
 */
export const selectClearFilterAndOrder = createSelector(
  filterOrderState,
  (state: FilterOrderState) => state.clear_filters
);