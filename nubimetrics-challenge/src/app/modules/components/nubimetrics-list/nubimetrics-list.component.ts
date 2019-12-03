import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/core/store/models/app.models';
import { PublicationSearchAction } from 'src/app/core/store/actions/publication.actions';
import { selectAllPublications } from 'src/app/core/store/selectors/publication.selectors';

import { Publication } from 'src/app/core/models/publication.model';

@Component({
  selector: 'nubimetrics-list',
  templateUrl: './nubimetrics-list.component.html',
  styleUrls: ['./nubimetrics-list.component.scss']
})
export class NubimetricsList implements OnInit {

  public publications$: Observable<Publication[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.listeners();
    this.dispatchers();
  }

  listeners() {
    this.publications$ = this.store.select(selectAllPublications);
  }

  dispatchers() {
    this.store.dispatch(
      new PublicationSearchAction({text: "iphone", offset: 0, limit: 50})
    );
  }
  
}
