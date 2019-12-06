import { Pipe, PipeTransform } from '@angular/core';

/**
 * Filtro para tipo de condicion - Publicación
 */
@Pipe({
  name: 'conditionType'
})
export class ConditionTypePipe implements PipeTransform {

    transform(value: any, args?: any): any {
      switch (value) {
        case "new": return "Nuevo";
        case "used": return "Usado";
        default: return value;
      }
    }

}
