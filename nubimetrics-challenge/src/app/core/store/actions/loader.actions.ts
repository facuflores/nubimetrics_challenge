import { Action } from '@ngrx/store';

/**
 * Listado de acciones
 */
export enum LoaderActionTypes {
  LOADING_START = "[Loading - starting] starting ...",
  LOADING_END = "[Loading - ending] ending ...",
}

/**
 * Acción encargada de comunicar el comienzo 
 * del loader
 */
export class LoaderStartAction implements Action {
  readonly type = LoaderActionTypes.LOADING_START;
}

/**
 * Acción encargada de comunicar la finalización 
 * del loader
 */
export class LoaderEndAction implements Action {
  readonly type = LoaderActionTypes.LOADING_END;
}

export type LoaderAction = LoaderStartAction | LoaderEndAction;