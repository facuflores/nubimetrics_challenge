import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.models';
import { PublicationState } from '../reducers/publication.reducers';

/**
 * Referencia al almacen de publicación
 * @param state Almacen de aplicación
 */
const publicationState = (state: AppState) => state.publication;

/**
 * Selector para obtener el estado de una publicación 
 * que fue buscada por id
 */
export const selectOnePublication = createSelector(
  publicationState,
  (state: PublicationState) => state.publication
);

/**
 * Selector para obtener el estado de publicaciones
 * que fue buscada anteriormente (Datos originales)
 */
export const selectAllPublicationsOriginal = createSelector(
  publicationState,
  (state: PublicationState) => state.publications.original
);

/**
 * Selector para obtener el estado de publicaciones
 * que fue buscada anteriormente (Datos temporales)
 */
export const selectAllPublications = createSelector(
  publicationState,
  (state: PublicationState) => state.publications.temp
);