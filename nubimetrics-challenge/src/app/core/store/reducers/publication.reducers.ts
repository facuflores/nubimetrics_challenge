import { Publication } from '../../models/publication.model';
import { PublicationAction, PublicationActionTypes } from '../actions/publication.actions';

export interface PublicationState {
  publications: Publication[],
  publication: Publication
}

const initialState: PublicationState = {
  publications: [],
  publication: null
}

export function PublicationReducer(state: PublicationState = initialState, action: PublicationAction) {
  switch (action.type) {
    case PublicationActionTypes.SEARCHED_PUBLICATIONS:
      return {
        ... state,
        publications: action.payload.publications
      };
    default: return state;
  }
}