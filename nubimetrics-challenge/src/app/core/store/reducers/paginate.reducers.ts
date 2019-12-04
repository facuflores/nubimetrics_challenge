import { Paging } from '../../models/paging.model';
import { PaginateAction, PaginateActionTypes } from '../actions/paginate.actions';
import { PAGING_OFFSET, PAGING_LIMIT, PAGE_SIZE } from '../../services/constants';

export interface PagingState extends Paging {
  page: number;
  page_size: number;
}

const initialState: PagingState = {
  page: 0,
  page_size: PAGE_SIZE,
  total: 0,
  offset: PAGING_OFFSET,
  limit: PAGING_LIMIT,
  primary_results: 0
}

export function PaginateReducer(state: PagingState = initialState, action: PaginateAction) {
  switch (action.type) {
    case PaginateActionTypes.REFRESH_PAGINATE:
      return {
        ...state,
        page: 1,
        page_size: PAGE_SIZE
      };
    case PaginateActionTypes.PAGE_SIZE_CHANGE_PAGINATE:
      return {
        ...state,
        page_size: action.payload.page_size
      };
    default: return state;
  }
}