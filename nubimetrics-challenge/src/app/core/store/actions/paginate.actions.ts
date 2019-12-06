import { Action } from '@ngrx/store';

/**
 * Listado de acciones
 */
export enum PaginateActionTypes {
  REFRESH_PAGINATE = "[Paginate - refresh] refresh ...",
  PAGE_SIZE_CHANGE_PAGINATE = "[PageSize - change] change ..."
}

/**
 * Acción encargada de comunicar el refresco de la 
 * paginación son nuevos datos
 */
export class PaginateRefreshAction implements Action {
  readonly type = PaginateActionTypes.REFRESH_PAGINATE;
}

/**
 * Acción encargada de comunicar el cambio 
 * de numero de publicaciones por pagina
 */
export class PageSizeChangeAction implements Action {
  readonly type = PaginateActionTypes.PAGE_SIZE_CHANGE_PAGINATE;

  /**
   * @param payload contenido
   * @param page_size num pagina
   */
  constructor(public payload: {page_size: number}) {}
}

export type PaginateAction = PaginateRefreshAction | PageSizeChangeAction;