import { Action } from '@ngrx/store';

import { Publication } from '../../models/publication.model';

/**
 * Listado de acciones
 */
export enum FilterOrderActionTypes {
  SEARCH_TEXT = "[Text - new text] text ...",
  FILTER_ORDER_CLEAR = "[Filter|Order - clear] clearing ...",
  FILTER_CONDITION = "[Filter - condition] filtering ...",
  FILTER_RANGE_PRICE = "[Filter - range price] filtering ...",
  ORDER_BY_PRICE = "[Order - price] ordering ...",
  ORDER_BY_SOLD_QUANTITY = "[Order - sold_quantity] ordering ..."
}

/**
 * Acción encargada de comunicar cuando reestablecer los
 * filtros y ordenaciones ante una nueva consulta
 */
export class ClearFilterAndOrderAction implements Action {
  readonly type = FilterOrderActionTypes.FILTER_ORDER_CLEAR;
}

/**
 * Acción encarga de comunicar la busqueda de nuevas 
 * publicaciones
 */
export class SearchTextAction implements Action {
  readonly type = FilterOrderActionTypes.SEARCH_TEXT;
  
  /**
   * @param payload contenido
   * @param query consulta
   */
  constructor(public payload: {query: string}) {};
}

/**
 * Acción encargada de comunicar la filtración 
 * de publicaciones en base a su condición
 */
export class ConditionFilterAction implements Action {
  readonly type = FilterOrderActionTypes.FILTER_CONDITION;

  /**
   * @param payload contenido
   * @param condition condición
   * @param publications publicaciones
   */
  constructor(public payload: {condition: string, publications: Publication[]}) {}
}

/**
 * Acción encargada de comunicar la filtración
 * de publicaciones en base a su minimo y máximo
 */
export class PriceRangeFilterAction implements Action {
  readonly type = FilterOrderActionTypes.FILTER_RANGE_PRICE;

  /**
   * @param payload contenido
   * @param min minimo
   * @param max máximo
   * @param publications publicaciones
   */
  constructor(public payload: {min: number, max: number, publications: Publication[]}) {}
}

/**
 * Acción encargada de comunicar la ordenación
 * de publicaciones en base a su precio
 */
export class PriceOrderAction implements Action {
  readonly type = FilterOrderActionTypes.ORDER_BY_PRICE;

  /**
   * @param payload contenido
   * @param order asc|desc
   * @param publications publicaciones
   */
  constructor(public payload: {order: string, publications: Publication[]}) {}
}

/**
 * Acción encargada de comunicar la ordenación
 * de publicaciones en base a la cantidad vendida
 */
export class SoldQuantityOrderAction implements Action {
  readonly type = FilterOrderActionTypes.ORDER_BY_SOLD_QUANTITY;
  constructor(public payload: {order: string, publications: Publication[]}) {}
}

export type FilterOrderAction = SearchTextAction | ClearFilterAndOrderAction;