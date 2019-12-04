import { PublicationState } from '../reducers/publication.reducers';
import { PagingState } from '../reducers/paginate.reducers';
import { FilterOrderState } from '../reducers/filter-order.reducer';

export interface AppState {
  readonly paginate: PagingState;
  readonly publication: PublicationState;
  readonly filter_order: FilterOrderState;
}