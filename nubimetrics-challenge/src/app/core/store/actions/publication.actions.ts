import { Action } from '@ngrx/store';
import { Publication } from '../../models/publication.model';

export enum PublicationActionTypes {
  SEARCH_PUBLICATIONS = "[Publication - searching] searching ...",
  SEARCHED_PUBLICATIONS = "[Publication - end search] searched ..."
}

export class PublicationSearchAction implements Action {
  readonly type = PublicationActionTypes.SEARCH_PUBLICATIONS;
  constructor(public payload: {text: string, offset: number, limit: number}) {};
}

export class PublicationSearchedAction implements Action {
  readonly type = PublicationActionTypes.SEARCHED_PUBLICATIONS;
  constructor(public payload: {publications: Publication[]}) {};
}

export type PublicationAction = PublicationSearchedAction;