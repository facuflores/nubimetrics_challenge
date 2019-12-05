import { Action } from '@ngrx/store';

export enum NotificationActionTypes {
  NOTIFY_ERROR = "[Notification - error] showing ..."
}

export class NotifyErrorAction implements Action {
  readonly type = NotificationActionTypes.NOTIFY_ERROR;
  constructor(public payload: {message: string}) {}
}

export type NotificationAction = NotifyErrorAction;