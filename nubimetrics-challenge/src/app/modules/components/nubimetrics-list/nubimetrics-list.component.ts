import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/core/store/models/app.models';
import { PublicationSearchAction, PublicationSearchAllAction } from 'src/app/core/store/actions/publication.actions';
import { selectAllPublications } from 'src/app/core/store/selectors/publication.selectors';
import { selectAllPaginate, selectPageSizePaginate } from 'src/app/core/store/selectors/paginate.selectors';

import { Publication } from 'src/app/core/models/publication.model';
import { selectSearchText } from 'src/app/core/store/selectors/filter-order.selectors';

@Component({
  selector: 'nubimetrics-list',
  templateUrl: './nubimetrics-list.component.html',
  styleUrls: ['./nubimetrics-list.component.scss']
})
export class NubimetricsList implements OnInit {

  public page: number;
  public pageSize: number;
  public offset: number;
  public limit: number;
  public showNotResult: boolean = false;
  public searchAll: boolean = false;
  public publications: Publication[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.listeners();
  }

  listeners() {
    this.store.select(selectPageSizePaginate).subscribe((pageSize: number) => this.pageSize = pageSize);

    this.store.select(selectAllPublications).subscribe((publications: Publication[]) => {
      this.publications = publications;
    });

    this.store.select(selectAllPaginate).subscribe(({page, page_size, offset, limit}) => {
      this.page = page;
      this.pageSize = page_size;
      this.offset = offset;
      this.limit = limit;
    });
    
    this.store.select(selectSearchText).subscribe((query: string) => {
      if (!this.searchAll) this.searchPublications(query);
      else this.searchAllPublications(query);
    });
  }

  searchPublications(query: string): void {
    this.searchAll = true;
    this.store.dispatch(
      new PublicationSearchAction({text: query, offset: this.offset, limit: this.limit})
    );
  }

  searchAllPublications(query: string): void {
    this.showNotResult = true;
    this.store.dispatch(
      new PublicationSearchAllAction({text: query, offset: this.offset, limit: this.limit})
    );
  }
  
}
