import { Action } from '@ngrx/store';
import { Publication } from '../../models/publication.model';

export enum PublicationActionTypes {
  FIND_BY_ID_PUBLICATION = "[Publication - by id searching] searching ...",
  SEARCHED_BY_ID_PUBLICATION = "[Publication - by id searched] searched ...",
  SEARCH_ALL_PUBLICATIONS = "[All Publication - searching all] searching ...",
  SEARCH_PUBLICATIONS = "[Publication - searching] searching ...",
  SEARCHED_PUBLICATIONS = "[Publication - end search] searched ...",
  FILTERED_PUBLICATIONS = "[Publication - filtered] filtered ..."
}

export class PublicationFindByIdAction implements Action {
  readonly type = PublicationActionTypes.FIND_BY_ID_PUBLICATION;
  constructor(public payload: {id: string}) {}
}

export class PublicationByIdSearchedAction implements Action {
  readonly type = PublicationActionTypes.SEARCHED_BY_ID_PUBLICATION;
  constructor(public payload: {publication: Publication}) {}
}

export class PublicationSearchAllAction implements Action {
  readonly type = PublicationActionTypes.SEARCH_ALL_PUBLICATIONS;
  constructor(public payload: {text: string, offset: number, limit: number}) {}
}

export class PublicationSearchAction implements Action {
  readonly type = PublicationActionTypes.SEARCH_PUBLICATIONS;
  constructor(public payload: {text: string, offset: number, limit: number}) {};
}

export class PublicationSearchedAction implements Action {
  readonly type = PublicationActionTypes.SEARCHED_PUBLICATIONS;
  constructor(public payload: {publications: Publication[]}) {};
}

export class PublicationFilteredAction implements Action {
  readonly type = PublicationActionTypes.FILTERED_PUBLICATIONS;
  constructor(public payload: {publications: Publication[]}) {}
}

export type PublicationAction = PublicationSearchedAction | PublicationFilteredAction | PublicationByIdSearchedAction;