import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PageSizeChangeAction } from 'src/app/core/store/actions/paginate.actions';
import { ConditionFilterAction, PriceOrderAction, SoldQuantityOrderAction, PriceRangeFilterAction } from 'src/app/core/store/actions/filter-order.actions';

import { selectPageSizePaginate } from 'src/app/core/store/selectors/paginate.selectors';
import { selectSearchText, selectClearFilterAndOrder } from 'src/app/core/store/selectors/filter-order.selectors';
import { selectAllPublications, selectAllPublicationsOriginal } from 'src/app/core/store/selectors/publication.selectors';

import { AppState } from 'src/app/core/store/models/app.models';
import { Publication } from 'src/app/core/models/publication.model';

@Component({
  selector: 'nubimetrics-filter',
  templateUrl: './nubimetrics-filter.component.html',
  styleUrls: ['./nubimetrics-filter.component.scss']
})
export class NubimetricsFilter implements OnInit {

  //paginación
  public pageSize: number;
  public totalItems: number;
  public query$: Observable<string>;
  
  //rangos
  public range_min: number = null;
  public range_max: number = null;
  
  //orden
  public order_price: string = "";
  public order_sold_quantity: string = "";

  //filtros
  public filter_condition: string = "";

  //datos de publicaciones original|temporal
  private publications_original: Publication[];
  private publications_temp: Publication[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.listeners();
  }

  listeners() {
    //escucha la nueva query del almacen
    this.query$ = this.store.select(selectSearchText);

    //escucha si reestablecer los campos del almacen
    this.store.select(selectClearFilterAndOrder).subscribe((clear_filters: boolean) => {
      this.range_min = null;
      this.range_max = null;
      this.order_price = "";
      this.order_sold_quantity = "";
      this.filter_condition = "";
    });

    //escucha el cambio de items por pagina del almacen
    this.store.select(selectPageSizePaginate).subscribe((pageSize: number) => this.pageSize = pageSize);

    //escucha las nuevas publicaciones del almacen
    this.store.select(selectAllPublicationsOriginal).subscribe((publications: Publication[]) => {
      this.publications_original = publications;
    });
    
    //escucha las nuevas publicaciones del almacen en este caso serviria para filtrar, ordenar
    this.store.select(selectAllPublications).subscribe((publications: Publication[]) => {
      this.totalItems = publications.length;
      this.publications_temp = publications;
      if (publications.length == this.publications_original.length) {
        this.publications_original = publications;
      }
    });
  }

  /**
   * Solicita al servicio el nuevo cambio de items por pagina
   * @param pageSize items por pagina
   */
  changePageSize(pageSize: string) {
    this.store.dispatch(new PageSizeChangeAction({page_size: parseInt(pageSize)}));
  }

  /**
   * Solicita al servicio la ordenación por precio de publicaciones 
   * pasandole la ordenación y publicaciones (temp)
   */
  orderByPrice() {
    this.store.dispatch(
      new PriceOrderAction({order: this.order_price, publications: this.publications_temp})
    );
  }

  /**
   * Solicita al servicio la ordenación por cantidad vendidas de publicaciones
   * pasandole la ordenación y publicaciones (datos temporales)
   */
  orderBySoldQuantity() {
    this.store.dispatch(
      new SoldQuantityOrderAction({order: this.order_sold_quantity, publications: this.publications_temp})
    );
  }

  /**
   * Solicita al servicio la filtración por condición pasandole la condición y publicaciones (datos originales)
   */
  filterByCondition() {
    if (this.filter_condition) {
      this.store.dispatch(
        new ConditionFilterAction({condition: this.filter_condition, publications: this.publications_original}));
    }
  }

  /**
   * Solicita al servicio la filtración por rango de precios
   * pasandole el minimo, máximo y publicaciones
   */
  filterByRangePrice() {
    this.store.dispatch(
      new PriceRangeFilterAction({min: this.range_min, max: this.range_max, publications: this.publications_original})
    );
  }

  /**
   * Mostrar el boton para filtrar por rango de precios
   */
  showBtnByRangePrice() {
    return this.range_min && this.range_max && this.range_min <= this.range_max;
  }
  
}
