import { Publication } from '../../models/publication.model';
import { PublicationAction, PublicationActionTypes } from '../actions/publication.actions';

export interface PublicationState {
  publications: {
    temp: Publication[],
    original: Publication[]
  }
  publication: Publication
}

const initialState: PublicationState = {
  publications: {
    temp: [],
    original: []
  },
  publication: null
}

export function PublicationReducer(state: PublicationState = initialState, action: PublicationAction) {
  let stateNew = {...state};
  switch (action.type) {
    case PublicationActionTypes.SEARCHED_PUBLICATIONS:
      stateNew.publications.temp = action.payload.publications;
      stateNew.publications.original = action.payload.publications;
      return stateNew;
    case PublicationActionTypes.FILTERED_PUBLICATIONS:
      stateNew.publications.temp = action.payload.publications;
      return stateNew;
    default: return stateNew;
  }
}