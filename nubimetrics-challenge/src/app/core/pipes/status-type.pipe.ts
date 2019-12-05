import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusType'
})
export class StatusTypePipe implements PipeTransform {

    transform(value: any, args?: any): any {
      switch (value) {
        case "active": return "Activo";
        case "closed": return "Cerrado";
        case "inactive": return "Inactivo";
        case "not_yet_active": return "Esperando por activación";
        case "paused": return "Pausado";
        case "payment_required": return "Esperando por pago";
        case "under_review": return "Bajo revisión";
        default: return value;
      }
    }

}
