import { FilterOrderAction, FilterOrderActionTypes } from '../actions/filter-order.actions';

export interface FilterOrderState {
  query: string;
  clear_filters: boolean;
}

const initialState: FilterOrderState = {
  query: "iphone",
  clear_filters: true
}

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