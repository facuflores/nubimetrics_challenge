import { Action } from '@ngrx/store';
import { Publication } from '../../models/publication.model';

/**
 * Listado de acciones
 */
export enum PublicationActionTypes {
  FIND_BY_ID_PUBLICATION = "[Publication - by id searching] searching ...",
  SEARCHED_BY_ID_PUBLICATION = "[Publication - by id searched] searched ...",
  SEARCH_ALL_PUBLICATIONS = "[All Publication - searching all] searching ...",
  SEARCH_PUBLICATIONS = "[Publication - searching] searching ...",
  SEARCHED_PUBLICATIONS = "[Publication - end search] searched ...",
  FILTERED_PUBLICATIONS = "[Publication - filtered] filtered ..."
}

/**
 * Acción encargada de comunicar la busqueda de una 
 * publicación por su id
 */
export class PublicationFindByIdAction implements Action {
  readonly type = PublicationActionTypes.FIND_BY_ID_PUBLICATION;

  /**
   * @param payload contenido
   * @param id id de publicación
   */
  constructor(public payload: {id: string}) {}
}

/**
 * Acción encargada de comunicar la finalización de busqueda
 * de una publicación por su id
 */
export class PublicationByIdSearchedAction implements Action {
  readonly type = PublicationActionTypes.SEARCHED_BY_ID_PUBLICATION;

  /**
   * @param payload contenido
   * @param publication publicación
   */
  constructor(public payload: {publication: Publication}) {}
}

/**
 * Acción encargada de comunicar la busqueda de publicaciones 
 * por texto
 */
export class PublicationSearchAllAction implements Action {
  readonly type = PublicationActionTypes.SEARCH_ALL_PUBLICATIONS;

  /**
   * @param payload contenido
   * @param text texto
   * @param offset desde para paginación
   * @param limit hasta para paginación
   */
  constructor(public payload: {text: string, offset: number, limit: number}) {}
}

/**
 * Acción encargada de comunicar la busqueda de publicaciones
 */
export class PublicationSearchAction implements Action {
  readonly type = PublicationActionTypes.SEARCH_PUBLICATIONS;

  /**
   * @param payload contenido
   * @param text texto
   * @param offset desde para paginación
   * @param limit hasta para paginación
   */
  constructor(public payload: {text: string, offset: number, limit: number}) {};
}

/**
 * Acción encargada de comunicar la finalización de la busqueda
 * de publicaciones
 */
export class PublicationSearchedAction implements Action {
  readonly type = PublicationActionTypes.SEARCHED_PUBLICATIONS;
  constructor(public payload: {publications: Publication[]}) {};
}

/**
 * Acción encargada de comunicar la finalización
 * de filtrado u ordenación sobre las publicaciones
 */
export class PublicationFilteredAction implements Action {
  readonly type = PublicationActionTypes.FILTERED_PUBLICATIONS;

  /**
   * @param payload contenido
   * @param publications publicaciones
   */
  constructor(public payload: {publications: Publication[]}) {}
}

export type PublicationAction = PublicationSearchedAction | PublicationFilteredAction | PublicationByIdSearchedAction;