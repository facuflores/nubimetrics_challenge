import { Action } from '@ngrx/store';
import { Paging } from '../../models/paging.model';

export enum PaginateActionTypes {
  REFRESH_PAGINATE = "[Paginate - refresh] refresh ..."
}

export class PaginateRefreshAction implements Action {
  readonly type = PaginateActionTypes.REFRESH_PAGINATE;
  constructor(payload: {paging: Paging}) {};
}

export type PaginateAction = PaginateRefreshAction;