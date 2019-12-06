import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/models/app.models';

import { PublicationFindByIdAction } from 'src/app/core/store/actions/publication.actions';

import { Publication } from 'src/app/core/models/publication.model';

/**
 * Componente de detalle publicación
 */
@Component({
  selector: 'nubimetrics-detail',
  templateUrl: './nubimetrics-detail.component.html',
  styleUrls: ['./nubimetrics-detail.component.scss']
})
export class NubimetricsDetail {

  @Input("publication") publication: Publication;
  
  constructor(private store: Store<AppState>) {}

  /**
   * Solicita al servicio la busqueda de una publicación
   * por su id
   * @param event evento
   * @param idPublication id de publicación
   */
  findPublicationById(event: any, idPublication: string) {
    event.preventDefault();
    this.store.dispatch(new PublicationFindByIdAction({id: idPublication}));
  }  
  
}
