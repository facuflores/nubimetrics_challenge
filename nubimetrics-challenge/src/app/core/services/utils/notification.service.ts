import { Injectable } from "@angular/core";

import Swal from 'sweetalert2';

export type NotifyAlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

/**
 * Notifications of Sweetalert2
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor () {}

  /**
   * Swal success
   * @param message
   */
  public success (message: string = ""): void {
    Swal.fire("Éxito", message, "success");
  }

  /**
   * Swal warning
   * @param message
   */
  public warning (message: string = ""): void {
    Swal.fire("Atención", message, "warning");
  }

  /**
   * Swal info
   * @param message
   */
  public info (message: string = ""): void {
    Swal.fire("Información", message, "info");
  }

  /**
   * Swal danger
   * @param message
   */
  public danger (message: string = ""): void {
    Swal.fire("Error", message, "error");
  }

  public confirm (text: string, title: string = 'Esta seguro?'): any {
    return Swal.fire({
      title: title,
      text: text,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    });
  }

}