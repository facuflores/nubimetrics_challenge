import { Component, OnInit, Input } from '@angular/core';

import { Publication } from 'src/app/core/models/publication.model';

@Component({
  selector: 'nubimetrics-detail',
  templateUrl: './nubimetrics-detail.component.html',
  styleUrls: ['./nubimetrics-detail.component.scss']
})
export class NubimetricsDetail {

  @Input("publication") publication: Publication;
  
}
