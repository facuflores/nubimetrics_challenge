import { Component, OnInit } from '@angular/core';

import { Publication } from 'src/app/core/models/publication.model';
import { BsModalRef } from 'ngx-bootstrap';

/**
 * Componente modal de publicación
 */
@Component({
  selector: 'nubimetrics-modal-detail',
  templateUrl: './nubimetrics-modal-detail.component.html',
  styleUrls: ['./nubimetrics-modal-detail.component.scss']
})
export class NubimetricsModalDetail implements OnInit {

  public publication: Publication;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }
  
}
