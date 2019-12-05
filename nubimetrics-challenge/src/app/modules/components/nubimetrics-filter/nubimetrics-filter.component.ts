import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/core/store/models/app.models';
import { selectAllPublications, selectAllPublicationsOriginal } from 'src/app/core/store/selectors/publication.selectors';
import { Publication } from 'src/app/core/models/publication.model';
import { selectPageSizePaginate } from 'src/app/core/store/selectors/paginate.selectors';
import { selectSearchText, selectClearFilterAndOrder } from 'src/app/core/store/selectors/filter-order.selectors';
import { PageSizeChangeAction } from 'src/app/core/store/actions/paginate.actions';
import { ConditionFilterAction, PriceOrderAction, SoldQuantityOrderAction, PriceRangeFilterAction } from 'src/app/core/store/actions/filter-order.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'nubimetrics-filter',
  templateUrl: './nubimetrics-filter.component.html',
  styleUrls: ['./nubimetrics-filter.component.scss']
})
export class NubimetricsFilter implements OnInit {

  public pageSize: number;
  public totalItems: number;
  public query$: Observable<string>;
  
  public range_min: number = null;
  public range_max: number = null;
  
  public order_price: string = "";
  public order_sold_quantity: string = "";

  public filter_condition: string = "";

  private publications_original: Publication[];
  private publications_temp: Publication[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.listeners();
  }

  listeners() {
    this.query$ = this.store.select(selectSearchText);

    this.store.select(selectClearFilterAndOrder).subscribe((clear_filters: boolean) => {
      this.range_min = null;
      this.range_max = null;
      this.order_price = "";
      this.order_sold_quantity = "";
      this.filter_condition = "";
    });

    this.store.select(selectPageSizePaginate).subscribe((pageSize: number) => this.pageSize = pageSize);

    this.store.select(selectAllPublicationsOriginal).subscribe((publications: Publication[]) => {
      this.publications_original = publications;
    });
    
    this.store.select(selectAllPublications).subscribe((publications: Publication[]) => {
      this.totalItems = publications.length;
      this.publications_temp = publications;
      if (publications.length == this.publications_original.length) {
        this.publications_original = publications;
      }
    });
  }

  changePageSize(pageSize: string) {
    this.store.dispatch(new PageSizeChangeAction({page_size: parseInt(pageSize)}));
  }

  orderByPrice() {
    this.store.dispatch(
      new PriceOrderAction({order: this.order_price, publications: this.publications_temp})
    );
  }

  orderBySoldQuantity() {
    this.store.dispatch(
      new SoldQuantityOrderAction({order: this.order_sold_quantity, publications: this.publications_temp})
    );
  }

  filterByCondition() {
    if (this.filter_condition) {
      this.store.dispatch(
        new ConditionFilterAction({condition: this.filter_condition, publications: this.publications_original}));
    }
  }

  filterByRangePrice() {
    this.store.dispatch(
      new PriceRangeFilterAction({min: this.range_min, max: this.range_max, publications: this.publications_original})
    );
  }

  showBtnByRangePrice() {
    return this.range_min && this.range_max && this.range_min <= this.range_max;
  }
  
}
