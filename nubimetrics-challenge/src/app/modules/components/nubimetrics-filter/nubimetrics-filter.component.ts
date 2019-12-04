import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/core/store/models/app.models';
import { selectAllPublications } from 'src/app/core/store/selectors/publication.selectors';
import { Publication } from 'src/app/core/models/publication.model';

@Component({
  selector: 'nubimetrics-filter',
  templateUrl: './nubimetrics-filter.component.html',
  styleUrls: ['./nubimetrics-filter.component.scss']
})
export class NubimetricsFilter implements OnInit {

  public totalItems: number;
  public publications: Publication[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.listeners();
  }

  listeners() {
    this.store.select(selectAllPublications).subscribe((publications: Publication[]) => {
      this.totalItems = publications.length;
      this.publications = publications;
    });
  }
  
}
