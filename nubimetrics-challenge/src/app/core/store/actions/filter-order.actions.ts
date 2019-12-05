import { Action } from '@ngrx/store';

import { Publication } from '../../models/publication.model';

export enum FilterOrderActionTypes {
  SEARCH_TEXT = "[Text - new text] text ...",
  FILTER_ORDER_CLEAR = "[Filter|Order - clear] clearing ...",
  FILTER_CONDITION = "[Filter - condition] filtering ...",
  FILTER_RANGE_PRICE = "[Filter - range price] filtering ...",
  ORDER_BY_PRICE = "[Order - price] ordering ...",
  ORDER_BY_SOLD_QUANTITY = "[Order - sold_quantity] ordering ..."
}

export class ClearFilterAndOrderAction implements Action {
  readonly type = FilterOrderActionTypes.FILTER_ORDER_CLEAR;
}

export class SearchTextAction implements Action {
  readonly type = FilterOrderActionTypes.SEARCH_TEXT;
  constructor(public payload: {query: string}) {};
}

export class ConditionFilterAction implements Action {
  readonly type = FilterOrderActionTypes.FILTER_CONDITION;
  constructor(public payload: {condition: string, publications: Publication[]}) {}
}

export class PriceRangeFilterAction implements Action {
  readonly type = FilterOrderActionTypes.FILTER_RANGE_PRICE;
  constructor(public payload: {min: number, max: number, publications: Publication[]}) {}
}

export class PriceOrderAction implements Action {
  readonly type = FilterOrderActionTypes.ORDER_BY_PRICE;
  constructor(public payload: {order: string, publications: Publication[]}) {}
}

export class SoldQuantityOrderAction implements Action {
  readonly type = FilterOrderActionTypes.ORDER_BY_SOLD_QUANTITY;
  constructor(public payload: {order: string, publications: Publication[]}) {}
}

export type FilterOrderAction = SearchTextAction | ClearFilterAndOrderAction;