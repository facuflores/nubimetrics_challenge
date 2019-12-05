import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/models/app.models';
import { selectIsLoading } from 'src/app/core/store/selectors/loader.selectors';

@Component({
  selector: 'nubimetrics-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.store.select(selectIsLoading).subscribe((isLoading: boolean) => {
      if (isLoading) setTimeout(() => this.spinner.show(), 100);
      else setTimeout(() => this.spinner.hide(), 2500);
    });
  }

}
