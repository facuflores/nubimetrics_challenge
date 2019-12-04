import { Action } from '@ngrx/store';

export enum FilterOrderActionTypes {
  SEARCH_TEXT = "[Text - new text] text ..."
}

export class SearchTextAction implements Action {
  readonly type = FilterOrderActionTypes.SEARCH_TEXT;
  constructor(public payload: {query: string}) {};
}

export type FilterOrderAction = SearchTextAction;