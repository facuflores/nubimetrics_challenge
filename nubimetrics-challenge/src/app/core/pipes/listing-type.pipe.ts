import { Pipe, PipeTransform } from '@angular/core';

/**
 * Filtro para tipo de exposición - Publicación
 */
@Pipe({
  name: 'listingType'
})
export class ListingTypePipe implements PipeTransform {

    transform(value: any, args?: any): any {
      switch (value) {
        case "gold_pro": return "Premium";
        case "gold_premium": return "Oro Premium";
        case "gold_special": return "Clásica";
        case "gold": return "Oro";
        case "silver": return "Plata";
        case "bronze": return "Bronce";
        case "free": return "Gratuita";
        default: return value;
      }
    }

}
