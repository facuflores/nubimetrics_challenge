import { Publication } from '../../models/publication.model';
import { PublicationAction, PublicationActionTypes } from '../actions/publication.actions';

// publications: {
//   original: Publication[],
//   temp: Publication[]
// }

export interface PublicationState {
  publications: Publication[];
  publication: Publication
}

const initialState: PublicationState = {
  publications: [],
  publication: null
}

export function PublicationReducer(state: PublicationState = initialState, action: PublicationAction) {
  switch (action.type) {
    case PublicationActionTypes.SEARCHED_PUBLICATIONS:
      // let stateNew = {...state};
      // stateNew.publications.original = action.payload.publications;
      // stateNew.publications.temp = action.payload.publications;
      // return stateNew;
      return {
        ... state,
        publications: action.payload.publications
      }
    default: return state;
  }
}