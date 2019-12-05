import { LoaderAction, LoaderActionTypes } from '../actions/loader.actions';

export interface LoaderState {
  loader: boolean;
}

const initialState: LoaderState = {
  loader: false
}

export function LoaderReducer(state: LoaderState = initialState, action: LoaderAction) {
  switch (action.type) {
    case LoaderActionTypes.LOADING_START:
      return {
        loader: true
      };
    case LoaderActionTypes.LOADING_END:
      return {
        loader: false
      };
    default: return state;
  }
}