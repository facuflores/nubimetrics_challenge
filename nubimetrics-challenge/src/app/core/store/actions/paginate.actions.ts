import { Action } from '@ngrx/store';
import { Paging } from '../../models/paging.model';

export enum PaginateActionTypes {
  REFRESH_PAGINATE = "[Paginate - refresh] refresh ...",
  PAGE_SIZE_CHANGE_PAGINATE = "[PageSize - change] change ..."
}

export class PaginateRefreshAction implements Action {
  readonly type = PaginateActionTypes.REFRESH_PAGINATE;
}

export class PageSizeChangeAction implements Action {
  readonly type = PaginateActionTypes.PAGE_SIZE_CHANGE_PAGINATE;
  constructor(public payload: {page_size: number}) {}
}

export type PaginateAction = PaginateRefreshAction | PageSizeChangeAction;