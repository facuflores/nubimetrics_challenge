import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, of, EMPTY } from 'rxjs';
import { map, concatMap, expand, toArray } from "rxjs/operators";

import * as fastFilter from 'fast-filter';
import * as sort from 'fast-sort';

import { Api } from './../constants';
import { Publication } from '../../models/publication.model';
import { ResponseApi } from '../../models/response-api.model';

/**
 * Servicio de Publicación
 */
@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private TOTAL_PUBLICATION: number = 1000;

  constructor(private http: HttpClient) {}

  /**
   * Genera una publicación en base a los datos 
   * que llegan de la respuesta del api
   * @param data publicación
   */
  private buildPublication(data: Publication): Publication {
    if (data != null) {
      data = new Publication(data);
    }
    return data;
  }

  /**
   * Genera un listado de publicaciones en base a los datos
   * que llegan de la respuesta del api
   * @param response respuesta de api
   */
  private buildPublications(response: ResponseApi): ResponseApi {
    const publications = response.results.map((data) => new Publication(data));
    response.results = publications;
    return response;
  }

  /**
   * Genera los parametros (query) para la consulta
   * @param params parametros
   */
  private buildHttpParams(params: any): HttpParams {
    const httpParams = new HttpParams()
      .set("q", `${params[0]}`)
      .set("offset", `${params[1]}`)
      .set("limit", `${params[2]}`);
    return httpParams;
  }

  /**
   * Realiza la busqueda de publicaciones
   * @param text texto a buscar
   * @param offset desde para paginación
   * @param limit hasta para paginación
   */
  public searchPublications(text: string, offset: number, limit: number): Observable<ResponseApi> {
    const httpParams = this.buildHttpParams(arguments);
    return this.http.get<ResponseApi>(Api.SEARCH_PUBLICATIONS, {  params: httpParams }).pipe(
      map(response => this.buildPublications(response))
    );
  }

  /**
   * Realiza la busqueda de publicaciones 
   * con texto
   * @param text texto a buscar
   * @param offset desde para paginación
   * @param limit hasta para paginación
   */
  public searchAllPublications(text: string, offset: number, limit: number): Observable<Publication[]> {
    return this.searchPublications(text, offset, limit).pipe(
      expand(({paging}: ResponseApi) =>
        paging.offset < this.TOTAL_PUBLICATION && paging.offset < paging.total ?
          this.searchPublications(text, paging.offset + limit, limit) : EMPTY
      ),
      concatMap(({results}: ResponseApi) => results),
      toArray()
    );
  }

  /**
   * Realiza la busqueda de una publicación 
   * por su id
   * @param id id de publicación
   */
  public findByIdPublication(id: string): Observable<Publication> {
    const url = Api.FIND_BY_ID_PUBLICATION.replace(":id", id);
    return this.http.get<Publication>(url).pipe(
      map(response => this.buildPublication(response))
    );
  }

  /**
   * Ordena las publicaciones por precio de forma asc|desc
   * @param order asc|desc
   * @param publications listado de publicaciones
   */
  public orderPublicationByPrice(order: string, publications: Publication[]): Observable<Publication[]> {
    return of(publications).pipe(
      map((publications: Publication[]) => {
        switch(order) {
          case 'desc': return sort(publications).desc((pbl: Publication) => pbl.price);
          case 'asc': return sort(publications).asc((pbl: Publication) => pbl.price);
          default: return publications;
        }
      })
    );
  }

  /**
   * Ordena las publicaciones por cantidades vendidas de 
   * forma asc|desc
   * @param order asc|desc
   * @param publications listado de publicaciones
   */
  public orderPublicationBySoldQuantity(order: string, publications: Publication[]): Observable<Publication[]> {
    return of(publications).pipe(
      map((publications: Publication[]) => {
        switch(order) {
          case 'desc': return sort(publications).desc((pbl: Publication) => pbl.sold_quantity);
          case 'asc': return sort(publications).asc((pbl: Publication) => pbl.sold_quantity);
          default: return publications;
        }
      })
    );
  }

  /**
   * Filtra las publicaciones por su condicion nuevo|usado
   * @param condition condición (nuevo|usado)
   * @param publications listado de publicaciones
   */
  public filterPublicationsByCondition(condition: string, publications: Publication[]): Observable<Publication[]> {
    return of(publications).pipe(
      map((publications: Publication[]) => {
        return fastFilter(publications, function(publication: Publication) {
          return publication.condition == condition;
        });
      })
    );
  }

  /**
   * Filtra las publicaciones entre un minimo y máximo
   * @param min minimo
   * @param max máximo
   * @param publications listado de publicaciones
   */
  public filterPublicationsByRangePrice(min: number, max: number, publications: Publication[]): Observable<Publication[]> {
    return of(publications).pipe(
      map((publications: Publication[]) => {
        return fastFilter(publications, function(publication: Publication) {
          return publication.price >= min && publication.price <= max;
        });
      })
    );
  }

}