import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/core/store/models/app.models';
import { PublicationSearchAction } from 'src/app/core/store/actions/publication.actions';
import { selectAllPublications } from 'src/app/core/store/selectors/publication.selectors';
import { selectAllPaginate } from 'src/app/core/store/selectors/paginate.selectors';

import { Publication } from 'src/app/core/models/publication.model';

@Component({
  selector: 'nubimetrics-list',
  templateUrl: './nubimetrics-list.component.html',
  styleUrls: ['./nubimetrics-list.component.scss']
})
export class NubimetricsList implements OnInit {

  public page: number;
  public pageSize: number;
  public publications: Publication[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.listeners();
    this.dispatchers();
  }

  listeners() {
    this.store.select(selectAllPublications).subscribe((publications: Publication[]) => {
      this.publications = publications;
    });
    this.store.select(selectAllPaginate).subscribe(({page, page_size}) => {
      this.page = page;
      this.pageSize = page_size;
    });
  }

  dispatchers() {
    this.store.dispatch(
      new PublicationSearchAction({text: "iphone", offset: 0, limit: 50})
    );
  }
  
}
