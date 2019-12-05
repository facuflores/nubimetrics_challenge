import { PublicationState } from '../reducers/publication.reducers';
import { PagingState } from '../reducers/paginate.reducers';
import { FilterOrderState } from '../reducers/filter-order.reducer';
import { LoaderState } from '../reducers/loader.reducers';

export interface AppState {
  readonly paginate: PagingState;
  readonly publication: PublicationState;
  readonly loader: LoaderState,
  readonly filter_order: FilterOrderState;
}