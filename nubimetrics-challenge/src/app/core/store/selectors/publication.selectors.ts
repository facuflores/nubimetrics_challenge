import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app.models';
import { PublicationState } from '../reducers/publication.reducers';

const publicationState = (state: AppState) => state.publication;

export const selectAllPublications = createSelector(
  publicationState,
  (state: PublicationState) => state.publications
);