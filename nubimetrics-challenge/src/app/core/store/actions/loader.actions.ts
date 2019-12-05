import { Action } from '@ngrx/store';

export enum LoaderActionTypes {
  LOADING_START = "[Loading - starting] starting ...",
  LOADING_END = "[Loading - ending] ending ...",
}

export class LoaderStartAction implements Action {
  readonly type = LoaderActionTypes.LOADING_START;
}

export class LoaderEndAction implements Action {
  readonly type = LoaderActionTypes.LOADING_END;
}

export type LoaderAction = LoaderStartAction | LoaderEndAction;