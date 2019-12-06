import { LoaderAction, LoaderActionTypes } from '../actions/loader.actions';

/**
 * Modelo de almacen para loader
 */
export interface LoaderState {
  loader: boolean;
}

const initialState: LoaderState = {
  loader: false
}

/**
 * Escucha las transiciones de estado
 * para el almacen de loader
 * @param state Almacen
 * @param action Acciones
 */
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