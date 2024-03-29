import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/models/app.models';
import { SearchTextAction } from 'src/app/core/store/actions/filter-order.actions';

/**
 * Componente de Texto
 */
@Component({
  selector: 'nubimetrics-search',
  templateUrl: './nubimetrics-search.component.html',
  styleUrls: ['./nubimetrics-search.component.scss']
})
export class NubimetricsSearch {

  public query: string = "";

  constructor(private store: Store<AppState>) {}

  /**
   * Solicita al servicio el filtrado por texto 
   * pasandole el texto escrito
   * @param event evento - click
   */
  searchText(event: any) {
    event.preventDefault();
    this.store.dispatch(new SearchTextAction({query: this.query}));
  }

}
