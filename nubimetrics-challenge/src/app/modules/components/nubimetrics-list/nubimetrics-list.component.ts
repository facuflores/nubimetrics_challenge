import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/models/app.models';
import { Publication } from 'src/app/core/models/publication.model';

import { PublicationSearchAction, PublicationSearchAllAction } from 'src/app/core/store/actions/publication.actions';
import { selectAllPublications, selectOnePublication } from 'src/app/core/store/selectors/publication.selectors';
import { selectAllPaginate, selectPageSizePaginate } from 'src/app/core/store/selectors/paginate.selectors';

import { selectSearchText } from 'src/app/core/store/selectors/filter-order.selectors';
import { NubimetricsModalDetail } from './nubimetrics-modal-detail/nubimetrics-modal-detail.component';

/**
 * Componente de Listado de Publicaciones
 */
@Component({
  selector: 'nubimetrics-list',
  templateUrl: './nubimetrics-list.component.html',
  styleUrls: ['./nubimetrics-list.component.scss']
})
export class NubimetricsList implements OnInit {

  //paginación
  public page: number;
  public pageSize: number;
  public offset: number;
  public limit: number;

  //otros
  public showNotResult: boolean = false;
  public searchAll: boolean = false;
  public publications: Publication[];

  //modal
  private bsModalRef: BsModalRef;

  constructor(
    private store: Store<AppState>,
    private modalService: BsModalService) {}

  ngOnInit() {
    this.listeners();
  }

  listeners() {
    //escucha los cambios de items por pagina del almacen
    this.store.select(selectPageSizePaginate).subscribe((pageSize: number) => this.pageSize = pageSize);

    //escucha el listado de publicaciones del almacen
    this.store.select(selectAllPublications).subscribe((publications: Publication[]) => {
      this.publications = publications;
    });

    //escucha los cambios de paginación del almacen
    this.store.select(selectAllPaginate).subscribe(({page, offset, limit}) => {
      this.page = page;
      this.offset = offset;
      this.limit = limit;
    });
    
    //escucha los cambios de texto a filtrar para mostrar y luego filtrar del almacen
    this.store.select(selectSearchText).subscribe((query: string) => {
      if (!this.searchAll) this.searchPublications(query);
      else this.searchAllPublications(query);
    });

    //escucha si el almacen se encuentra la publicación buscada por su id
    this.store.select(selectOnePublication).subscribe((publication: Publication) => {
      if (publication) this.showModalDetail(publication);
    });
  }

  /**
   * Muestra el modal de publicación
   * @param publication publicación
   */
  showModalDetail(publication: Publication) {
    const initialState = {publication};
    this.bsModalRef = this.modalService.show(NubimetricsModalDetail, {initialState});
  }

  /**
   * Solicita al servicio la busqueda de publicaciones por texto
   * @param query texto
   */
  searchPublications(query: string): void {
    this.searchAll = true;
    this.store.dispatch(
      new PublicationSearchAction({text: query, offset: this.offset, limit: this.limit})
    );
  }

  /**
   * Solicita al servicio la busqueda completa de publicaciones por texto
   * @param query text
   */
  searchAllPublications(query: string): void {
    this.showNotResult = true;
    this.store.dispatch(
      new PublicationSearchAllAction({text: query, offset: this.offset, limit: this.limit})
    );
  }
  
}
