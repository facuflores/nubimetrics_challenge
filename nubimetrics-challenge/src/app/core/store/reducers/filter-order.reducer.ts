import { FilterOrderAction, FilterOrderActionTypes } from '../actions/filter-order.actions';

/**
 * Modelo de almacen para filtrado y ordenación
 */
export interface FilterOrderState {
  query: string;
  clear_filters: boolean;
}

const initialState: FilterOrderState = {
  query: "iphone",
  clear_filters: true
}

/**
 * Escucha las transiciones de estado
 * para el almacen de filtrado y ordenación
 * @param state Almacen
 * @param action Acciones
 */
export function FilterOrderReducer(state: FilterOrderState = initialState, action: FilterOrderAction) {
  switch (action.type) {
    case FilterOrderActionTypes.SEARCH_TEXT:
      return {
        ... state,
        query: action.payload.query
      };
    case FilterOrderActionTypes.FILTER_ORDER_CLEAR:
      return {
        ... state,
        clear_filters: !state.clear_filters
      };
    default: return state;
  }
}