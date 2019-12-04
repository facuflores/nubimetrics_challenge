import { FilterOrderAction, FilterOrderActionTypes } from '../actions/filter-order.actions';

export interface FilterOrderState {
  query: string;
}

const initialState: FilterOrderState = {
  query: "iphone"
}

export function FilterOrderReducer(state: FilterOrderState = initialState, action: FilterOrderAction) {
  switch (action.type) {
    case FilterOrderActionTypes.SEARCH_TEXT:
      return {
        ... state,
        query: action.payload.query
      };
    default: return state;
  }
}