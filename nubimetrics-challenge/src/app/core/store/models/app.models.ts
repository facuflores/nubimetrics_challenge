import { PublicationState } from '../reducers/publication.reducers';
import { PagingState } from '../reducers/paginate.reducers';

export interface AppState {
  readonly paginate: PagingState;
  readonly publication: PublicationState;
}