import { Publication } from '../../models/publication.model';
import { PublicationAction, PublicationActionTypes } from '../actions/publication.actions';

/**
 * Modelo de almacen para publicación
 */
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

/**
 * Escucha las transiciones de estado
 * para el almacen de publicación
 * @param state Almacen
 * @param action Acciones
 */
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
    case PublicationActionTypes.SEARCHED_BY_ID_PUBLICATION:
      stateNew.publication = action.payload.publication;
      return stateNew;
    default: return stateNew;
  }
}