import { Action } from '@ngrx/store';

/**
 * Listado de acciones
 */
export enum NotificationActionTypes {
  NOTIFY_ERROR = "[Notification - error] showing ..."
}

/**
 * Acción encargada de comunicar un mensaje de error
 */
export class NotifyErrorAction implements Action {
  readonly type = NotificationActionTypes.NOTIFY_ERROR;

  /**
   * @param payload contenido
   * @param message mensaje
   */
  constructor(public payload: {message: string}) {}
}

export type NotificationAction = NotifyErrorAction;