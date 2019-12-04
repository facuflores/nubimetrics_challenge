import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/core/store/models/app.models';
import { selectAllPublications } from 'src/app/core/store/selectors/publication.selectors';
import { Publication } from 'src/app/core/models/publication.model';
import { selectPageSizePaginate } from 'src/app/core/store/selectors/paginate.selectors';
import { selectSearchText } from 'src/app/core/store/selectors/filter-order.selectors';
import { PageSizeChangeAction } from 'src/app/core/store/actions/paginate.actions';

@Component({
  selector: 'nubimetrics-filter',
  templateUrl: './nubimetrics-filter.component.html',
  styleUrls: ['./nubimetrics-filter.component.scss']
})
export class NubimetricsFilter implements OnInit {

  public pageSize: number;
  public totalItems: number;
  public query$: Observable<string>;
  private publications_original: Publication[];
  private publications_temp: Publication[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.listeners();
  }

  listeners() {
    this.query$ = this.store.select(selectSearchText);
    this.store.select(selectPageSizePaginate).subscribe((pageSize: number) => this.pageSize = pageSize);
    this.store.select(selectAllPublications).subscribe((publications: Publication[]) => {
      this.totalItems = publications.length;
      this.publications_original = publications;
      this.publications_temp = publications;
    });
  }

  changePageSize(pageSize: string) {
    this.store.dispatch(new PageSizeChangeAction({page_size: parseInt(pageSize)}));
  }
  
}
